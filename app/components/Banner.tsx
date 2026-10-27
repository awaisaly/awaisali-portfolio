'use client';

import { useEffect, useRef } from 'react';

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 r;
uniform float t;
uniform vec2 m;
uniform float k;
uniform vec2 v;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / r.y * 1.25;
  vec2 drift = m - 0.5;
  uv += drift * vec2(0.34, 0.2);
  vec2 frag = gl_FragCoord.xy / r;
  vec2 from = frag - m;
  float dist = length(from);
  float influence = smoothstep(0.9, 0.0, dist);
  uv += from * influence * 0.55 * k;
  uv += v * (0.35 + influence);
  float s = t * 0.035;

  vec2 q = vec2(fbm(uv + s), fbm(uv + vec2(5.2, 1.3) - s));
  vec2 w = vec2(
    fbm(uv + 3.0 * q + vec2(1.7, 9.2) + s * 1.4),
    fbm(uv + 3.0 * q + vec2(8.3, 2.8) - s)
  );
  float f = fbm(uv + 3.0 * w);

  vec3 ink    = vec3(0.045, 0.040, 0.110);
  vec3 indigo = vec3(0.230, 0.210, 0.780);
  vec3 violet = vec3(0.560, 0.360, 0.960);
  vec3 teal   = vec3(0.120, 0.780, 0.700);
  vec3 amber  = vec3(0.990, 0.760, 0.330);

  vec3 col = mix(ink, indigo, smoothstep(0.18, 0.58, f));
  col = mix(col, violet, smoothstep(0.50, 0.85, length(q) * 0.85));
  col = mix(col, teal, smoothstep(0.58, 0.92, w.x) * 0.75);
  col = mix(col, amber, smoothstep(0.74, 0.96, f) * 0.85);

  float contour = abs(fract(f * 10.0) - 0.5);
  col += smoothstep(0.05, 0.0, contour) * 0.07;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.035;
  col += vec3(0.82, 0.78, 1.0) * influence * influence * 0.34 * k;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Node = { x: number; y: number; ax: number; ay: number; phase: number };

const NODES: Node[] = [
  { x: 0.06, y: 0.72, ax: 0.012, ay: 0.06, phase: 0.2 },
  { x: 0.19, y: 0.34, ax: 0.016, ay: 0.08, phase: 1.4 },
  { x: 0.33, y: 0.62, ax: 0.012, ay: 0.07, phase: 2.6 },
  { x: 0.45, y: 0.26, ax: 0.018, ay: 0.06, phase: 0.9 },
  { x: 0.58, y: 0.58, ax: 0.014, ay: 0.09, phase: 3.3 },
  { x: 0.7, y: 0.3, ax: 0.012, ay: 0.06, phase: 4.1 },
  { x: 0.82, y: 0.68, ax: 0.016, ay: 0.07, phase: 2.0 },
  { x: 0.94, y: 0.36, ax: 0.012, ay: 0.08, phase: 5.2 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [5, 7],
  [6, 7],
];

function createGl(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    premultipliedAlpha: false,
    powerPreference: 'low-power',
  });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };

  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const position = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    resolution: gl.getUniformLocation(program, 'r'),
    time: gl.getUniformLocation(program, 't'),
    mouse: gl.getUniformLocation(program, 'm'),
    hover: gl.getUniformLocation(program, 'k'),
    velocity: gl.getUniformLocation(program, 'v'),
  };
}

type Spring = { pos: number; vel: number };

function createSpring(pos = 0): Spring {
  return { pos, vel: 0 };
}

// Critically damped, so motion eases into place without bouncing.
function stepSpring(spring: Spring, target: number, omega: number, dt: number) {
  const accel = omega * omega * (target - spring.pos) - 2 * omega * spring.vel;
  spring.vel += accel * dt;
  spring.pos += spring.vel * dt;
}

type Point = { x: number; y: number; influence: number };
type Ripple = { x: number; y: number; age: number };

function drawGraph(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  pointer: { x: number; y: number; h: number },
  points: Point[],
  ripples: Ripple[]
) {
  ctx.clearRect(0, 0, width, height);
  const px = pointer.x * width;
  const py = pointer.y * height;

  for (const ripple of ripples) {
    const radius = 8 + ripple.age * Math.max(width, height) * 0.55;
    ctx.beginPath();
    ctx.arc(ripple.x * width, ripple.y * height, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${(1 - ripple.age) * 0.42})`;
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }

  if (pointer.h > 0.02) {
    const light = ctx.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.42);
    light.addColorStop(0, `rgba(255,255,255,${0.22 * pointer.h})`);
    light.addColorStop(0.45, `rgba(190,180,255,${0.08 * pointer.h})`);
    light.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, width, height);
  }

  let nearest = 0;
  for (let i = 1; i < points.length; i++) {
    const best = Math.hypot(points[nearest].x - px, points[nearest].y - py);
    const next = Math.hypot(points[i].x - px, points[i].y - py);
    if (next < best) nearest = i;
  }

  for (const [a, b] of EDGES) {
    const pa = points[a];
    const pb = points[b];
    const influence = (pa.influence + pb.influence) / 2;
    const mx = (pa.x + pb.x) / 2;
    const my = (pa.y + pb.y) / 2;
    const dx = px - mx;
    const dy = py - my;
    const dist = Math.hypot(dx, dy) || 1;
    const bow = influence * 26;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.quadraticCurveTo(mx + (dx / dist) * bow, my + (dy / dist) * bow, pb.x, pb.y);
    ctx.strokeStyle = `rgba(255,255,255,${0.28 + influence * 0.5})`;
    ctx.lineWidth = 1 + influence * 0.85;
    ctx.stroke();
  }

  if (pointer.h > 0.08) {
    const node = points[nearest];
    const link = ctx.createLinearGradient(node.x, node.y, px, py);
    link.addColorStop(0, `rgba(255,255,255,${0.7 * pointer.h})`);
    link.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(px, py);
    ctx.strokeStyle = link;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Signals travelling along edges, quicker when the pointer is near.
  for (let i = 0; i < EDGES.length; i++) {
    const [a, b] = EDGES[i];
    const influence = (points[a].influence + points[b].influence) / 2;
    const along = (t * (0.16 + influence * 0.7) + i * 0.37) % 1;
    const x = points[a].x + (points[b].x - points[a].x) * along;
    const y = points[a].y + (points[b].y - points[a].y) * along;
    const radius = 7 + influence * 8;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, `rgba(255,255,255,${0.45 + influence * 0.5})`);
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  points.forEach((p, i) => {
    if (p.influence > 0.05) {
      const halo = 12 + p.influence * 26;
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
      glow.addColorStop(0, `rgba(255,255,255,${0.2 + p.influence * 0.5})`);
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
      ctx.fill();
    }

    const radius = 5 + p.influence * 2.2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10,10,20,0.9)';
    ctx.fill();
    ctx.lineWidth = i === nearest && pointer.h > 0.2 ? 1.75 : 1.25;
    ctx.strokeStyle = `rgba(255,255,255,${0.72 + p.influence * 0.28})`;
    ctx.stroke();
  });
}

export function Banner({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const shaderCanvas = shaderRef.current;
    const graphCanvas = graphRef.current;
    if (!wrap || !shaderCanvas || !graphCanvas) return;

    const shader = createGl(shaderCanvas);
    const ctx = graphCanvas.getContext('2d');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let activeTouch: number | null = null;
    let lastRippleAt = 0;
    let lastClientX = 0;
    let lastClientY = 0;
    let hasClient = false;
    const start = performance.now() - 12_000;
    const pointer = {
      x: createSpring(0.5),
      y: createSpring(0.5),
      h: createSpring(0),
      tx: 0.5,
      ty: 0.5,
      th: 0,
    };
    const offsets = NODES.map(() => ({ x: createSpring(0), y: createSpring(0) }));
    const ripples: { x: number; y: number; born: number }[] = [];

    const place = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      return {
        x: rect.width ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0.5,
        y: rect.height ? Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)) : 0.5,
      };
    };

    const spawnRipple = (x: number, y: number) => {
      if (reduceMotion) return;
      const now = performance.now();
      if (now - lastRippleAt < 280) return;
      lastRippleAt = now;
      ripples.push({ x, y, born: now });
      if (ripples.length > 4) ripples.shift();
    };

    const aim = (clientX: number, clientY: number, hovering: boolean) => {
      const next = place(clientX, clientY);
      pointer.tx = hovering ? next.x : 0.5;
      pointer.ty = hovering ? next.y : 0.5;
      pointer.th = hovering ? 1 : 0;
      if (reduceMotion) {
        pointer.x.pos = pointer.tx;
        pointer.y.pos = pointer.ty;
        pointer.h.pos = pointer.th;
        pointer.x.vel = pointer.y.vel = pointer.h.vel = 0;
        for (const offset of offsets) {
          offset.x.pos = offset.y.pos = offset.x.vel = offset.y.vel = 0;
        }
        render(performance.now());
      }
    };

    const trackMove = (event: PointerEvent) => {
      if (activeTouch !== null && event.pointerId !== activeTouch) return;
      if (event.pointerType === 'touch' && activeTouch === null) return;
      const samples = event.getCoalescedEvents?.();
      const point = samples && samples.length ? samples[samples.length - 1] : event;
      if (hasClient && Math.hypot(point.clientX - lastClientX, point.clientY - lastClientY) > 72) {
        const at = place(point.clientX, point.clientY);
        spawnRipple(at.x, at.y);
      }
      lastClientX = point.clientX;
      lastClientY = point.clientY;
      hasClient = true;
      aim(point.clientX, point.clientY, true);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.pointerType !== 'mouse') activeTouch = event.pointerId;
      const at = place(event.clientX, event.clientY);
      lastClientX = event.clientX;
      lastClientY = event.clientY;
      hasClient = true;
      lastRippleAt = 0;
      aim(event.clientX, event.clientY, true);
      spawnRipple(at.x, at.y);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (activeTouch !== null && event.pointerId !== activeTouch) return;
      activeTouch = null;
      hasClient = false;
      aim(event.clientX, event.clientY, false);
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (activeTouch !== null) return;
      if (event.pointerType === 'touch') return;
      hasClient = false;
      aim(0, 0, false);
    };

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      const shaderDpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const graphDpr = Math.min(window.devicePixelRatio || 1, 2);
      shaderCanvas.width = Math.round(width * shaderDpr);
      shaderCanvas.height = Math.round(height * shaderDpr);
      graphCanvas.width = Math.round(width * graphDpr);
      graphCanvas.height = Math.round(height * graphDpr);
      ctx?.setTransform(graphDpr, 0, 0, graphDpr, 0, 0);
      shader?.gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const dt = Math.min(0.033, Math.max(0, (now - last) / 1000));
      last = now;

      if (!reduceMotion) {
        stepSpring(pointer.x, pointer.tx, 26, dt);
        stepSpring(pointer.y, pointer.ty, 26, dt);
        stepSpring(pointer.h, pointer.th, 14, dt);
      }

      const px = pointer.x.pos * width;
      const py = pointer.y.pos * height;
      const points: Point[] = NODES.map((n, i) => {
        const depth = 0.62 + (i % 3) * 0.2;
        const homeX = (n.x + Math.sin(t * 0.35 + n.phase) * n.ax) * width;
        const homeY = (n.y + Math.cos(t * 0.28 + n.phase) * n.ay) * height;
        const dx = px - homeX;
        const dy = py - homeY;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.max(width * 0.62, 1);
        const weight = Math.max(0, 1 - dist / reach) ** 1.35;
        const pull = Math.min(height * 0.2, 36);
        const glide = pointer.h.pos;
        const carryX = Math.max(-2.2, Math.min(2.2, pointer.x.vel));
        const carryY = Math.max(-2.2, Math.min(2.2, pointer.y.vel));
        const targetX =
          ((dx / dist) * pull * weight + (pointer.x.pos - 0.5) * 52 * depth + carryX * 11) * glide;
        const targetY =
          ((dy / dist) * pull * 0.55 * weight + (pointer.y.pos - 0.5) * 16 * depth + carryY * 5) *
          glide;
        const omega = 8 + weight * glide * 8;
        if (reduceMotion) {
          offsets[i].x.pos = targetX;
          offsets[i].y.pos = targetY;
        } else {
          stepSpring(offsets[i].x, targetX, omega, dt);
          stepSpring(offsets[i].y, targetY, omega, dt);
        }
        const margin = 8;
        return {
          x: Math.min(width - margin, Math.max(margin, homeX + offsets[i].x.pos)),
          y: Math.min(height - margin, Math.max(margin, homeY + offsets[i].y.pos)),
          influence: weight * glide,
        };
      });

      const drawnRipples: Ripple[] = [];
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = (now - ripples[i].born) / 900;
        if (age >= 1) ripples.splice(i, 1);
        else drawnRipples.push({ x: ripples[i].x, y: ripples[i].y, age });
      }

      if (shader) {
        shader.gl.uniform2f(shader.resolution, shaderCanvas.width, shaderCanvas.height);
        shader.gl.uniform1f(shader.time, t);
        shader.gl.uniform2f(shader.mouse, pointer.x.pos, 1 - pointer.y.pos);
        shader.gl.uniform1f(shader.hover, pointer.h.pos);
        shader.gl.uniform2f(
          shader.velocity,
          Math.max(-1.4, Math.min(1.4, pointer.x.vel)) * 0.05,
          Math.max(-1.4, Math.min(1.4, -pointer.y.vel)) * 0.05
        );
        shader.gl.drawArrays(shader.gl.TRIANGLE_STRIP, 0, 4);
      }
      if (ctx) {
        drawGraph(
          ctx,
          width,
          height,
          t,
          { x: pointer.x.pos, y: pointer.y.pos, h: pointer.h.pos },
          points,
          drawnRipples
        );
      }
    };

    const loop = (now: number) => {
      render(now);
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const play = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) render(performance.now());
      else frame = requestAnimationFrame(loop);
    };

    resize();
    play();
    wrap.dataset.ready = 'true';

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) render(performance.now());
    });
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    intersection.observe(wrap);

    const onVisibility = () => {
      if (!document.hidden && visible) play();
    };
    document.addEventListener('visibilitychange', onVisibility);
    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', trackMove);
    wrap.addEventListener('pointerup', onPointerUp);
    wrap.addEventListener('pointercancel', onPointerUp);
    wrap.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      wrap.removeEventListener('pointerdown', onPointerDown);
      wrap.removeEventListener('pointermove', trackMove);
      wrap.removeEventListener('pointerup', onPointerUp);
      wrap.removeEventListener('pointercancel', onPointerUp);
      wrap.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden='true'
      style={{ touchAction: 'pan-y' }}
      className={`group/banner relative aspect-[3.4/1] w-full overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#0b0a1c_0%,#3b36c7_40%,#8f5cf5_68%,#1fc7b3_88%,#fcc254_100%)] shadow-[0_24px_80px_-32px_rgba(99,80,240,0.55)] ring-1 ring-white/10 ${className}`}
    >
      <canvas
        ref={shaderRef}
        className='absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 group-data-[ready]/banner:opacity-100'
      />
      <canvas
        ref={graphRef}
        className='absolute inset-0 h-full w-full opacity-0 transition-opacity delay-300 duration-1000 group-data-[ready]/banner:opacity-100'
      />
    </div>
  );
}

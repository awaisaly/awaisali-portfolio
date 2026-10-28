'use client';

import { useEffect, useRef } from 'react';

type Rgb = { r: number; g: number; b: number };

type Orb = {
  fx: number;
  fy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: Rgb;
  freq: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: Rgb;
};

type Pointer = { x: number; y: number; on: boolean; keys: boolean };

const LIGHTS: { fx: number; fy: number; color: Rgb; freq: number; radius: number; phase: number }[] = [
  { fx: 0.28, fy: 0.42, color: { r: 252, g: 196, b: 92 }, freq: 392, radius: 18, phase: 0.4 },
  { fx: 0.72, fy: 0.36, color: { r: 64, g: 214, b: 186 }, freq: 494, radius: 14, phase: 2.1 },
  { fx: 0.5, fy: 0.64, color: { r: 168, g: 112, b: 255 }, freq: 587, radius: 16, phase: 4.2 },
];

function rgba({ r, g, b }: Rgb, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function makeOrbs(w: number, h: number): Orb[] {
  const scale = Math.min(w, h) / 340;
  return LIGHTS.map((light) => ({
    fx: light.fx,
    fy: light.fy,
    x: light.fx * w,
    y: light.fy * h,
    vx: Math.cos(light.phase) * 0.8,
    vy: Math.sin(light.phase) * 0.6,
    radius: light.radius * Math.max(0.85, scale),
    phase: light.phase,
    color: light.color,
    freq: light.freq,
  }));
}

function burst(sparks: Spark[], x: number, y: number, color: Rgb, count: number) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 0.8 + Math.random() * 2.8;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      life: 1,
      size: 1.4 + Math.random() * 2.2,
      color,
    });
  }
  if (sparks.length > 90) sparks.splice(0, sparks.length - 90);
}

function playBloop(audio: { ctx: AudioContext | null }, freq: number) {
  const Context = window.AudioContext;
  if (!Context) return;
  if (!audio.ctx) audio.ctx = new Context();
  if (audio.ctx.state === 'suspended') void audio.ctx.resume();
  const t = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const gain = audio.ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.45), t + 0.22);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
  osc.connect(gain);
  gain.connect(audio.ctx.destination);
  osc.start(t);
  osc.stop(t + 0.4);
}

function step(orbs: Orb[], sparks: Spark[], pointer: Pointer, w: number, h: number, dt: number) {
  const s = Math.min(dt, 32) / 16.67;
  const reach = Math.min(w, h) * 0.46;

  for (const orb of orbs) {
    orb.phase += 0.012 * s;
    orb.vx += Math.cos(orb.phase) * 0.04 * s;
    orb.vy += Math.sin(orb.phase * 0.85) * 0.04 * s;

    if (pointer.on) {
      const dx = orb.x - pointer.x;
      const dy = orb.y - pointer.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < reach) {
        const push = (1 - dist / reach) ** 2 * 1.7 * s;
        orb.vx += (dx / dist) * push;
        orb.vy += (dy / dist) * push;
      }
    }

    const speed = Math.hypot(orb.vx, orb.vy);
    const max = 5.2;
    if (speed > max) {
      orb.vx = (orb.vx / speed) * max;
      orb.vy = (orb.vy / speed) * max;
    }

    orb.vx *= Math.pow(0.992, s);
    orb.vy *= Math.pow(0.992, s);
    orb.x += orb.vx * s;
    orb.y += orb.vy * s;

    const pad = orb.radius + 8;
    if (orb.x < pad) {
      orb.x = pad;
      orb.vx = Math.abs(orb.vx) * 0.86;
    } else if (orb.x > w - pad) {
      orb.x = w - pad;
      orb.vx = -Math.abs(orb.vx) * 0.86;
    }
    if (orb.y < pad) {
      orb.y = pad;
      orb.vy = Math.abs(orb.vy) * 0.86;
    } else if (orb.y > h - pad) {
      orb.y = h - pad;
      orb.vy = -Math.abs(orb.vy) * 0.86;
    }
  }

  for (let i = 0; i < orbs.length; i++) {
    for (let j = i + 1; j < orbs.length; j++) {
      const a = orbs[i];
      const b = orbs[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const min = a.radius + b.radius + 36;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < min) {
        const push = ((min - dist) / dist) * 0.08 * s;
        a.vx -= dx * push;
        a.vy -= dy * push;
        b.vx += dx * push;
        b.vy += dy * push;
      }
    }
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    spark.x += spark.vx * s;
    spark.y += spark.vy * s;
    spark.vy -= 0.025 * s;
    spark.life -= 0.012 * s;
    if (spark.life <= 0) sparks.splice(i, 1);
  }
}

function draw(
  ctx: CanvasRenderingContext2D,
  orbs: Orb[],
  sparks: Spark[],
  pointer: Pointer,
  w: number,
  h: number,
  time: number,
  reduce: boolean,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#09080f';
  ctx.fillRect(0, 0, w, h);

  const washes = [
    { x: w * 0.22, y: h * 0.28, color: 'rgba(88, 72, 220, 0.5)', radius: w * 0.58 },
    { x: w * 0.82, y: h * 0.18, color: 'rgba(28, 176, 158, 0.28)', radius: w * 0.42 },
    { x: w * 0.55, y: h * 0.92, color: 'rgba(252, 186, 84, 0.24)', radius: w * 0.48 },
  ];
  for (const wash of washes) {
    const drift = reduce ? 0 : Math.sin(time * 0.0004 + wash.x) * 12;
    const glow = ctx.createRadialGradient(wash.x + drift, wash.y, 0, wash.x, wash.y, wash.radius);
    glow.addColorStop(0, wash.color);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  if (pointer.on) {
    const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 110);
    glow.addColorStop(0, 'rgba(255,255,255,0.16)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 110, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const spark of sparks) {
    ctx.fillStyle = rgba(spark.color, spark.life);
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const orb of orbs) {
    const pulse = reduce ? 1 : 1 + Math.sin(time * 0.003 + orb.phase) * 0.08;
    const radius = orb.radius * pulse;
    const halo = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius * 6.5);
    halo.addColorStop(0, rgba(orb.color, 0.9));
    halo.addColorStop(0.22, rgba(orb.color, 0.28));
    halo.addColorStop(1, rgba(orb.color, 0));
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius * 6.5, 0, Math.PI * 2);
    ctx.fill();

    const core = ctx.createRadialGradient(
      orb.x - radius * 0.28,
      orb.y - radius * 0.32,
      radius * 0.1,
      orb.x,
      orb.y,
      radius,
    );
    core.addColorStop(0, '#fffaf2');
    core.addColorStop(0.42, rgba(orb.color, 1));
    core.addColorStop(1, rgba(orb.color, 1));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (pointer.keys) {
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function ForFun() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer: Pointer = { x: -999, y: -999, on: false, keys: false };
    const sparks: Spark[] = [];
    const audio = { ctx: null as AudioContext | null };
    let orbs: Orb[] = [];
    let w = 1;
    let h = 1;
    let raf = 0;
    let last = 0;
    let running = false;
    let flashTimer = 0;

    const paint = (time: number) => draw(ctx, orbs, sparks, pointer, w, h, time, reduce);

    const layout = () => {
      const rect = stage.getBoundingClientRect();
      const nextW = Math.max(1, rect.width);
      const nextH = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(nextW * dpr);
      canvas.height = Math.floor(nextH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (orbs.length === 0) orbs = makeOrbs(nextW, nextH);
      else {
        for (const orb of orbs) {
          orb.x = (orb.x / w) * nextW;
          orb.y = (orb.y / h) * nextH;
        }
      }
      w = nextW;
      h = nextH;
      paint(performance.now());
    };

    const frame = (time: number) => {
      const dt = last ? time - last : 16;
      last = time;
      step(orbs, sparks, pointer, w, h, dt);
      paint(time);
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const localPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.on = true;
    };

    const tap = (x: number, y: number) => {
      const hit = orbs.find((orb) => Math.hypot(orb.x - x, orb.y - y) < orb.radius * 2.4);
      if (hit) {
        burst(sparks, hit.x, hit.y, hit.color, 20);
        hit.vx += (Math.random() - 0.5) * 5;
        hit.vy += (Math.random() - 0.5) * 5;
        playBloop(audio, hit.freq);
      } else {
        burst(sparks, x, y, { r: 255, g: 236, b: 196 }, 10);
        playBloop(audio, 784);
      }
      if (reduce) {
        paint(performance.now());
        window.clearTimeout(flashTimer);
        flashTimer = window.setTimeout(() => {
          sparks.length = 0;
          paint(performance.now());
        }, 240);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.keys = false;
      localPoint(event.clientX, event.clientY);
      if (reduce) paint(performance.now());
    };

    const onPointerLeave = () => {
      if (!pointer.keys) pointer.on = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.keys = false;
      localPoint(event.clientX, event.clientY);
      tap(pointer.x, pointer.y);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      if (!arrows.includes(event.key) && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (!pointer.on) {
        pointer.x = w / 2;
        pointer.y = h / 2;
        pointer.on = true;
      }
      pointer.keys = true;
      const pace = 16;
      if (event.key === 'ArrowLeft') pointer.x = Math.max(12, pointer.x - pace);
      if (event.key === 'ArrowRight') pointer.x = Math.min(w - 12, pointer.x + pace);
      if (event.key === 'ArrowUp') pointer.y = Math.max(12, pointer.y - pace);
      if (event.key === 'ArrowDown') pointer.y = Math.min(h - 12, pointer.y + pace);
      if (event.key === 'Enter' || event.key === ' ') tap(pointer.x, pointer.y);
      if (reduce) paint(performance.now());
    };

    const resize = new ResizeObserver(layout);
    resize.observe(stage);
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.15 },
    );
    seen.observe(stage);

    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointerleave', onPointerLeave);
    stage.addEventListener('keydown', onKeyDown);
    layout();

    return () => {
      stop();
      window.clearTimeout(flashTimer);
      resize.disconnect();
      seen.disconnect();
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointerleave', onPointerLeave);
      stage.removeEventListener('keydown', onKeyDown);
      void audio.ctx?.close();
    };
  }, []);

  return (
    <section className='reveal mt-24' aria-labelledby='for-fun-heading'>
      <p className='text-[13px] tracking-wide text-muted'>The fun part</p>
      <h2 id='for-fun-heading' className='mt-3 font-serif text-[36px] leading-none sm:text-[44px]'>
        Chase the lights
      </h2>
      <p className='mt-4 max-w-md text-[17px] leading-7 text-muted'>
        Tap one and it bursts.
        <span className='motion-reduce:hidden'> Move close and they scatter.</span>
      </p>

      <div className='relative mt-8'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -inset-x-4 -top-6 h-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(140,96,255,0.28),transparent_68%)] blur-2xl'
        />
        <div
          ref={stageRef}
          tabIndex={0}
          role='application'
          aria-label='The fun part. Three lights. Move the pointer to scatter them. Tap a light, or press Enter, to burst it.'
          className='relative h-[280px] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#09080f] ring-1 ring-white/10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 sm:h-[340px]'
          style={{ touchAction: 'pan-y' }}
        >
          <canvas ref={canvasRef} aria-hidden='true' className='absolute inset-0 h-full w-full' />
          <p className='pointer-events-none absolute left-4 top-3.5 text-[12.5px] text-white/55'>
            <span className='motion-reduce:hidden'>Move close. </span>
            Tap a light.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FireBackgroundProps {
  className?: string;
}

export function FireBackground({ className }: FireBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIntensityRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.8 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const intensity = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollIntensityRef.current = Math.min(intensity, 1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<FireParticle | EmberParticle | SparkParticle> = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // ─── Fire Particle (base flames) ─────────────────────────────────
    class FireParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      life: number;
      maxLife: number;
      hue: number;
      wobble: number;
      wobbleSpeed: number;

      constructor(spawnX?: number, spawnY?: number) {
        const intensity = 1 + scrollIntensityRef.current * 1.8;
        const mx = mouseRef.current.x;

        // Spawn across bottom, slightly biased toward mouse X
        this.x = spawnX ?? (Math.random() * canvas!.width * 0.6 + canvas!.width * 0.2 + (mx - 0.5) * 150);
        this.y = spawnY ?? canvas!.height + Math.random() * 30;
        this.size = Math.random() * 28 * intensity + 8;
        this.speedY = -(Math.random() * 3.5 + 1.5) * intensity;
        this.speedX = (Math.random() - 0.5) * 2;
        this.maxLife = Math.random() * 90 + 50;
        this.life = this.maxLife;
        this.hue = Math.random() * 30; // 0–30: deep red to orange
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = (Math.random() * 0.04 + 0.02);
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.8;
        this.y += this.speedY;
        this.life--;
        this.size = Math.max(0, this.size - 0.18);
        // Drift toward warmer hue as it rises
        this.hue = Math.min(this.hue + 0.3, 45);
      }

      draw() {
        if (!ctx) return;
        const progress = this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 80%, 1)`);
        gradient.addColorStop(0.3, `hsla(${this.hue + 5}, 100%, 60%, 0.9)`);
        gradient.addColorStop(0.7, `hsla(${this.hue + 10}, 90%, 40%, 0.5)`);
        gradient.addColorStop(1, `hsla(${this.hue + 15}, 80%, 20%, 0)`);

        ctx.fillStyle = gradient;
        ctx.globalAlpha = Math.max(0, progress * 0.85);
        ctx.fill();
      }
    }

    // ─── Ember Particle (floating sparks) ────────────────────────────
    class EmberParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      life: number;
      maxLife: number;
      twinkle: number;
      twinkleSpeed: number;

      constructor() {
        const intensity = 1 + scrollIntensityRef.current * 1.5;
        this.x = Math.random() * canvas!.width * 0.8 + canvas!.width * 0.1;
        this.y = canvas!.height - Math.random() * canvas!.height * 0.3;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 2.5 + 0.5) * intensity;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.maxLife = Math.random() * 180 + 60;
        this.life = this.maxLife;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.12 + 0.04;
      }

      update() {
        this.twinkle += this.twinkleSpeed;
        this.x += this.speedX + Math.sin(this.twinkle * 0.7) * 0.6;
        this.y += this.speedY;
        this.life--;
        // Decelerate as it rises
        this.speedY *= 0.997;
      }

      draw() {
        if (!ctx) return;
        const progress = this.life / this.maxLife;
        const twinkleFactor = 0.5 + 0.5 * Math.sin(this.twinkle);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * twinkleFactor, 0, Math.PI * 2);

        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        grd.addColorStop(0, 'rgba(255, 220, 100, 1)');
        grd.addColorStop(0.5, 'rgba(255, 120, 20, 0.7)');
        grd.addColorStop(1, 'rgba(200, 50, 0, 0)');

        ctx.fillStyle = grd;
        ctx.globalAlpha = Math.max(0, progress * twinkleFactor * 0.95);
        ctx.fill();
      }
    }

    // ─── Spark Particle (fast bright lines) ──────────────────────────
    class SparkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      length: number;

      constructor() {
        this.x = Math.random() * canvas!.width * 0.6 + canvas!.width * 0.2;
        this.y = canvas!.height - Math.random() * canvas!.height * 0.2;
        const angle = -(Math.random() * Math.PI * 0.8 + Math.PI * 0.1);
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.maxLife = Math.random() * 40 + 15;
        this.life = this.maxLife;
        this.length = Math.random() * 8 + 3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08; // gravity
        this.vx *= 0.98;
        this.life--;
      }

      draw() {
        if (!ctx) return;
        const progress = this.life / this.maxLife;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * this.length * 0.5, this.y - this.vy * this.length * 0.5);
        ctx.strokeStyle = `rgba(255, 200, 50, ${progress * 0.9})`;
        ctx.lineWidth = progress * 2;
        ctx.lineCap = 'round';
        ctx.globalAlpha = progress;
        ctx.stroke();
      }
    }

    const createParticles = () => {
      const intensity = scrollIntensityRef.current;

      // Fire particles
      const fireAmount = Math.floor(3 + intensity * 8);
      for (let i = 0; i < fireAmount; i++) {
        particles.push(new FireParticle());
      }

      // Embers
      if (Math.random() < 0.35 + intensity * 0.4) {
        particles.push(new EmberParticle());
      }

      // Sparks (occasional bursts)
      if (Math.random() < 0.04 + intensity * 0.08) {
        const burstX = Math.random() * canvas!.width * 0.6 + canvas!.width * 0.2;
        const burstY = canvas!.height - Math.random() * canvas!.height * 0.15;
        for (let i = 0; i < Math.floor(Math.random() * 5 + 3); i++) {
          const sp = new SparkParticle();
          sp.x = burstX;
          sp.y = burstY;
          particles.push(sp);
        }
      }
    };

    const drawHeatDistortion = () => {
      // Subtle glow at bottom center
      const cx = canvas.width * 0.5;
      const cy = canvas.height;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.height * 0.5);
      grd.addColorStop(0, `rgba(249, 115, 22, ${0.06 + scrollIntensityRef.current * 0.06})`);
      grd.addColorStop(0.4, `rgba(200, 50, 0, ${0.03 + scrollIntensityRef.current * 0.03})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      time++;

      // Trail effect
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bottom heat glow
      drawHeatDistortion();

      ctx.globalCompositeOperation = 'lighter';
      createParticles();

      particles = particles.filter((p) => p.life > 0 && (!(p instanceof FireParticle) || p.size > 0));
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Layered overlays for depth and moodiness */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-stone-950/70 to-stone-950/90" />
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
      }} />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FireBackgroundProps {
  className?: string;
}

export function FireBackground({ className }: FireBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIntensityRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Cap at 1 so it doesn't grow infinitely
      const intensity = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollIntensityRef.current = Math.min(intensity, 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 50; 
        
        // Capped intensity increased
        const currentIntensity = 1 + scrollIntensityRef.current * 1.5;
        
        this.size = Math.random() * 25 * currentIntensity + 10;
        this.speedY = -(Math.random() * 4 + 1) * currentIntensity;
        this.speedX = (Math.random() - 0.5) * 2.5;
        this.maxLife = Math.random() * 80 + 40;
        this.life = this.maxLife;

        const colors = ['#ff9900', '#ff3300', '#ff6600', '#cc0000'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size = Math.max(0, this.size - 0.15);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.fill();
      }
    }

    const createParticles = () => {
      // Spawn more particles
      const amount = Math.floor(2 + scrollIntensityRef.current * 10);
      for (let i = 0; i < amount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#000000'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'lighter';
      createParticles();

      particles = particles.filter((p) => p.life > 0 && p.size > 0);
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
      {/* Dark overlay to keep it premium and moody */}
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px]" />
    </div>
  );
}

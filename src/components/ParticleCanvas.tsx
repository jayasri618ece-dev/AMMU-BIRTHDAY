import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'petal' | 'ember' | 'heart';
  rotation: number;
  rotationSpeed: number;
  swayFactor: number;
  phase: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 640 ? 36 : 60;

    const colors = [
      'rgba(181, 9, 53, ',    // Romantic crimson
      'rgba(217, 160, 168, ', // Rose gold
      'rgba(255, 182, 200, ', // Soft pink
      'rgba(255, 75, 110, ',  // Bright rose
    ];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'ember' | 'heart' =
        typeRand < 0.45 ? 'petal' : typeRand < 0.8 ? 'ember' : 'heart';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'petal' ? 8 + Math.random() * 8 : type === 'heart' ? 7 + Math.random() * 6 : 1.5 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: type === 'petal' ? 0.6 + Math.random() * 0.9 : 0.2 + Math.random() * 0.6,
        opacity: 0.25 + Math.random() * 0.55,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayFactor: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawPetal = (x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.beginPath();
      // Curved organic rose petal shape
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.8, size * 0.8, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.8, -size * 0.8, -size * 0.8, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
        -size / 2, -size / 2,
        -size, topCurveHeight / 3,
        0, size
      );
      // Top right curve
      ctx.bezierCurveTo(
        size, topCurveHeight / 3,
        size / 2, -size / 2,
        0, topCurveHeight
      );
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Natural gentle swaying motion
        const sway = Math.sin(tick * p.swayFactor + p.phase) * 0.8;
        p.x += p.speedX + sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries smoothly
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else {
          // Ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 75, 110, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

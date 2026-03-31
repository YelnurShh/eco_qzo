"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const pages = [
  {
    href: '/aral',
    emoji: '🌊',
    name: 'Арал теңізі',
    subtitle: 'Жоғалған теңіздің трагедиясы мен үміті',
    color: '#3b8ef1',
    accentColor: '#93ccfb',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1a3d6b 50%, #2c5fa0 100%)',
  },
  {
    href: '/syrdarya',
    emoji: '🌿',
    name: 'Сырдария өзені',
    subtitle: 'Тіршіліктің қайнар көзі — ұлы өзен алқабы',
    color: '#52a869',
    accentColor: '#a8d8b0',
    bg: 'linear-gradient(135deg, #071a0c 0%, #0f3320 50%, #1a5c38 100%)',
  },
  {
    href: '/desert',
    emoji: '🏜️',
    name: 'Қызылқұм шөлі',
    subtitle: 'Өмір демін тыю мүмкін емес — тіпті шөлде де',
    color: '#c97d1e',
    accentColor: '#e8b96e',
    bg: 'linear-gradient(135deg, #1a0c00 0%, #3d1f00 50%, #6b3a00 100%)',
  },
  {
    href: '/map',
    emoji: '🗺️',
    name: 'Интерактивті карта',
    subtitle: 'Барлық экожүйелер картада',
    color: '#e0c875',
    accentColor: '#f5e4a0',
    bg: 'linear-gradient(135deg, #1a1500 0%, #3d3200 50%, #6b5800 100%)',
  },
  {
    href: '/gallery',
    emoji: '🖼️',
    name: 'Галерея',
    subtitle: 'Табиғаттың бірегей көріністері',
    color: '#e87a5a',
    accentColor: '#f5b8a0',
    bg: 'linear-gradient(135deg, #1a0800 0%, #3d1500 50%, #6b2800 100%)',
  },
]

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string; type: 'sand' | 'star'
    }> = []

    const colors = ['#c97d1e', '#e8b96e', '#f2d5a8', '#3b8ef1', '#93ccfb']

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.3) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: i < 60 ? 'sand' : 'star',
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#05080d] overflow-hidden">
      <Navbar />
      
      {/* Анимациялық фон - 'fixed' және жоғары 'z' индекс */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />

      <section
        className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-16"
        style={{
          background: 'radial-gradient(circle at center, rgba(26, 42, 10, 0.4) 0%, rgba(5, 8, 13, 1) 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-xs tracking-widest uppercase border border-amber-500/20 bg-amber-500/5 text-[#e8b96e]"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#e8b96e]" />
              Қызылорда облысы · Виртуалды экскурсия
            </div>
            
            <h1 className="mb-5 leading-tight text-[#f5ead5] text-[clamp(2.5rem,7vw,5rem)] font-serif">
              Туған өлке <span className="italic text-[#e8b96e]">табиғаты</span>
            </h1>
            
            <p className="max-w-[520px] mx-auto text-[1.05rem] font-light text-white/40 mb-10">
              Бөлімді таңдаңыз — экожүйелерді, картаны және галереяны зерттеңіз
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className="block group">
                <div
                  className="relative rounded-2xl p-7 h-52 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:-translate-y-2 border border-white/5 shadow-2xl"
                  style={{ background: page.bg }}
                >
                  <div className="absolute right-4 bottom-4 text-8xl select-none transition-transform duration-500 group-hover:scale-110 opacity-[0.08]">
                    {page.emoji}
                  </div>
                  
                  <div>
                    <div className="text-3xl mb-3">{page.emoji}</div>
                    <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: page.color }}>
                      {page.subtitle}
                    </div>
                    <h2 className="text-xl font-bold text-[#f5ead5]">
                      {page.name}
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs transition-all duration-300 group-hover:gap-3" style={{ color: page.accentColor }}>
                    Ашу <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
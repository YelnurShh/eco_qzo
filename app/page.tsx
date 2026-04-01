"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ── 1. Деректер базасы (Түстер мен тексттер Montserrat-қа лайықталды) ────────
const pages = [
  {
    href: '/aral',
    emoji: '🌊',
    name: 'Арал теңізі',
    subtitle: 'ЭКОЖҮЙЕ · ТРАГЕДИЯ МЕН ҮМІТ',
    color: '#0369a1',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  },
  {
    href: '/syrdarya',
    emoji: '🌿',
    name: 'Сырдария өзені',
    subtitle: 'ӨЗЕН АЛҚАБЫ · ТІРШІЛІК КӨЗІ',
    color: '#15803d',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  },
  {
    href: '/desert',
    emoji: '🏜️',
    name: 'Қызылқұм шөлі',
    subtitle: 'ШӨЛ · БІРЕГЕЙ БИОСФЕРА',
    color: '#b45309',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  },
  {
    href: '/map',
    emoji: '🗺️',
    name: 'Интерактивті карта',
    subtitle: 'БАРЛЫҚ НҮКТЕЛЕР КАРТАДА',
    color: '#0f172a',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  {
    href: '/gallery',
    emoji: '🖼️',
    name: 'Галерея',
    subtitle: 'ТАБИҒАТ КӨРІНІСТЕРІ',
    color: '#4338ca',
    bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
  },
  {
    href: '/facts',
    emoji: '🧠',
    name: 'Деректер мен Статистика',
    subtitle: 'БІЛЕСІҢ БЕ? · ДИАГРАММАЛАР',
    color: '#b45309',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
  },
  {
    href: '/quiz',
    emoji: '❓',
    name: 'Біліміңді тексер',
    subtitle: 'ВИКТОРИНА · 50 СҰРАҚ',
    color: '#be123c',
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
  },
  {
    href: '/3d', // Немесе жалпы 3D турлар тізімі болса '/3d'
    emoji: '🚀',
    name: '3D Виртуалды тур',
    subtitle: '360° ПАНОРАМА · ВИРТУАЛДЫ САЯХАТ',
    color: '#4f46e5', // Indigo-600
    bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
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

    const particles: any[] = []
    const colors = ['#cbd5e1', '#94a3b8', '#64748b'] // Ашық фонға арналған бөлшектер

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.2 - 0.1,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
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
    // Негізгі фон Montserrat және ашық сұр/ақ
    <main className="relative min-h-screen bg-[#f8fafc] text-slate-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />
      
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-20">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-white shadow-sm border border-slate-100 text-slate-500">
              <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-500" />
              ҚЫЗЫЛОРДА ОБЛЫСЫ · ВИРТУАЛДЫ ЭКСКУРСИЯ
            </div>
            
            <h1 className="mb-6 leading-tight text-slate-900 text-[clamp(2.5rem,7vw,4.5rem)] font-black tracking-tighter">
              Туған өлкенің <br/>
              <span className="text-emerald-600 italic">табиғи экожүйелері</span>
            </h1>
            
            <p className="max-w-[600px] mx-auto text-lg font-medium text-slate-500" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              Аймақтың бай табиғатын, экожүйелерін және бірегей тарихи деректерін зерттеңіз.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className="block group">
                <div
                  className="relative rounded-[2rem] p-8 h-60 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:-translate-y-2 bg-white border border-slate-100 shadow-sm group-hover:shadow-2xl"
                  style={{ background: page.bg }}
                >
                  {/* Decorative Emoji Background */}
                  <div className="absolute -right-2 -bottom-2 text-9xl select-none transition-transform duration-700 group-hover:scale-125 opacity-[0.07] grayscale group-hover:grayscale-0">
                    {page.emoji}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-3xl mb-5 shadow-sm border border-white">
                      {page.emoji}
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase mb-2 font-black" style={{ color: page.color }}>
                      {page.subtitle}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {page.name}
                    </h2>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-2 text-xs font-black transition-all duration-300 group-hover:gap-4" style={{ color: page.color }}>
                    ЗЕРТТЕУ <span className="text-lg">→</span>
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
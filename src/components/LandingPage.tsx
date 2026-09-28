import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard, 
  GraduationCap, 
  FileDown, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Play, 
  BookOpen, 
  Award,
  Zap,
  Users,
  Check,
  ChevronRight
} from 'lucide-react';
import { AppLanguage } from '../types';
import { getT } from '../utils/i18n';

interface LandingPageProps {
  onStartFree: () => void;
  onExploreDemo: () => void;
  onEnterCode: (code?: string) => void;
  language: AppLanguage;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartFree,
  onExploreDemo,
  onEnterCode,
  language,
}) => {
  const [quickCode, setQuickCode] = useState('');
  const t = getT(language);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim()) {
      onEnterCode(quickCode.trim());
    }
  };

  const features = [
    {
      icon: Sparkles,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400',
      title: '1. AI Test Generator',
      desc: 'Fan, mavzu, sinf va qiyinlik darajasini tanlang — sun\'iy intellekt bir necha soniyada sifatli pedagogik test savollarini tuzib beradi.',
    },
    {
      icon: LayoutDashboard,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400',
      title: '2. O‘qituvchi Boshqaruv Paneli',
      desc: 'Barcha testlaringiz, savollar tahriri, o‘quvchilar ro‘yxati va topshirish statistikasi yagona qulay boshqaruv panelida jamlangan.',
    },
    {
      icon: GraduationCap,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
      title: '3. O‘quvchi Test Tizimi',
      desc: 'Chalg‘itmaydigan toza interfeys, avtomatik vaqt taymeri va har qanday qurilma (smartfon, planshet, kompyuter) orqali oson topshirish.',
    },
    {
      icon: CheckCircle2,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400',
      title: '4. Avtomatik Tekshirish va Natijalar',
      desc: 'Test yakunlanishi bilan ball va foizlar bir zumda hisoblanadi. O‘quvchi to‘g‘ri va noto‘g‘ri javoblar hamda batafsil tushuntirishlarni ko‘ra oladi.',
    },
    {
      icon: FileDown,
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60 dark:text-violet-400',
      title: '5. Professional PDF Eksport',
      desc: 'Testlarni 2 formatda chop eting: O‘quvchi varianti (savollar + javob varaqasi) va O‘qituvchi varianti (to‘g‘ri javoblar va metodik izohlar bilan).',
    },
    {
      icon: TrendingUp,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400',
      title: '6. Chuqur Tahlil va Statistika',
      desc: 'Qaysi savolda o‘quvchilar ko‘p adashdi? Sinfning umumiy o‘zlashtirish darajasi qanday? Rang-barang grafiklar orqali aniq xulosalar oling.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 dark:border-slate-800">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/60 via-blue-50/30 to-transparent dark:from-indigo-950/30 dark:via-slate-900/0 dark:to-transparent pointer-events-none -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtitle / Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>O‘zbekiston o‘qituvchilari va o‘quvchilari uchun maxsus</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading max-w-4xl mx-auto leading-[1.15]">
            AI yordamida testlarni{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              bir necha soniyada
            </span>{' '}
            yarating
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            EduTest AI o‘qituvchilarga mavzu asosida professional testlar yaratish, o‘quvchilar natijalarini kuzatish va vaqtni tejashga yordam beradi.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all group"
            >
              <span>{t.startFree}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-sm shadow-xs transition-colors"
            >
              <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-current" />
              <span>{t.howItWorks}</span>
            </button>
          </div>

          {/* Quick Test Code Input */}
          <div className="mt-8 max-w-sm mx-auto p-2 bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700">
            <form onSubmit={handleCodeSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                placeholder="Misol: ET-48291"
                className="flex-1 px-3 py-2 text-sm font-semibold tracking-wider uppercase rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-semibold whitespace-nowrap transition-colors"
              >
                Topshirish
              </button>
            </form>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <span>Mavjud demo kodlar:</span>
              <button
                type="button"
                onClick={() => onEnterCode('ET-48291')}
                className="font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ET-48291
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onEnterCode('ET-72941')}
                className="font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ET-72941
              </button>
            </div>
          </div>

          {/* Dashboard Mockup / Visual Preview */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-slate-800/80 p-3 sm:p-5 shadow-2xl shadow-slate-300/50 dark:shadow-black/50 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-400 dark:text-slate-500">
                  EduTest AI Teacher Console — 8-sinf Algebra Kvadrat tenglamalar
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  AI Tayyorladi: 5/5 Savol
                </span>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">1-Savol (Oson)</span>
                    <span className="font-mono">ET-48291</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    x² - 5x + 6 = 0 tenglamaning ildizlari qaysilar?
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      A) 1 va 6
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between">
                      <span>B) 2 va 3</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      C) 3 va 4
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      D) 2 va 4
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 bg-indigo-50/40 dark:bg-indigo-950/30 p-2 rounded-md">
                    💡 <span className="font-medium text-slate-700 dark:text-slate-300">Izoh:</span> (x - 2)(x - 3) = 0, Viyet teoremasi bo‘yicha x₁ = 2, x₂ = 3.
                  </p>
                </div>
              </div>

              {/* Sidebar stats mockup */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                  <p className="text-xs text-slate-500 font-medium">O‘quvchilar faolligi</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">88%</span>
                    <span className="text-xs text-emerald-600 font-semibold">+12% o‘sish</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Ali Vohidov</span>
                      <span className="font-bold text-emerald-600">100% (5/5)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Madina Rahimova</span>
                      <span className="font-bold text-indigo-600">80% (4/5)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Dilnoza Saidova</span>
                      <span className="font-bold text-emerald-600">100% (5/5)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-600 text-white text-center">
                  <p className="text-xs font-semibold">O‘quvchilarga yuborish</p>
                  <p className="text-sm font-mono font-bold mt-1 tracking-wider bg-white/20 py-1 px-2 rounded">
                    KOD: ET-48291
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Feature Sections */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            O‘qituvchilar va ta’lim markazlari uchun barcha qulayliklar
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Darsga tayyorgarlik ko‘rish vaqtini 10 barobarga qisqartiring. AI har qanday fandan aniq va ishonchli testlarni tuzib beradi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Step Interactive Workflow */}
      <section className="py-16 bg-white dark:bg-slate-800/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
              EduTest AI qanday ishlaydi?
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Oddiy 3 bosqichda to‘liq test jarayonini tashkil eting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 relative">
              <span className="text-4xl font-extrabold text-indigo-200 dark:text-indigo-950 font-heading">01</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Mavzuni kiriting va AI yaratsin
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Fan, sinf, mavzu va savollar sonini belgilang. Sun’iy intellekt davlat ta’lim standarti talablariga mos savollar to‘plamini taqdim etadi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 relative">
              <span className="text-4xl font-extrabold text-indigo-200 dark:text-indigo-950 font-heading">02</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Tahrirlang va Ulashing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Savollarni o‘zgartiring yoki yangilarini qo‘shing. Maxsus test kodi (masalan, ET-48291) yoki havolani o‘quvchilaringizga yuboring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 relative">
              <span className="text-4xl font-extrabold text-indigo-200 dark:text-indigo-950 font-heading">03</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Avtomatik Baholash va Statistika
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                O‘quvchilar testni yechgach, tizim soniyalarda baholaydi. Qaysi mavzuda kamchilik borligini tahliliy grafiklar orqali ko‘ring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            O‘qituvchilar nima deyishadi?
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Respublikamiz maktab va litseylarida faoliyat yurituvchi ustozlar fikri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">
              "Kvadrat tenglamalar mavzusiga 20 ta test tuzish uchun ilgari 2 soat sarflardim. EduTest AI orqali esa 30 soniyada variantlari va izohlari bilan tayyor bo‘ldi!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                AK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Aziza Karimova</p>
                <p className="text-[11px] text-slate-400">Matematika o‘qituvchisi, Toshkent</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">
              "O‘quvchilarim testni smartfondan darhol yechishadi. Natijalar avtomatik chiqishi va qog‘oz sarflanmasligi juda katta yutuq!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                SM
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Sardor Mahmudov</p>
                <p className="text-[11px] text-slate-400">Fizika fani ustozi, Samarqand</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic">
              "PDF eksport varianti ajoyib! O‘quvchi varianti va o‘qituvchi kalitlarini bitta bosishda printerdan chiqarib olaman."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                NY
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Nilufar Yo‘ldosheva</p>
                <p className="text-[11px] text-slate-400">Ingliz tili fani o‘qituvchisi, Farg‘ona</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-700 p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Bugunoq AI bilan birinchi testingizni yarating
            </h2>
            <p className="mt-4 text-indigo-100 text-sm sm:text-base">
              Ro‘yxatdan o‘tish bepul. Hech qanday murakkab sozlamalarsiz hoziroq boshlang.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-indigo-700 hover:bg-slate-50 font-bold text-sm shadow-md transition-colors"
              >
                Bepul hisob ochish
              </button>
              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-800/70 hover:bg-indigo-900/70 text-white font-semibold text-sm border border-indigo-400/30 transition-colors"
              >
                Demo o‘qituvchi sifatida ko‘rish
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
              E
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">EduTest AI</span>
            <span>— Zamonaviy ta'lim test platformasi</span>
          </div>
          <p>© 2026 EduTest AI. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
};

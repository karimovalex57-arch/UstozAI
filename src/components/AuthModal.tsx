import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  GraduationCap, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  School
} from 'lucide-react';
import { User, Role } from '../types';

interface AuthModalProps {
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [role, setRole] = useState<Role>('teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      setForgotSent(true);
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim() || (role === 'teacher' ? 'Aziza Karimova' : 'Ali Vohidov'),
      email: email.trim() || `${role}@maktab.uz`,
      role,
      school: school.trim() || '178-sonli maktab',
      avatar: role === 'teacher' 
        ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    onSuccess(newUser);
  };

  const handleQuickLogin = (asRole: Role) => {
    if (asRole === 'teacher') {
      onSuccess({
        id: 'teacher-aziza',
        name: 'Aziza Karimova',
        email: 'aziza.karimova@maktab.uz',
        role: 'teacher',
        school: '178-sonli ixtisoslashtirilgan maktab',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      });
    } else {
      onSuccess({
        id: 'student-ali',
        name: 'Ali Vohidov',
        email: 'ali.vohidov@edu.uz',
        role: 'student',
        school: '8-“A” sinf',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white font-heading">
              {mode === 'login' ? 'Tizimga kirish' : mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Parolni tiklash'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="mt-4 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/70">
          <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block mb-2">
            Tezkor testlash (Bir bosishda kirish):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('teacher')}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>O‘qituvchi</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('student')}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-semibold text-xs border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>O‘quvchi</span>
            </button>
          </div>
        </div>

        {/* Forgot password confirmation */}
        {forgotSent ? (
          <div className="mt-6 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Tiklash havolasi yuborildi!
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Elektron pochtangizni tekshiring va ko‘rsatmalarga amal qiling.
            </p>
            <button
              type="button"
              onClick={() => {
                setForgotSent(false);
                setMode('login');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
            >
              Kirish sahifasiga qaytish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {mode === 'register' && (
              <>
                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rolni tanlang
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                        role === 'teacher'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>O‘qituvchi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                        role === 'student'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>O‘quvchi</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    To‘liq ism (F.I.Sh)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === 'teacher' ? 'Aziza Karimova' : 'Ali Vohidov'}
                      required
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {role === 'teacher' ? 'Maktab yoki Ta’lim muassasasi' : 'Sinf yoki Guruh'}
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder={role === 'teacher' ? '178-sonli ixtisoslashtirilgan maktab' : '8-“A” sinf'}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Elektron pochta (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nomingiz@maktab.uz"
                  required
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Parol
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Parolni unutdingizmi?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer mt-2"
            >
              {mode === 'login' ? 'Kirish' : mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Tiklash havolasini yuborish'}
            </button>
          </form>
        )}

        {/* Toggle between Login and Register */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Hisobingiz yo‘qmi?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Ro‘yxatdan o‘tish
              </button>
            </p>
          ) : (
            <p>
              Hisobingiz bormi?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Kirish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

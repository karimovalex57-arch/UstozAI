import React, { useState } from 'react';
import { KeyRound, X, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { getTestByCode } from '../utils/storage';
import { TestItem } from '../types';

interface EnterCodeModalProps {
  initialCode?: string;
  onClose: () => void;
  onTestFound: (test: TestItem) => void;
}

export const EnterCodeModal: React.FC<EnterCodeModalProps> = ({
  initialCode = '',
  onClose,
  onTestFound,
}) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Iltimos, test kodini kiriting.');
      return;
    }

    const test = getTestByCode(code.trim());
    if (test) {
      onTestFound(test);
      onClose();
    } else {
      setError(`"${code.trim()}" kodi bo‘yicha hech qanday test topilmadi. Kodni qayta tekshiring.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Test topshirish
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              O‘qituvchi bergan test kodi
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Masalan: ET-48291"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-base font-bold font-mono tracking-widest text-slate-900 dark:text-white uppercase placeholder:normal-case placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              Mavjud namunaviy kodlar:
            </span>
            <div className="flex flex-wrap gap-2 pt-1 font-mono font-bold text-indigo-600 dark:text-indigo-400">
              <button
                type="button"
                onClick={() => setCode('ET-48291')}
                className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px]"
              >
                ET-48291 (Algebra)
              </button>
              <button
                type="button"
                onClick={() => setCode('ET-72941')}
                className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px]"
              >
                ET-72941 (Biologiya)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Testni ochish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

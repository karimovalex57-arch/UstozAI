import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  ExternalLink, 
  Play, 
  MessageSquare 
} from 'lucide-react';
import { TestItem } from '../types';

interface ShareModalProps {
  test: TestItem;
  onClose: () => void;
  onTakeTest: (test: TestItem) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  test,
  onClose,
  onTakeTest,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareableUrl = `${currentUrl}/?test=${test.code}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(test.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTelegramShare = () => {
    const text = `Assalomu alaykum! "${test.title}" fanidan onlayn test topshirish uchun havola:\n${shareableUrl}\nTest kodi: ${test.code}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                O‘quvchilarga yuborish
              </h3>
              <p className="text-xs text-slate-400">
                {test.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Test Code Showcase */}
        <div className="mt-6 p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Maxsus Test Kodi
          </span>
          <div className="mt-2 text-3xl font-extrabold font-mono tracking-widest text-slate-900 dark:text-white">
            {test.code}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            O‘quvchilar ushbu kodni bosh sahifaga kiritib to‘g‘ridan-to‘g‘ri testni boshlashlari mumkin.
          </p>

          <button
            onClick={handleCopyCode}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors shadow-xs"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'Nusxalandi!' : 'Kodni nusxalash'}</span>
          </button>
        </div>

        {/* Share Link */}
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            To‘g‘ridan-to‘g‘ri havola:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Nusxa olindi' : 'Nusxalash'}</span>
            </button>
          </div>
        </div>

        {/* Quick Channels */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleTelegramShare}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold hover:bg-sky-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Telegramda ulashish</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onTakeTest(test);
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>O‘quvchi sifatida boshlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

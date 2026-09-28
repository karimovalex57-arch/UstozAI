import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Moon, 
  Sun, 
  Languages, 
  Sliders, 
  Save, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Shuffle, 
  HelpCircle 
} from 'lucide-react';
import { User, AppSettings, AppLanguage } from '../types';

interface SettingsViewProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
  appSettings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onUpdateUser,
  appSettings,
  onUpdateSettings,
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [school, setSchool] = useState(currentUser?.school || '');

  // Settings
  const [theme, setTheme] = useState<'light' | 'dark'>(appSettings.theme);
  const [language, setLanguage] = useState<AppLanguage>(appSettings.language);
  const [defaultTimer, setDefaultTimer] = useState(appSettings.defaultTimer);
  const [showAnswers, setShowAnswers] = useState(appSettings.showAnswersDefault);
  const [showExplanations, setShowExplanations] = useState(appSettings.showExplanationsDefault);
  const [randomizeQuestions, setRandomizeQuestions] = useState(appSettings.randomizeQuestionsDefault);

  const [savedNotification, setSavedNotification] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentUser) {
      onUpdateUser({
        ...currentUser,
        name,
        email,
        school,
      });
    }

    onUpdateSettings({
      ...appSettings,
      theme,
      language,
      defaultTimer,
      showAnswersDefault: showAnswers,
      showExplanationsDefault: showExplanations,
      randomizeQuestionsDefault: randomizeQuestions,
    });

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
          Sozlamalar
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Profil ma’lumotlari, ko‘rinish mavzusi, til va standart test qoidalari
        </p>
      </div>

      {savedNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Barcha sozlamalar muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Profile Section */}
        {currentUser && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <UserIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Profil ma’lumotlari</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  F.I.Sh (To‘liq ism)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Elektron pochta (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ta’lim muassasasi (Maktab / Litsey / Universitet)
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Appearance & Language */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <Sun className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Ko‘rinish va Til</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Rang mavzusi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    theme === 'light'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Yorug‘ rejim</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    theme === 'dark'
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4 text-slate-400" />
                  <span>Qorong‘i rejim</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Interfeys tili
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="uz">🇺🇿 O‘zbekcha (Standart)</option>
                <option value="en">🇬🇧 English</option>
                <option value="ru">🇷🇺 Русский</option>
              </select>
            </div>
          </div>
        </div>

        {/* Default Test Parameters */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Standart test parametrlari</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Standart vaqt taymeri (daqiqa)
              </label>
              <input
                type="number"
                min={0}
                max={120}
                value={defaultTimer}
                onChange={(e) => setDefaultTimer(Number(e.target.value))}
                className="w-40 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={showAnswers}
                onChange={(e) => setShowAnswers(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Topshirgandan so‘ng ball va to‘g‘ri javoblarni ko‘rsatish</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(e) => setShowExplanations(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Metodik tushuntirishlarni ko‘rsatish</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={randomizeQuestions}
                onChange={(e) => setRandomizeQuestions(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Savollarni aralashtirish</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Sozlamalarni saqlash</span>
          </button>
        </div>
      </form>
    </div>
  );
};

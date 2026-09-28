import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Sliders, 
  Languages, 
  Clock, 
  CheckCircle, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Shuffle,
  Lightbulb
} from 'lucide-react';
import { TestItem, Question, DifficultyLevel, QuestionType } from '../types';
import { generateTestCode } from '../utils/storage';

interface AITestGeneratorProps {
  onTestGenerated: (test: TestItem) => void;
  teacherId: string;
  teacherName: string;
}

const SUBJECT_OPTIONS = [
  { id: 'Matematika', label: 'Matematika / Algebra' },
  { id: 'Ingliz tili', label: 'Ingliz tili (English)' },
  { id: 'Ona tili', label: 'Ona tili' },
  { id: 'Adabiyot', label: 'Adabiyot' },
  { id: 'Fizika', label: 'Fizika' },
  { id: 'Kimyo', label: 'Kimyo' },
  { id: 'Biologiya', label: 'Biologiya' },
  { id: 'Tarix', label: 'Tarix (O‘zbekiston va Jahon)' },
  { id: 'Geografiya', label: 'Geografiya' },
  { id: 'Informatika', label: 'Informatika va AT' },
  { id: 'Boshqa', label: 'Boshqa fan' },
];

const GRADE_OPTIONS = [
  '1-sinf', '2-sinf', '3-sinf', '4-sinf', '5-sinf', 
  '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf', 
  'Akademik litsey', 'OTM / Universitet'
];

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  'Matematika': ['Kvadrat tenglamalar', 'Funksiyalar va grafiklar', 'Trigonometriya asoslari', 'Fas Teoremasi va Uchburchaklar'],
  'Fizika': ['Dinamika va Nyuton qonunlari', 'Elektrostatika va Kulon qonuni', 'Optika va yorug‘lik sinishi'],
  'Biologiya': ['Hujayra tuzilishi va organoidlar', 'Fotosintez va nafas olish', 'Genetika va Mendel qonunlari'],
  'Ingliz tili': ['Present Perfect vs Past Simple', 'Conditional Sentences', 'Passive Voice in Context'],
  'Ona tili': ['Gapning bosh va ikkinchi darajali bo‘laklari', 'Fe’l nisbatlari', 'Undov va kirish so‘zlar'],
  'Kimyo': ['Davriy qonun va elementlar', 'Oksidlanish-qaytarilish reaksiyalari', 'Organik moddalar'],
  'Tarix': ['Amir Temur va Temuriylar davlati', 'Jadidchilik harakati', 'Qadimgi Xorazm va Baqtriya'],
  'Informatika': ['Python asoslari va sikllar', 'Algoritm turlari', 'Ma\'lumotlar bazasi va SQL'],
};

export const AITestGenerator: React.FC<AITestGeneratorProps> = ({
  onTestGenerated,
  teacherId,
  teacherName,
}) => {
  const [subject, setSubject] = useState('Matematika');
  const [grade, setGrade] = useState('8-sinf');
  const [topic, setTopic] = useState('Kvadrat tenglamalar');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('O‘rtacha');
  const [questionType, setQuestionType] = useState<QuestionType>('multiple_choice');
  const [language, setLanguage] = useState('O‘zbekcha');
  const [instructions, setInstructions] = useState('');
  
  // Test timing and options
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(20);
  const [showAnswersAfterSubmit, setShowAnswersAfterSubmit] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [randomizeOptions, setRandomizeOptions] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const loadingSteps = [
    'Mavzu va sinf talablari tahlil qilinmoqda...',
    'Pedagogik standartlar asosida savollar tuzilmoqda...',
    'Variantlar va to‘g‘ri javob kalitlari ishlab chiqilmoqda...',
    'Har bir savol uchun tushunarli metodik izohlar yozilmoqda...',
    'Test deyarli tayyor, yakuniy tekshiruv...',
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage('Iltimos, test mavzusini kiriting.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    setLoadingStep(0);

    // Progressive status updates
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic,
          questionCount,
          difficulty,
          questionType,
          language,
          instructions,
        }),
      });

      const data = await response.json();

      clearInterval(interval);

      if (data && data.questions && data.questions.length > 0) {
        const newTest: TestItem = {
          id: `test-${Date.now()}`,
          code: generateTestCode(),
          title: data.title || `${subject} (${grade}) — ${topic}`,
          subject,
          grade,
          topic,
          difficulty,
          questionType,
          language,
          instructions,
          questions: data.questions,
          settings: {
            timeLimitMinutes,
            showAnswersAfterSubmit,
            showExplanations,
            randomizeQuestions,
            randomizeOptions,
          },
          createdAt: new Date().toISOString(),
          teacherId,
          teacherName,
          participantCount: 0,
        };

        onTestGenerated(newTest);
      } else {
        throw new Error('Javob formatida xatolik yuz berdi');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Test generation error:', err);
      setErrorMessage(
        'Test yaratishda xatolik yuz berdi. Iltimos qayta urinib ko‘ring yoki internet aloqasini tekshiring.'
      );
      setIsLoading(false);
    }
  };

  const suggestions = TOPIC_SUGGESTIONS[subject] || [];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>EduTest AI Kognitiv Test Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          AI bilan yangi test yaratish
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Fan, mavzu va sinfni tanlang. AI davlat ta’lim standarti talablariga mos yuqori sifatli savollar to‘plamini tayyorlab beradi.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Xatolik</p>
            <p className="text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Asosiy parametrlar</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Fan (Subject) <span className="text-rose-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  const firstSug = TOPIC_SUGGESTIONS[e.target.value]?.[0];
                  if (firstSug) setTopic(firstSug);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Sinf yoki Bosqich (Grade) <span className="text-rose-500">*</span>
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Mavzu nomi (Topic) <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Aniq mavzu yozish tavsiya etiladi</span>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Masalan: Kvadrat tenglamalar va Viyet teoremasi"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  Mavzular:
                </span>
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTopic(sug)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Test Structure & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            {/* Question count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Savollar soni
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value={5}>5 ta savol (Tezkor test)</option>
                <option value={10}>10 ta savol (Standart)</option>
                <option value={15}>15 ta savol</option>
                <option value={20}>20 ta savol (To‘liq nazorat)</option>
                <option value={30}>30 ta savol (Choraklik)</option>
                <option value={50}>50 ta savol (Imtihon / DTM)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Qiyinlik darajasi
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Oson">Oson (Asosiy tushunchalar)</option>
                <option value="O‘rtacha">O‘rtacha (Standart maktab darajasi)</option>
                <option value="Qiyin">Qiyin (Olimpiada / Murakkab)</option>
                <option value="Aralash">Aralash (Oson, o‘rta, qiyin)</option>
              </select>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Savol turi
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="multiple_choice">Ko‘p tanlovli (A, B, C, D)</option>
                <option value="true_false">To‘g‘ri / Noto‘g‘ri</option>
                <option value="short_answer">Qisqa javobli</option>
                <option value="mixed">Aralash format</option>
              </select>
            </div>
          </div>

          {/* Language & Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Test tili
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="O‘zbekcha">O‘zbekcha (Lotin)</option>
                <option value="English">English</option>
                <option value="Русский">Русский</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Qo‘shimcha o‘qituvchi ko‘rsatmasi (ixtiyoriy)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={2}
                placeholder="Masalan: 8-sinf darajasiga mos amaliy misollar ko‘proq bo‘lsin, grafikli tahlilga urg‘u berilsin."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Test Rules & Settings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Test topshirish qoidalari va taymer</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Vaqt chegarasi (Taymer)</span>
              </label>
              <select
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value={0}>Cheklovsiz (Vaqt belgilanmagan)</option>
                <option value={10}>10 daqiqa</option>
                <option value={15}>15 daqiqa</option>
                <option value={20}>20 daqiqa (Tavsiya etiladi)</option>
                <option value={30}>30 daqiqa</option>
                <option value={45}>45 daqiqa (1 akademik soat)</option>
                <option value={60}>60 daqiqa</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showAnswersAfterSubmit}
                  onChange={(e) => setShowAnswersAfterSubmit(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Topshirgandan so‘ng o‘quvchiga ball va to‘g‘ri javoblarni ko‘rsatish</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showExplanations}
                  onChange={(e) => setShowExplanations(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Har bir savol uchun tushuntirish va yechim izohlarini ko‘rsatish</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={randomizeQuestions}
                  onChange={(e) => setRandomizeQuestions(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span>Har bir o‘quvchiga savollar ketma-ketligini tasodifiy aralashtirish</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>✨ AI bilan test yaratish</span>
          </button>
        </div>
      </form>

      {/* Multi-stage Animated Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700 text-center animate-in zoom-in-95 duration-200">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-950" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              AI test yaratmoqda...
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
              {subject} ({grade}) — {topic}
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 min-h-[2.5rem] flex items-center justify-center">
                {loadingSteps[loadingStep]}
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
              Pedagogik standartlar va metodik talablar hisobga olinmoqda
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

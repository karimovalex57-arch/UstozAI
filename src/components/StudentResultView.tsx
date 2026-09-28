import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Home, 
  FileText, 
  Share2, 
  Check, 
  X,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { StudentSubmission, TestItem } from '../types';

interface StudentResultViewProps {
  submission: StudentSubmission;
  test: TestItem;
  onRetake: () => void;
  onGoHome: () => void;
  onPrint: () => void;
}

export const StudentResultView: React.FC<StudentResultViewProps> = ({
  submission,
  test,
  onRetake,
  onGoHome,
  onPrint,
}) => {
  useEffect(() => {
    // Fire celebratory confetti if student scored >= 70%
    if (submission.percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b'],
      });
    }
  }, [submission.percentage]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m === 0) return `${s} soniya`;
    return `${m} daqiqa ${s} soniya`;
  };

  const getGradeText = (pct: number) => {
    if (pct >= 86) return { label: 'A\'lo natija! 🎉', color: 'text-emerald-600 dark:text-emerald-400' };
    if (pct >= 71) return { label: 'Yaxshi natija! 👍', color: 'text-indigo-600 dark:text-indigo-400' };
    if (pct >= 56) return { label: 'Qoniqarli 📚', color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'Yana mashq qilish kerak ✍️', color: 'text-rose-600 dark:text-rose-400' };
  };

  const gradeInfo = getGradeText(submission.percentage);
  const incorrectCount = submission.totalQuestions - submission.score;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Main Score Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl text-center mb-8 relative overflow-hidden">
        {/* Subtle background flair */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3 border border-indigo-200/60 dark:border-indigo-800">
          <Award className="w-3.5 h-3.5" />
          <span>Test natijasi rasmiylashtirildi</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          {submission.studentName}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {submission.testTitle} ({submission.subject}) · Kod: <span className="font-mono font-bold">{submission.testCode}</span>
        </p>

        {/* Circular Percentage Ring */}
        <div className="relative w-36 h-36 mx-auto my-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-slate-100 dark:text-slate-700"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className={submission.percentage >= 70 ? 'text-indigo-600' : 'text-amber-500'}
              strokeWidth="9"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * submission.percentage) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              {submission.percentage}%
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {submission.score} / {submission.totalQuestions} ball
            </span>
          </div>
        </div>

        <p className={`text-base font-bold ${gradeInfo.color}`}>
          {gradeInfo.label}
        </p>

        {/* Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>To‘g‘ri javoblar</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {submission.score} ta
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Noto‘g‘ri javoblar</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {incorrectCount} ta
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ketgan vaqt</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {formatSeconds(submission.timeSpentSeconds)}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Baholash</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {submission.percentage >= 86 ? '5 (A\'lo)' : submission.percentage >= 71 ? '4 (Yaxshi)' : submission.percentage >= 56 ? '3 (Qoniqarli)' : '2 (Qoniqarsiz)'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Qayta topshirish</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <FileText className="w-4 h-4 text-violet-500" />
            <span>Natijani chop etish (PDF)</span>
          </button>

          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Bosh sahifaga qaytish</span>
          </button>
        </div>
      </div>

      {/* Detailed Question by Question Review */}
      {test.settings.showAnswersAfterSubmit && submission.questionBreakdown && submission.questionBreakdown.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Savollar tahlili va to‘g‘ri javoblar
            </h2>
            <span className="text-xs text-slate-400">
              {submission.score} ta to‘g‘ri, {incorrectCount} ta xato
            </span>
          </div>

          <div className="space-y-4">
            {submission.questionBreakdown.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      {item.isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{idx + 1}-savol</span>
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                    }`}>
                      {item.isCorrect ? 'To‘g‘ri javob berildi' : 'Noto‘g‘ri'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    {item.questionText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                    {item.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isUserChoice = item.selectedOption === optIdx;
                      const isCorrectAnswer = item.correctOption === optIdx;

                      let badgeStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                      if (isCorrectAnswer) {
                        badgeStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isUserChoice && !item.isCorrect) {
                        badgeStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between ${badgeStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{letter})</span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectAnswer && (
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                              To‘g‘ri kalit
                            </span>
                          )}
                          {isUserChoice && !item.isCorrect && (
                            <span className="text-[10px] text-rose-700 dark:text-rose-300 font-bold">
                              Sizning javobingiz
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {test.settings.showExplanations && item.explanation && (
                    <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Tushuntirish va yechim:</span>
                      </p>
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

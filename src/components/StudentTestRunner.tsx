import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  User as UserIcon, 
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { TestItem, StudentSubmission, QuestionResult } from '../types';
import { saveSubmission } from '../utils/storage';

interface StudentTestRunnerProps {
  test: TestItem;
  initialStudentName?: string;
  initialStudentClass?: string;
  onFinishTest: (submission: StudentSubmission) => void;
  onExit: () => void;
}

export const StudentTestRunner: React.FC<StudentTestRunnerProps> = ({
  test,
  initialStudentName = '',
  initialStudentClass = '',
  onFinishTest,
  onExit,
}) => {
  // Setup student details if not entered
  const [hasStarted, setHasStarted] = useState(Boolean(initialStudentName));
  const [studentName, setStudentName] = useState(initialStudentName);
  const [studentClass, setStudentClass] = useState(initialStudentClass);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Answers map: { [questionId]: selectedOptionIndex }
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Timer
  const timeLimitSeconds = (test.settings.timeLimitMinutes || 0) * 60;
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [timeSpent, setTimeSpent] = useState(0);

  // Confirmation dialog
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Questions order
  const [orderedQuestions, setOrderedQuestions] = useState(test.questions);

  useEffect(() => {
    if (test.settings.randomizeQuestions) {
      setOrderedQuestions([...test.questions].sort(() => Math.random() - 0.5));
    } else {
      setOrderedQuestions(test.questions);
    }
  }, [test]);

  // Timer effect
  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);

      if (timeLimitSeconds > 0) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Automatic submit when time expires
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLimitSeconds]);

  const handleSelectOption = (optionIndex: number) => {
    const q = orderedQuestions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [q.id]: optionIndex,
    }));
  };

  const handleFinalSubmit = () => {
    // Calculate results
    let correctCount = 0;
    const breakdown: QuestionResult[] = orderedQuestions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        selectedOption: typeof selected === 'number' ? selected : -1,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const total = orderedQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);

    const submission: StudentSubmission = {
      id: `sub-${Date.now()}`,
      testId: test.id,
      testCode: test.code,
      testTitle: test.title,
      subject: test.subject,
      grade: test.grade,
      studentName: studentName.trim() || 'O‘quvchi',
      studentClass: studentClass.trim() || '—',
      score: correctCount,
      totalQuestions: total,
      percentage,
      timeSpentSeconds: timeSpent,
      submittedAt: new Date().toISOString(),
      answers,
      questionBreakdown: breakdown,
    };

    saveSubmission(submission);
    onFinishTest(submission);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = orderedQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === orderedQuestions.length - 1;

  // Step 1: Student Information Screen
  if (!hasStarted) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-200/60 dark:border-indigo-800">
            <BookOpen className="w-7 h-7" />
          </div>

          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {test.code}
          </span>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-3">
            {test.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {test.subject} · {test.grade} · O‘qituvchi: {test.teacherName}
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-around">
            <div>
              <p className="text-slate-400 text-[10px]">Savollar soni</p>
              <p className="font-bold text-slate-900 dark:text-white">{test.questions.length} ta</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px]">Vaqt chegarasi</p>
              <p className="font-bold text-slate-900 dark:text-white">
                {test.settings.timeLimitMinutes > 0 ? `${test.settings.timeLimitMinutes} daqiqa` : 'Cheklovsiz'}
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (studentName.trim()) setHasStarted(true);
            }}
            className="mt-6 space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ism va Familiyangiz <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Masalan: Ali Vohidov"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sinf yoki Guruh (ixtiyoriy)
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Masalan: 8-“A”"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onExit}
                className="w-1/3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Chiqish
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
              >
                Testni boshlash
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Step 2: Active Test Runner
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Test Header & Timer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {test.code}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {test.subject} · {test.grade}
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
            {test.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            O‘quvchi: <strong className="text-slate-800 dark:text-slate-200">{studentName}</strong> {studentClass ? `(${studentClass})` : ''}
          </p>
        </div>

        {/* Timer & Progress Counter */}
        <div className="flex items-center gap-4">
          {timeLimitSeconds > 0 && (
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono ${
              timeLeft < 120 
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-600 animate-pulse'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          <div className="text-right">
            <span className="text-xs text-slate-400">Holat: </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {answeredCount} / {orderedQuestions.length} yechildi
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / orderedQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-md mb-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-700/60">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
            {currentIndex + 1}-savol (Jami: {orderedQuestions.length})
          </span>
          <span className="text-xs text-slate-400">
            Qiyinlik: {currentQ.difficulty || 'O‘rtacha'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = answers[currentQ.id] === optIdx;
            const letter = String.fromCharCode(65 + optIdx);

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer group ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                  {letter}
                </div>
                <span className={`text-sm font-medium flex-1 ${
                  isSelected ? 'text-indigo-950 dark:text-white font-semibold' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {opt}
                </span>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Oldingi</span>
        </button>

        {/* Question quick jump palette */}
        <div className="hidden md:flex items-center gap-1.5">
          {orderedQuestions.map((q, idx) => {
            const isAnswered = typeof answers[q.id] === 'number';
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white'
                    : isAnswered
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <span>Testni yakunlash</span>
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, orderedQuestions.length - 1))}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <span>Keyingi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Testni yakunlashni xohlaysizmi?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Siz <strong className="text-slate-900 dark:text-white">{orderedQuestions.length}</strong> ta savoldan{' '}
              <strong className="text-indigo-600 dark:text-indigo-400">{answeredCount}</strong> tasiga javob berdingiz.
              {answeredCount < orderedQuestions.length && (
                <span className="block mt-1 text-rose-500 font-semibold">
                  Diqqat: {orderedQuestions.length - answeredCount} ta savol belgilanmagan!
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Qaytish
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleFinalSubmit();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Ha, yakunlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Save, 
  Share2, 
  FileDown, 
  Eye, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { TestItem, Question } from '../types';

interface TestEditorProps {
  test: TestItem;
  onSave: (updatedTest: TestItem) => void;
  onShare: (test: TestItem) => void;
  onExportPdf: (test: TestItem) => void;
  onPreview: (test: TestItem) => void;
  onBack: () => void;
}

export const TestEditor: React.FC<TestEditorProps> = ({
  test,
  onSave,
  onShare,
  onExportPdf,
  onPreview,
  onBack,
}) => {
  const [currentTest, setCurrentTest] = useState<TestItem>(test);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleUpdateTestMeta = (field: keyof TestItem, value: any) => {
    setCurrentTest((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (qIndex: number, field: keyof Question, value: any) => {
    setCurrentTest((prev) => {
      const updated = [...prev.questions];
      updated[qIndex] = { ...updated[qIndex], [field]: value };
      return { ...prev, questions: updated };
    });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setCurrentTest((prev) => {
      const updated = [...prev.questions];
      const newOptions = [...updated[qIndex].options];
      newOptions[optIndex] = value;
      updated[qIndex] = { ...updated[qIndex], options: newOptions };
      return { ...prev, questions: updated };
    });
  };

  const handleSetCorrectAnswer = (qIndex: number, optIndex: number) => {
    setCurrentTest((prev) => {
      const updated = [...prev.questions];
      updated[qIndex] = { ...updated[qIndex], correctAnswer: optIndex };
      return { ...prev, questions: updated };
    });
  };

  const handleMoveQuestion = (qIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? qIndex - 1 : qIndex + 1;
    if (targetIndex < 0 || targetIndex >= currentTest.questions.length) return;

    setCurrentTest((prev) => {
      const updated = [...prev.questions];
      const temp = updated[qIndex];
      updated[qIndex] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, questions: updated };
    });
  };

  const handleDuplicateQuestion = (qIndex: number) => {
    setCurrentTest((prev) => {
      const original = prev.questions[qIndex];
      const duplicate: Question = {
        ...original,
        id: `q-dup-${Date.now()}`,
        question: `${original.question} (Nusxa)`,
      };
      const updated = [...prev.questions];
      updated.splice(qIndex + 1, 0, duplicate);
      return { ...prev, questions: updated };
    });
  };

  const handleDeleteQuestion = (qIndex: number) => {
    if (currentTest.questions.length <= 1) {
      alert('Testda kamida 1 ta savol qolishi kerak.');
      return;
    }
    setCurrentTest((prev) => {
      const updated = prev.questions.filter((_, idx) => idx !== qIndex);
      return { ...prev, questions: updated };
    });
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q-new-${Date.now()}`,
      question: 'Yangi savol matnini kiriting...',
      options: ['A varianti', 'B varianti', 'C varianti', 'D varianti'],
      correctAnswer: 0,
      explanation: 'Ushbu javobning to‘g‘ri ekanligi haqida metodik izoh.',
      difficulty: 'O‘rtacha',
      type: 'multiple_choice',
    };

    setCurrentTest((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleSaveClick = () => {
    onSave(currentTest);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Orqaga"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {currentTest.code}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentTest.subject} · {currentTest.grade} · {currentTest.questions.length} ta savol
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              Test muharriri (Tahrirlash)
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onPreview(currentTest)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4 text-indigo-500" />
            <span>Ko‘rish</span>
          </button>

          <button
            onClick={() => onExportPdf(currentTest)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-xs"
          >
            <FileDown className="w-4 h-4 text-violet-500" />
            <span>PDF yuklab olish</span>
          </button>

          <button
            onClick={() => onShare(currentTest)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold hover:bg-blue-100 transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>O‘quvchilarga yuborish</span>
          </button>

          <button
            onClick={handleSaveClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Saqlash</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Test muvaffaqiyatli saqlandi! Barcha o‘zgarishlar yangilandi.</span>
        </div>
      )}

      {/* Test Title & Meta Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Test nomi
          </label>
          <input
            type="text"
            value={currentTest.title}
            onChange={(e) => handleUpdateTestMeta('title', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mavzu
            </label>
            <input
              type="text"
              value={currentTest.topic}
              onChange={(e) => handleUpdateTestMeta('topic', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Taymer (Daqiqa, 0 = Cheklovsiz)
            </label>
            <input
              type="number"
              min={0}
              max={180}
              value={currentTest.settings.timeLimitMinutes}
              onChange={(e) =>
                setCurrentTest((prev) => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    timeLimitMinutes: Number(e.target.value),
                  },
                }))
              }
              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Jami savollar: <strong className="text-slate-900 dark:text-white font-mono">{currentTest.questions.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {currentTest.questions.map((q, qIdx) => {
          return (
            <div
              key={q.id || qIdx}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition-shadow relative group"
            >
              {/* Question Header & Order Controls */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center font-heading">
                    {qIdx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Savol
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(qIdx, 'up')}
                    disabled={qIdx === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                    title="Yuqoriga surish"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(qIdx, 'down')}
                    disabled={qIdx === currentTest.questions.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                    title="Pastga surish"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicateQuestion(qIdx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                    title="Nusxa olish"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(qIdx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Savol matni:
                </label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Variantlar (To‘g‘ri javobni tanlash uchun chapdagi doirachani bosing):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = q.correctAnswer === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSetCorrectAnswer(qIdx, optIdx)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                            isCorrect
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                          }`}
                          title={isCorrect ? 'To‘g‘ri javob sifatida belgilangan' : 'To‘g‘ri javob qilib belgilash'}
                        >
                          {letter}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                          className="flex-1 bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                        {isCorrect && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                            To‘g‘ri
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <span>Metodik izoh va tushuntirish:</span>
                </label>
                <textarea
                  value={q.explanation}
                  onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                  rows={2}
                  placeholder="Nima uchun ushbu javob to‘g‘ri ekanligi tushuntiriladi..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Add Question & Save CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dashed border-indigo-400 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Savol qo‘shish</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSaveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Testni saqlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

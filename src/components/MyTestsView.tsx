import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Share2, 
  FileDown, 
  Eye, 
  Trash2, 
  Copy, 
  Play, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Calendar,
  Sparkles
} from 'lucide-react';
import { TestItem } from '../types';

interface MyTestsViewProps {
  tests: TestItem[];
  onCreateNew: () => void;
  onEditTest: (test: TestItem) => void;
  onTakeTest: (test: TestItem) => void;
  onShareTest: (test: TestItem) => void;
  onExportPdf: (test: TestItem) => void;
  onDuplicateTest: (test: TestItem) => void;
  onDeleteTest: (testId: string) => void;
}

export const MyTestsView: React.FC<MyTestsViewProps> = ({
  tests,
  onCreateNew,
  onEditTest,
  onTakeTest,
  onShareTest,
  onExportPdf,
  onDuplicateTest,
  onDeleteTest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Barchasi');
  const [selectedGrade, setSelectedGrade] = useState('Barchasi');

  // Subjects filter list
  const subjects = ['Barchasi', ...Array.from(new Set(tests.map((t) => t.subject)))];
  const grades = ['Barchasi', ...Array.from(new Set(tests.map((t) => t.grade)))];

  const filteredTests = tests.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'Barchasi' || t.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'Barchasi' || t.grade === selectedGrade;

    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Mening testlarim
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Yaratilgan va saqlangan barcha testlar kutubxonasi ({tests.length} ta)
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yangi test</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Test nomi, mavzu yoki kod bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === 'Barchasi' ? 'Barcha fanlar' : s}
              </option>
            ))}
          </select>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
          >
            {grades.map((g) => (
              <option key={g} value={g}>
                {g === 'Barchasi' ? 'Barcha sinflar' : g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Test Cards Grid */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Hech qanday test topilmadi
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Qidiruv so‘zini o‘zgartiring yoki AI yordamida birinchi testingizni yarating.
          </p>
          <button
            onClick={onCreateNew}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
          >
            + Yangi test yaratish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((t) => {
            const formattedDate = new Date(t.createdAt).toLocaleDateString('uz-UZ', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {t.code}
                    </span>
                    <span className="text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t.topic}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {t.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {t.grade}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-medium">
                      {t.questions.length} ta savol
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                      {t.difficulty || 'O‘rtacha'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <button
                    onClick={() => onTakeTest(t)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                    title="Testni yechib ko‘rish"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ishlash</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditTest(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
                      title="Tahrirlash"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onShareTest(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors"
                      title="Ulashish"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onExportPdf(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/60 transition-colors"
                      title="PDF"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDuplicateTest(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Nusxa olish"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`"${t.title}" testini o‘chirishni tasdiqlaysizmi?`)) {
                          onDeleteTest(t.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                      title="O‘chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

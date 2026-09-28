import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  Award, 
  FileDown, 
  CheckCircle, 
  XCircle, 
  Clock, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { StudentSubmission } from '../types';

interface ResultsViewProps {
  submissions: StudentSubmission[];
  selectedSubmission: StudentSubmission | null;
  onSelectSubmission: (submission: StudentSubmission | null) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  submissions,
  selectedSubmission,
  onSelectSubmission,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestFilter, setSelectedTestFilter] = useState('Barchasi');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const testNames = ['Barchasi', ...Array.from(new Set(submissions.map((s) => s.testTitle)))];

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.studentClass && s.studentClass.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTest = selectedTestFilter === 'Barchasi' || s.testTitle === selectedTestFilter;
    return matchesSearch && matchesTest;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') {
      return sortOrder === 'desc' ? b.percentage - a.percentage : a.percentage - b.percentage;
    } else {
      return sortOrder === 'desc'
        ? new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        : new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    }
  });

  const handleExportCsv = () => {
    const headers = ['Ism', 'Sinf', 'Test', 'Fan', 'Ball', 'Jami savollar', 'Foiz', 'Sana'];
    const rows = sorted.map((s) => [
      `"${s.studentName}"`,
      `"${s.studentClass || ''}"`,
      `"${s.testTitle}"`,
      `"${s.subject}"`,
      s.score,
      s.totalQuestions,
      `${s.percentage}%`,
      new Date(s.submittedAt).toLocaleDateString('uz-UZ'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduTest_Natijalar_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (pct: number) => {
    if (pct >= 86) {
      return <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded text-xs">5 (A'lo)</span>;
    }
    if (pct >= 71) {
      return <span className="text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded text-xs">4 (Yaxshi)</span>;
    }
    if (pct >= 56) {
      return <span className="text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 font-semibold px-2 py-0.5 rounded text-xs">3 (Qoniqarli)</span>;
    }
    return <span className="text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 font-semibold px-2 py-0.5 rounded text-xs">2 (Qoniqarsiz)</span>;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            O‘quvchilar natijalari
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Topshirilgan barcha testlar monitoringi va ballar ({submissions.length} ta natija)
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Excel / CSV eksport</span>
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
            placeholder="O‘quvchi ismi yoki sinfi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedTestFilter}
            onChange={(e) => setSelectedTestFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
          >
            {testNames.map((n) => (
              <option key={n} value={n}>
                {n === 'Barchasi' ? 'Barcha testlar' : n}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (sortBy === 'score') {
                setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
              } else {
                setSortBy('score');
                setSortOrder('desc');
              }
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              sortBy === 'score'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-700 dark:text-indigo-300'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Ball bo‘yicha</span>
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">O‘quvchi</th>
                <th className="py-3.5 px-4">Sinf</th>
                <th className="py-3.5 px-4">Test</th>
                <th className="py-3.5 px-4">Sana</th>
                <th className="py-3.5 px-4">To‘g‘ri / Jami</th>
                <th className="py-3.5 px-4">Foiz</th>
                <th className="py-3.5 px-4">Baho</th>
                <th className="py-3.5 px-4 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Hech qanday natija topilmadi
                  </td>
                </tr>
              ) : (
                sorted.map((item) => {
                  const dateStr = new Date(item.submittedAt).toLocaleDateString('uz-UZ', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectSubmission(item)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {item.studentName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {item.studentClass || '—'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200 font-medium">
                        {item.testTitle}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {dateStr}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {item.score} / {item.totalQuestions}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                        {item.percentage}%
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(item.percentage)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSubmission(item);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-600 hover:text-indigo-600 text-xs font-semibold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ko‘rish</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Student Submission Inspection Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {selectedSubmission.studentName} — Natijalar tahlili
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedSubmission.testTitle} · {selectedSubmission.studentClass || '—'}
                </p>
              </div>
              <button
                onClick={() => onSelectSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Ball</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                  {selectedSubmission.score} / {selectedSubmission.totalQuestions}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Foiz</span>
                <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                  {selectedSubmission.percentage}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Baho</span>
                <div className="mt-1">
                  {getStatusBadge(selectedSubmission.percentage)}
                </div>
              </div>
            </div>

            {/* Question Breakdown */}
            <div className="mt-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Savollar bo‘yicha javoblar:
              </h4>

              {selectedSubmission.questionBreakdown && selectedSubmission.questionBreakdown.length > 0 ? (
                selectedSubmission.questionBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs ${
                      item.isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-semibold">
                      <span className="flex items-center gap-1.5">
                        {item.isCorrect ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        <span>{idx + 1}-savol: {item.questionText}</span>
                      </span>
                      <span className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {item.isCorrect ? 'To‘g‘ri' : 'Xato'}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1 pl-5">
                      {item.options.map((opt, oIdx) => {
                        const isStudent = item.selectedOption === oIdx;
                        const isCorrectKey = item.correctOption === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-1.5 rounded flex items-center justify-between ${
                              isCorrectKey
                                ? 'bg-emerald-100 dark:bg-emerald-900/60 font-semibold text-emerald-900 dark:text-emerald-200'
                                : isStudent
                                ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                            {isCorrectKey && <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">To‘g‘ri kalit</span>}
                            {isStudent && !isCorrectKey && <span className="text-[10px] text-rose-600 font-bold">O‘quvchi tanlovi</span>}
                          </div>
                        );
                      })}
                    </div>

                    {item.explanation && (
                      <p className="mt-2 text-[11px] text-slate-500 pl-5 italic">
                        💡 {item.explanation}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Ushbu topshiriq uchun to‘liq javoblar nusxasi mavjud emas.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

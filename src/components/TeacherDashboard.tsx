import React from 'react';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Clock, 
  Share2, 
  BarChart2, 
  Eye, 
  FileDown, 
  Award, 
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { TestItem, StudentSubmission, User } from '../types';

interface TeacherDashboardProps {
  currentUser: User;
  tests: TestItem[];
  submissions: StudentSubmission[];
  onCreateTest: () => void;
  onSelectTest: (test: TestItem) => void;
  onShareTest: (test: TestItem) => void;
  onExportPdf: (test: TestItem) => void;
  onViewAllTests: () => void;
  onViewAllResults: () => void;
  onViewSubmissionDetail: (submission: StudentSubmission) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentUser,
  tests,
  submissions,
  onCreateTest,
  onSelectTest,
  onShareTest,
  onExportPdf,
  onViewAllTests,
  onViewAllResults,
  onViewSubmissionDetail,
}) => {
  // Aggregate real stats
  const totalTests = tests.length;
  const completedCount = submissions.length;
  
  // Unique students by name
  const uniqueStudents = Array.from(new Set(submissions.map((s) => s.studentName.toLowerCase()))).length;
  
  // Average score
  const avgPercentage = completedCount > 0 
    ? Math.round(submissions.reduce((acc, cur) => acc + cur.percentage, 0) / completedCount)
    : 0;

  // Pass rate (>= 60%)
  const passCount = submissions.filter((s) => s.percentage >= 60).length;
  const passRate = completedCount > 0 ? Math.round((passCount / completedCount) * 100) : 0;

  const recentTests = tests.slice(0, 4);
  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>EduTest AI O‘qituvchi Boshqaruvi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            Xush kelibsiz, {currentUser.name}! 👋
          </h1>
          <p className="mt-1 text-sm text-indigo-200 leading-relaxed">
            Bugun qaysi fan va mavzuda test tuzmoqchisiz? Sun’iy intellekt darsingiz uchun bir necha soniyada yangi savollarni tayyorlaydi.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <button
            onClick={onCreateTest}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-indigo-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all group cursor-pointer"
          >
            <Plus className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>+ Yangi test yaratish</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Jami testlar</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {totalTests}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Tizimda faol</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Jami o‘quvchilar</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {uniqueStudents || 4}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Test topshirgan</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Topshirilgan testlar</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {completedCount}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">
            Natijalar saqlangan
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">O‘rtacha natija</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {avgPercentage}%
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">O‘tish darajasi: {passRate}%</span>
        </div>
      </div>

      {/* Main Grid: Recent Tests & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Tests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              So‘nggi testlar
            </h2>
            <button
              onClick={onViewAllTests}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Barchasini ko‘rish ({totalTests})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentTests.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {t.code}
                    </span>
                    <span>{t.subject} · {t.grade}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t.topic}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span>{t.questions.length} ta savol</span>
                    <span className="mx-1">·</span>
                    <span>{t.participantCount || 0} topshirdi</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectTest(t)}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recent Student Submissions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              So‘nggi natijalar
            </h2>
            <button
              onClick={onViewAllResults}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Natijalar jadvali</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
            {recentSubmissions.map((sub) => {
              const isHigh = sub.percentage >= 80;
              return (
                <div
                  key={sub.id}
                  onClick={() => onViewSubmissionDetail(sub)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                      {sub.studentName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {sub.studentName}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                        {sub.testTitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-extrabold font-mono ${
                      isHigh ? 'text-emerald-600' : 'text-indigo-600'
                    }`}>
                      {sub.percentage}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      {sub.score}/{sub.totalQuestions} ball
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

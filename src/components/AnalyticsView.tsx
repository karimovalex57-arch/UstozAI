import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Award, 
  Users, 
  FileText, 
  CheckCircle2, 
  Target, 
  PieChart 
} from 'lucide-react';
import { StudentSubmission, TestItem } from '../types';

interface AnalyticsViewProps {
  tests: TestItem[];
  submissions: StudentSubmission[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  tests,
  submissions,
}) => {
  const totalSubmissions = submissions.length;
  const totalTests = tests.length;
  const uniqueStudents = Array.from(new Set(submissions.map((s) => s.studentName.toLowerCase()))).length;

  const scores = submissions.map((s) => s.percentage);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

  // Grade distributions
  const excellent = scores.filter((s) => s >= 86).length; // 5
  const good = scores.filter((s) => s >= 71 && s < 86).length; // 4
  const satisfactory = scores.filter((s) => s >= 56 && s < 71).length; // 3
  const poor = scores.filter((s) => s < 56).length; // 2

  const maxCategoryCount = Math.max(excellent, good, satisfactory, poor, 1);

  // Subject breakdown
  const subjectScores: Record<string, { total: number; count: number }> = {};
  submissions.forEach((s) => {
    if (!subjectScores[s.subject]) subjectScores[s.subject] = { total: 0, count: 0 };
    subjectScores[s.subject].total += s.percentage;
    subjectScores[s.subject].count += 1;
  });

  const subjectAverages = Object.entries(subjectScores).map(([sub, data]) => ({
    subject: sub,
    avg: Math.round(data.total / data.count),
    count: data.count,
  }));

  // Top performing students
  const studentMap: Record<string, { name: string; totalPct: number; count: number }> = {};
  submissions.forEach((s) => {
    if (!studentMap[s.studentName]) {
      studentMap[s.studentName] = { name: s.studentName, totalPct: 0, count: 0 };
    }
    studentMap[s.studentName].totalPct += s.percentage;
    studentMap[s.studentName].count += 1;
  });

  const topStudents = Object.values(studentMap)
    .map((s) => ({
      name: s.name,
      avg: Math.round(s.totalPct / s.count),
      testsTaken: s.count,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
          Statistika va Ta’lim Tahlili
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          O‘quvchilarning umumiy o‘zlashtirish ko‘rsatkichlari, qiyinchiliklar va natijalar monitoringi
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">O‘rtacha ball</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {avgScore}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">Eng yuqori ball</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {highestScore}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">Eng past ball</span>
          <p className="text-2xl font-extrabold text-rose-500 dark:text-rose-400 font-mono mt-1">
            {lowestScore}%
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">Topshirilgan</span>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-1">
            {totalSubmissions}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">O‘quvchilar</span>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1">
            {uniqueStudents || 4}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-slate-400 text-xs font-medium block">O‘tish darajasi</span>
          <p className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
            {Math.round(((excellent + good + satisfactory) / (totalSubmissions || 1)) * 100)}%
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Ballar taqsimoti (Baholash tizimi)
              </h3>
              <p className="text-xs text-slate-400">O‘quvchilarning umumiy foiz ko‘rsatkichlari</p>
            </div>
            <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700 dark:text-emerald-300">5 (A'lo: 86% — 100%)</span>
                <span className="font-mono text-slate-900 dark:text-white">{excellent} ta o‘quvchi</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(excellent / maxCategoryCount) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-indigo-700 dark:text-indigo-300">4 (Yaxshi: 71% — 85%)</span>
                <span className="font-mono text-slate-900 dark:text-white">{good} ta o‘quvchi</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(good / maxCategoryCount) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700 dark:text-amber-300">3 (Qoniqarli: 56% — 70%)</span>
                <span className="font-mono text-slate-900 dark:text-white">{satisfactory} ta o‘quvchi</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(satisfactory / maxCategoryCount) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700 dark:text-rose-300">2 (Qoniqarsiz: &lt; 56%)</span>
                <span className="font-mono text-slate-900 dark:text-white">{poor} ta o‘quvchi</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(poor / maxCategoryCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Fanlar bo‘yicha o‘rtacha o‘zlashtirish
              </h3>
              <p className="text-xs text-slate-400">Har bir fan kesimidagi muvaffaqiyat foizi</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-4">
            {subjectAverages.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">{item.subject}</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{item.avg}% ({item.count} ta test)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Students Leaderboard */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Eng yuqori natija ko‘rsatgan o‘quvchilar</span>
            </h3>
            <p className="text-xs text-slate-400">O‘rtacha ballar reytingi</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
          {topStudents.map((st, i) => (
            <div key={i} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  i === 0 ? 'bg-amber-100 text-amber-800 font-extrabold' : i === 1 ? 'bg-slate-200 text-slate-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                  <p className="text-[11px] text-slate-400">{st.testsTaken} ta test topshirdi</p>
                </div>
              </div>

              <span className="font-mono text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {st.avg}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  FileDown, 
  Printer, 
  X, 
  Check, 
  BookOpen, 
  Sparkles, 
  UserCheck, 
  GraduationCap 
} from 'lucide-react';
import { TestItem } from '../types';

interface PdfExportModalProps {
  test: TestItem;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  test,
  onClose,
}) => {
  const [version, setVersion] = useState<'student' | 'teacher'>('student');

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150">
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              PDF formatda chop etish va yuklash
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Bosma nusxa uchun maxsus formatlangan varaq
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Version Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setVersion('student')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  version === 'student'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                O‘quvchi varianti
              </button>
              <button
                type="button"
                onClick={() => setVersion('teacher')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  version === 'teacher'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                O‘qituvchi varianti (Kalitlar bilan)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / PDF saqlash</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 printable-document">
          {/* Printable Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  ET
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                  EduTest AI
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-2">
                  {version === 'student' ? '· O‘quvchi varianti' : '· O‘qituvchi kalitlari'}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 mt-2 font-heading">
                {test.title}
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Fan:</strong> {test.subject} · <strong>Sinf:</strong> {test.grade} · <strong>Mavzu:</strong> {test.topic}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600">
              <p className="font-mono font-bold text-sm text-indigo-700">Kod: {test.code}</p>
              <p className="mt-1">O‘qituvchi: {test.teacherName}</p>
              <p>Sana: {currentDate}</p>
              {test.settings.timeLimitMinutes > 0 && (
                <p>Vaqt: {test.settings.timeLimitMinutes} daqiqa</p>
              )}
            </div>
          </div>

          {/* Student Header Details (For exam sheet filling) */}
          {version === 'student' && (
            <div className="p-4 rounded-xl border border-slate-300 mb-6 grid grid-cols-2 gap-4 text-xs">
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-slate-500 font-medium">O‘quvchining F.I.Sh:</span>
              </div>
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-slate-500 font-medium">Sinfi / Guruhi:</span>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {test.questions.map((q, idx) => (
              <div key={q.id || idx} className="text-xs leading-relaxed border-b border-slate-100 pb-4">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 text-sm">{idx + 1}.</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{q.question}</p>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-2 mt-2.5">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isCorrect = version === 'teacher' && q.correctAnswer === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : 'border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="font-bold">{letter})</span>
                            <span>{opt}</span>
                            {isCorrect && (
                              <span className="ml-auto text-[10px] text-emerald-700 font-bold uppercase">
                                ✓ Kalit
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Teacher Explanation */}
                    {version === 'teacher' && q.explanation && (
                      <div className="mt-2.5 p-2 rounded bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-950">
                        <strong>Metodik yechim:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Student Bubble Answer Sheet Area at the bottom */}
          {version === 'student' && (
            <div className="mt-8 pt-6 border-t-2 border-slate-900">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Javoblar varaqasi (Variant doirasini to‘ldiring):
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {test.questions.map((_, qIdx) => (
                  <div key={qIdx} className="p-2 border border-slate-200 rounded text-center text-[10px]">
                    <div className="font-bold text-slate-700 mb-1">{qIdx + 1}</div>
                    <div className="flex justify-center gap-1 text-[9px] font-mono">
                      <span>A</span>
                      <span>B</span>
                      <span>C</span>
                      <span>D</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 flex items-center justify-between">
            <span>EduTest AI — O‘zbekiston ta’lim tizimi uchun test platformasi</span>
            <span>Varag‘ingizni tekshirib o‘qituvchiga topshiring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

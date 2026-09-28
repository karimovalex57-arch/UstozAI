export type Role = 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  school?: string;
  avatar?: string;
}

export type DifficultyLevel = 'Oson' | 'O‘rtacha' | 'Qiyin' | 'Aralash';
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'mixed';
export type AppLanguage = 'uz' | 'en' | 'ru';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options (0, 1, 2, 3)
  explanation: string;
  difficulty: 'Oson' | 'O‘rtacha' | 'Qiyin';
  type?: 'multiple_choice' | 'true_false' | 'short_answer';
}

export interface TestSettings {
  timeLimitMinutes: number; // 0 means no timer
  showAnswersAfterSubmit: boolean;
  showExplanations: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export interface TestItem {
  id: string;
  code: string; // e.g. "ET-48291"
  title: string;
  subject: string;
  grade: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  language: string;
  instructions?: string;
  questions: Question[];
  settings: TestSettings;
  createdAt: string;
  teacherId: string;
  teacherName: string;
  participantCount: number;
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation: string;
}

export interface StudentSubmission {
  id: string;
  testId: string;
  testCode: string;
  testTitle: string;
  subject: string;
  grade: string;
  studentName: string;
  studentClass?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<string, number>;
  questionBreakdown: QuestionResult[];
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: AppLanguage;
  defaultTimer: number;
  showAnswersDefault: boolean;
  showExplanationsDefault: boolean;
  randomizeQuestionsDefault: boolean;
  randomizeOptionsDefault: boolean;
}

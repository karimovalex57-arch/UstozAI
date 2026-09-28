import { TestItem, StudentSubmission, User, AppSettings } from '../types';

const STORAGE_KEYS = {
  TESTS: 'edutest_tests_v1',
  SUBMISSIONS: 'edutest_submissions_v1',
  CURRENT_USER: 'edutest_current_user_v1',
  SETTINGS: 'edutest_settings_v1',
};

export const DEFAULT_USER: User = {
  id: 'teacher-aziza',
  name: 'Aziza Karimova',
  email: 'aziza.karimova@maktab.uz',
  role: 'teacher',
  school: '178-sonli ixtisoslashtirilgan maktab',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  language: 'uz',
  defaultTimer: 20,
  showAnswersDefault: true,
  showExplanationsDefault: true,
  randomizeQuestionsDefault: false,
  randomizeOptionsDefault: false,
};

const SEED_TESTS: TestItem[] = [
  {
    id: 'test-algebra-8',
    code: 'ET-48291',
    title: '8-sinf Algebra — Kvadrat tenglamalar',
    subject: 'Matematika',
    grade: '8-sinf',
    topic: 'Kvadrat tenglamalar va Viyet teoremasi',
    difficulty: 'O‘rtacha',
    questionType: 'multiple_choice',
    language: 'O‘zbekcha',
    instructions: 'Har bir misolda diskriminant va Viyet teoremasidan to‘g‘ri foydalanish qobiliyati baholanadi.',
    createdAt: '2026-09-24T09:30:00.000Z',
    teacherId: 'teacher-aziza',
    teacherName: 'Aziza Karimova',
    participantCount: 4,
    settings: {
      timeLimitMinutes: 20,
      showAnswersAfterSubmit: true,
      showExplanations: true,
      randomizeQuestions: false,
      randomizeOptions: false,
    },
    questions: [
      {
        id: 'q-alg-1',
        question: 'x² - 5x + 6 = 0 tenglamaning ildizlari qaysilar?',
        options: ['1 va 6', '2 va 3', '3 va 4', '2 va 4'],
        correctAnswer: 1,
        explanation: 'Viyet teoremasiga ko‘ra x₁ + x₂ = 5 va x₁ · x₂ = 6. Demak ildizlar 2 va 3.',
        difficulty: 'Oson',
      },
      {
        id: 'q-alg-2',
        question: '2x² - 4x + 2 = 0 tenglamaning diskriminanti (D) nechaga teng?',
        options: ['0', '4', '8', '-8'],
        correctAnswer: 0,
        explanation: 'D = b² - 4ac = (-4)² - 4 · 2 · 2 = 16 - 16 = 0. Tenglama bitta karrali ildizga ega.',
        difficulty: 'Oson',
      },
      {
        id: 'q-alg-3',
        question: 'x² + 3x - 10 = 0 tenglamaning musbat ildizini toping.',
        options: ['2', '5', '-5', '3'],
        correctAnswer: 0,
        explanation: '(x + 5)(x - 2) = 0 bo‘lib, x₁ = -5, x₂ = 2. Musbat ildiz x = 2.',
        difficulty: 'O‘rtacha',
      },
      {
        id: 'q-alg-4',
        question: 'Keltirilgan kvadrat tenglamada x² + px + q = 0, ildizlar yig‘indisi nimaga teng?',
        options: ['-p ga teng', 'p ga teng', 'q ga teng', '-q ga teng'],
        correctAnswer: 0,
        explanation: 'Viyet teoremasining birinchi qoidasiga muvofiq x₁ + x₂ = -p ga teng.',
        difficulty: 'Oson',
      },
      {
        id: 'q-alg-5',
        question: '3x² - 7x + 2 = 0 tenglama ildizlari ko‘paytmasini toping.',
        options: ['2/3', '-2/3', '7/3', '-7/3'],
        correctAnswer: 0,
        explanation: 'Umumiy kvadrat tenglama ax² + bx + c = 0 uchun ildizlar ko‘paytmasi c / a = 2 / 3.',
        difficulty: 'Qiyin',
      },
    ],
  },
  {
    id: 'test-bio-7',
    code: 'ET-72941',
    title: '7-sinf Biologiya — Hujayra tuzilishi',
    subject: 'Biologiya',
    grade: '7-sinf',
    topic: 'O‘simlik va hayvon hujayrasining organoidlari',
    difficulty: 'O‘rtacha',
    questionType: 'multiple_choice',
    language: 'O‘zbekcha',
    instructions: 'Organoidlar va ularning funksiyalari bo‘yicha bilimlar tekshiriladi.',
    createdAt: '2026-09-25T11:15:00.000Z',
    teacherId: 'teacher-aziza',
    teacherName: 'Aziza Karimova',
    participantCount: 3,
    settings: {
      timeLimitMinutes: 15,
      showAnswersAfterSubmit: true,
      showExplanations: true,
      randomizeQuestions: false,
      randomizeOptions: false,
    },
    questions: [
      {
        id: 'q-bio-1',
        question: 'O‘simlik hujayrasida fotosintez jarayoni qaysi organoidda kechadi?',
        options: ['Xloroplast', 'Mitoxondriya', 'Ribosoma', 'Lizosoma'],
        correctAnswer: 0,
        explanation: 'Xloroplast tarkibidagi xlorofill pigmenti yorug‘lik energiyasini yutib fotosintez reaksiyasini amalga oshiradi.',
        difficulty: 'Oson',
      },
      {
        id: 'q-bio-2',
        question: 'Hujayraning "energiya stansiyasi" deb qaysi organoid ataladi?',
        options: ['Mitoxondriya', 'Golji majmuasi', 'Endoplazmatik to‘r', 'Vakuola'],
        correctAnswer: 0,
        explanation: 'Mitoxondriyada ATF (adenozintrifosfat) sintezlanadi, bu esa hujayra uchun asosiy energiya manbaidir.',
        difficulty: 'O‘rtacha',
      },
      {
        id: 'q-bio-3',
        question: 'O‘simlik hujayrasi qobig‘ining asosiy tarkibiy qismi qaysi polisaxarid?',
        options: ['Sellyuloza (kletchatka)', 'Xitin', 'Glikogen', 'Kraxmal'],
        correctAnswer: 0,
        explanation: 'O‘simliklarning hujayra po‘sti mustahkam sellyuloza tolalaridan tuzilgan.',
        difficulty: 'O‘rtacha',
      },
      {
        id: 'q-bio-4',
        question: 'Irsiy axborotni saqlovchi va nasldan-naslga o‘tkazuvchi asosiy tuzilma qaysi?',
        options: ['Yadro (DNK)', 'Sitoplazma', 'Sentrosoma', 'Plastidalar'],
        correctAnswer: 0,
        explanation: 'Yadro tarkibidagi xromosomalar DNK molekulalaridan iborat bo‘lib genetik kodni saqlaydi.',
        difficulty: 'Oson',
      },
    ],
  },
  {
    id: 'test-eng-9',
    code: 'ET-31085',
    title: '9-sinf English — Present Perfect Tense',
    subject: 'Ingliz tili',
    grade: '9-sinf',
    topic: 'Present Perfect vs Past Simple and Time Expressions',
    difficulty: 'O‘rtacha',
    questionType: 'multiple_choice',
    language: 'English',
    instructions: 'Focus on signal words (ever, never, already, yet, just, since, for).',
    createdAt: '2026-09-26T14:20:00.000Z',
    teacherId: 'teacher-aziza',
    teacherName: 'Aziza Karimova',
    participantCount: 4,
    settings: {
      timeLimitMinutes: 20,
      showAnswersAfterSubmit: true,
      showExplanations: true,
      randomizeQuestions: false,
      randomizeOptions: false,
    },
    questions: [
      {
        id: 'q-eng-1',
        question: 'I have _______ visited London, but I hope to go there next year.',
        options: ['never', 'ever', 'yet', 'already'],
        correctAnswer: 0,
        explanation: '“Never” is used in affirmative sentences with a negative meaning for past experiences.',
        difficulty: 'Oson',
      },
      {
        id: 'q-eng-2',
        question: 'She _______ her homework yet. Can you wait for five minutes?',
        options: ['hasn’t finished', 'didn’t finish', 'hadn’t finished', 'doesn’t finish'],
        correctAnswer: 0,
        explanation: '“Yet” is commonly used in negative Present Perfect sentences at the end of the clause.',
        difficulty: 'O‘rtacha',
      },
      {
        id: 'q-eng-3',
        question: 'We have lived in Samarkand _______ 2018.',
        options: ['since', 'for', 'during', 'from'],
        correctAnswer: 0,
        explanation: '“Since” is used with a specific starting point in time (year, date, specific moment).',
        difficulty: 'Oson',
      },
      {
        id: 'q-eng-4',
        question: 'Which sentence is grammatically correct?',
        options: [
          'Have you ever seen a shooting star?',
          'Did you ever saw a shooting star?',
          'Have you ever saw a shooting star?',
          'Do you ever seen a shooting star?'
        ],
        correctAnswer: 0,
        explanation: 'Present Perfect question formula: Have/Has + subject + ever + V3 (past participle).',
        difficulty: 'O‘rtacha',
      },
    ],
  },
  {
    id: 'test-phys-10',
    code: 'ET-90412',
    title: '10-sinf Fizika — Dinamika va Nyuton qonunlari',
    subject: 'Fizika',
    grade: '10-sinf',
    topic: 'Nyutonning uchta qonuni va kuchlar muvozanati',
    difficulty: 'Qiyin',
    questionType: 'multiple_choice',
    language: 'O‘zbekcha',
    instructions: 'Kuch, massa va tezlanish bog‘liqligi masalalari.',
    createdAt: '2026-09-27T08:00:00.000Z',
    teacherId: 'teacher-aziza',
    teacherName: 'Aziza Karimova',
    participantCount: 2,
    settings: {
      timeLimitMinutes: 25,
      showAnswersAfterSubmit: true,
      showExplanations: true,
      randomizeQuestions: false,
      randomizeOptions: false,
    },
    questions: [
      {
        id: 'q-phys-1',
        question: 'Massasi 5 kg bo‘lgan jismga 20 N kuch ta’sir qilmoqda. Jismning tezlanishini aniqlang.',
        options: ['4 m/s²', '100 m/s²', '0.25 m/s²', '15 m/s²'],
        correctAnswer: 0,
        explanation: 'Nyutonning ikkinchi qonuni: F = ma => a = F / m = 20 / 5 = 4 m/s².',
        difficulty: 'Oson',
      },
      {
        id: 'q-phys-2',
        question: 'Nyutonning uchinchi qonuniga ko‘ra harakat va ta’sir kuchi qanday munosabatda bo‘ladi?',
        options: [
          'Modul jihatdan teng, yo‘nalish jihatdan qarama-qarshi',
          'Modul jihatdan har xil, yo‘nalishi bir xil',
          'Har doim harakat kuchi ta’sir kuchidan katta',
          'Faqat harakatsiz jismlarda teng bo‘ladi'
        ],
        correctAnswer: 0,
        explanation: 'F₁ = -F₂: Ta’sir kuchi har doim aks ta’sir kuchiga modul bo‘yicha teng va qarama-qarshi yo‘nalgandir.',
        difficulty: 'O‘rtacha',
      },
    ],
  },
];

const SEED_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-1',
    testId: 'test-algebra-8',
    testCode: 'ET-48291',
    testTitle: '8-sinf Algebra — Kvadrat tenglamalar',
    subject: 'Matematika',
    grade: '8-sinf',
    studentName: 'Ali Vohidov',
    studentClass: '8-“A”',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    timeSpentSeconds: 420,
    submittedAt: '2026-09-27T10:14:00.000Z',
    answers: { 'q-alg-1': 1, 'q-alg-2': 0, 'q-alg-3': 0, 'q-alg-4': 0, 'q-alg-5': 0 },
    questionBreakdown: [
      { questionId: 'q-alg-1', questionText: 'x² - 5x + 6 = 0 ildizlari', options: ['1 va 6', '2 va 3', '3 va 4', '2 va 4'], selectedOption: 1, correctOption: 1, isCorrect: true, explanation: 'Viyet teoremasi' },
      { questionId: 'q-alg-2', questionText: '2x² - 4x + 2 = 0 D nechaga teng?', options: ['0', '4', '8', '-8'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: 'D = 0' },
      { questionId: 'q-alg-3', questionText: 'x² + 3x - 10 = 0 musbat ildizi', options: ['2', '5', '-5', '3'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: 'x = 2' },
      { questionId: 'q-alg-4', questionText: 'x² + px + q = 0 ildizlar yig‘indisi', options: ['-p', 'p', 'q', '-q'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: '-p' },
      { questionId: 'q-alg-5', questionText: '3x² - 7x + 2 = 0 ildizlar ko‘paytmasi', options: ['2/3', '-2/3', '7/3', '-7/3'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: '2/3' },
    ],
  },
  {
    id: 'sub-2',
    testId: 'test-algebra-8',
    testCode: 'ET-48291',
    testTitle: '8-sinf Algebra — Kvadrat tenglamalar',
    subject: 'Matematika',
    grade: '8-sinf',
    studentName: 'Madina Rahimova',
    studentClass: '8-“A”',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    timeSpentSeconds: 510,
    submittedAt: '2026-09-27T10:45:00.000Z',
    answers: { 'q-alg-1': 1, 'q-alg-2': 0, 'q-alg-3': 0, 'q-alg-4': 0, 'q-alg-5': 2 },
    questionBreakdown: [
      { questionId: 'q-alg-1', questionText: 'x² - 5x + 6 = 0 ildizlari', options: ['1 va 6', '2 va 3', '3 va 4', '2 va 4'], selectedOption: 1, correctOption: 1, isCorrect: true, explanation: 'To‘g‘ri' },
      { questionId: 'q-alg-2', questionText: '2x² - 4x + 2 = 0 D nechaga teng?', options: ['0', '4', '8', '-8'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: 'To‘g‘ri' },
      { questionId: 'q-alg-3', questionText: 'x² + 3x - 10 = 0 musbat ildizi', options: ['2', '5', '-5', '3'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: 'To‘g‘ri' },
      { questionId: 'q-alg-4', questionText: 'x² + px + q = 0 ildizlar yig‘indisi', options: ['-p', 'p', 'q', '-q'], selectedOption: 0, correctOption: 0, isCorrect: true, explanation: 'To‘g‘ri' },
      { questionId: 'q-alg-5', questionText: '3x² - 7x + 2 = 0 ildizlar ko‘paytmasi', options: ['2/3', '-2/3', '7/3', '-7/3'], selectedOption: 2, correctOption: 0, isCorrect: false, explanation: 'Noto‘g‘ri variant tanlangan' },
    ],
  },
  {
    id: 'sub-3',
    testId: 'test-algebra-8',
    testCode: 'ET-48291',
    testTitle: '8-sinf Algebra — Kvadrat tenglamalar',
    subject: 'Matematika',
    grade: '8-sinf',
    studentName: 'Jasur Bekmirzayev',
    studentClass: '8-“B”',
    score: 3,
    totalQuestions: 5,
    percentage: 60,
    timeSpentSeconds: 680,
    submittedAt: '2026-09-27T11:20:00.000Z',
    answers: { 'q-alg-1': 0, 'q-alg-2': 0, 'q-alg-3': 0, 'q-alg-4': 1, 'q-alg-5': 0 },
    questionBreakdown: [],
  },
  {
    id: 'sub-4',
    testId: 'test-algebra-8',
    testCode: 'ET-48291',
    testTitle: '8-sinf Algebra — Kvadrat tenglamalar',
    subject: 'Matematika',
    grade: '8-sinf',
    studentName: 'Dilnoza Saidova',
    studentClass: '8-“B”',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    timeSpentSeconds: 390,
    submittedAt: '2026-09-27T11:55:00.000Z',
    answers: { 'q-alg-1': 1, 'q-alg-2': 0, 'q-alg-3': 0, 'q-alg-4': 0, 'q-alg-5': 0 },
    questionBreakdown: [],
  },
  {
    id: 'sub-5',
    testId: 'test-bio-7',
    testCode: 'ET-72941',
    testTitle: '7-sinf Biologiya — Hujayra tuzilishi',
    subject: 'Biologiya',
    grade: '7-sinf',
    studentName: 'Sardor Qodirov',
    studentClass: '7-“A”',
    score: 3,
    totalQuestions: 4,
    percentage: 75,
    timeSpentSeconds: 310,
    submittedAt: '2026-09-27T12:30:00.000Z',
    answers: {},
    questionBreakdown: [],
  },
  {
    id: 'sub-6',
    testId: 'test-eng-9',
    testCode: 'ET-31085',
    testTitle: '9-sinf English — Present Perfect Tense',
    subject: 'Ingliz tili',
    grade: '9-sinf',
    studentName: 'Rayhona Normurodova',
    studentClass: '9-“V”',
    score: 4,
    totalQuestions: 4,
    percentage: 100,
    timeSpentSeconds: 290,
    submittedAt: '2026-09-27T13:10:00.000Z',
    answers: {},
    questionBreakdown: [],
  },
];

export function getTests(): TestItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(SEED_TESTS));
      return SEED_TESTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_TESTS;
  }
}

export function saveTests(tests: TestItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(tests));
  } catch (err) {
    console.error('Failed to save tests to localStorage:', err);
  }
}

export function saveTest(test: TestItem): TestItem {
  const tests = getTests();
  const index = tests.findIndex((t) => t.id === test.id);
  if (index >= 0) {
    tests[index] = test;
  } else {
    tests.unshift(test);
  }
  saveTests(tests);
  return test;
}

export function deleteTest(testId: string): void {
  const tests = getTests().filter((t) => t.id !== testId);
  saveTests(tests);
}

export function getTestById(id: string): TestItem | undefined {
  return getTests().find((t) => t.id === id);
}

export function getTestByCode(code: string): TestItem | undefined {
  const cleanCode = code.trim().toUpperCase();
  return getTests().find((t) => t.code.toUpperCase() === cleanCode);
}

export function generateTestCode(): string {
  const randNum = Math.floor(10000 + Math.random() * 90000);
  return `ET-${randNum}`;
}

export function getSubmissions(): StudentSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SEED_SUBMISSIONS));
      return SEED_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_SUBMISSIONS;
  }
}

export function saveSubmission(submission: StudentSubmission): void {
  try {
    const submissions = getSubmissions();
    submissions.unshift(submission);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));

    // Update test participantCount
    const tests = getTests();
    const test = tests.find((t) => t.id === submission.testId);
    if (test) {
      test.participantCount = (test.participantCount || 0) + 1;
      saveTests(tests);
    }
  } catch (err) {
    console.error('Failed to save submission:', err);
  }
}

export function getCurrentUser(): User {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
}

export function setCurrentUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to set current user:', err);
  }
}

export function getAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.error('Failed to save app settings:', err);
  }
}

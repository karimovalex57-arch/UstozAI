import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Setup Gemini AI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with provided key:', err);
  }
}

// Fallback questions generator for guaranteed uptime & rich realistic demo topics
function generateCurriculumFallback(
  subject: string,
  topic: string,
  grade: string,
  count: number,
  difficulty: string,
  questionType: string,
  language: string
) {
  const langLower = (language || '').toLowerCase();
  const isUzbek = langLower.includes('zbek') || langLower.includes('uz') || langLower === '';
  const isRussian = langLower.includes('rus') || langLower.includes('ru');
  
  const questions = [];
  const topicClean = topic || (isUzbek ? 'Asosiy tushunchalar' : 'General Concepts');

  for (let i = 1; i <= count; i++) {
    let qText = '';
    let opts = [];
    let correctIdx = (i - 1) % 4;
    let explanation = '';

    if (isUzbek) {
      if (subject.toLowerCase().includes('matematika') || subject.toLowerCase().includes('algebra')) {
        const a = i + 1;
        const b = i * 2;
        qText = `${topicClean}: ${a}x + ${b} = ${a * 3 + b} tenglamaning ildizini toping.`;
        opts = [
          `x = 3`,
          `x = ${(correctIdx === 1 ? 3 : 2)}`,
          `x = ${(correctIdx === 2 ? 3 : 4)}`,
          `x = ${(correctIdx === 3 ? 3 : 1)}`
        ];
        opts[correctIdx] = `x = 3`;
        explanation = `${a}x = ${a * 3 + b} - ${b} => ${a}x = ${a * 3} => x = 3`;
      } else if (subject.toLowerCase().includes('fizika')) {
        qText = `${grade}-sinf Fizika (${topicClean}): Quyidagi qonuniyatlardan qaysi biri to'g'ri ta'riflangan? (Savol #${i})`;
        opts = [
          `${topicClean} jarayonida energiya saqlanish qonuni bajariladi`,
          `Harakat tezligi doimo tebranish chastotasiga teskari proporsional`,
          `Gravitatsiya kuchi jismlar massasi ko'paytmasiga teskari proporsional`,
          `Moddaning ichki energiyasi uning haroratiga bog'liq emas`
        ];
        correctIdx = 0;
        opts[correctIdx] = `${topicClean} jarayonida energiya saqlanish qonuni bajariladi`;
        explanation = `Tabiatning fundamental qonuniga ko'ra energiya yo'qdan bor bo'lmaydi va yo'qolmaydi, faqat bir turdan boshqasiga aylanadi.`;
      } else if (subject.toLowerCase().includes('biologiya')) {
        qText = `${grade}-sinf Biologiya: "${topicClean}" mavzusiga oid asosiy biologik tuzilma yoki funksiya qaysi? (Savol #${i})`;
        opts = [
          `Hujayra metabolizmi va fermentativ faollik`,
          `Faqatgina mineral tuzlarning noorganik to'planishi`,
          `DNK replikatsiyasining to'liq to'xtashi`,
          `Ribosomalarning sitoplazmadan ajralishi`
        ];
        correctIdx = 0;
        explanation = `Biologiyada hujayra faoliyati metabolizm va fermentlarning muvozanatli reaksiyalari orqali ta'minlanadi.`;
      } else if (subject.toLowerCase().includes('ona tili') || subject.toLowerCase().includes('adabiyot')) {
        qText = `"${topicClean}" bo'yicha berilgan qoidalardan qaysi biri amaldagi imlo va grammatika talablariga mos? (Savol #${i})`;
        opts = [
          `Gapda bosh bo'laklar bilan ikkinchi darajali bo'laklar moslashuv va boshqaruv asosida bog'lanadi`,
          `Undov so'zlar har doim boshqa so'zlarga tobe bog'lanadi`,
          `Fe'l nisbatlari gapda faqat kesim vazifasida keladi`,
          `Kirish so'zlar gap bo'laklari bilan grammatik jihatdan uzviy bog'lanadi`
        ];
        correctIdx = 0;
        explanation = `O'zbek tili sintaksisida so'zlar o'zaro moslashuv, boshqaruv va bitishuv yo'li bilan sintaktik aloqaga kirishadi.`;
      } else {
        qText = `${subject} (${grade}-sinf): "${topicClean}" mavzusi bo'yicha ${i}-asosiy qoidani aniqlang.`;
        opts = [
          `${topicClean} tushunchasining ilmiy va amaliy ahamiyati yuqori hisoblanadi`,
          `Ushbu holat faqat nazariy jihatdan mavjud bo'lib, amaliyotda qo'llanilmaydi`,
          `Mazkur qonuniyat faqat o'tgan asrlarga xos deb topilgan`,
          `Tizim elementlari bir-biriga mutlaqo bog'liq bo'lmagan holda ishlaydi`
        ];
        correctIdx = 0;
        explanation = `Mavzuni o'rganishda asosiy tamoyillarning amaliy ahamiyati va o'zaro bog'liqligi hal qiluvchi rol o'ynaydi.`;
      }
    } else if (isRussian) {
      qText = `${subject} (${grade}): Вопрос #${i} по теме "${topicClean}". Какое утверждение является верным?`;
      opts = [
        `Данный принцип строго соблюдается в рамках темы "${topicClean}"`,
        `Процесс не имеет практического значения`,
        `Теория противоречит фундаментальным законам`,
        `Все переменные взаимно компенсируются без изменений`
      ];
      correctIdx = 0;
      explanation = `В рамках академической программы утверждение точно описывает изучаемый процесс.`;
    } else {
      qText = `${subject} (${grade}): Question #${i} regarding "${topicClean}". Which of the following is correct?`;
      opts = [
        `The fundamental principle of ${topicClean} is accurately applied`,
        `The hypothesis has been proven completely obsolete`,
        `External factors do not influence the outcome`,
        `Energy is not conserved during this specific transformation`
      ];
      correctIdx = 0;
      explanation = `This statement reflects the core understanding and pedagogical objective for ${grade}.`;
    }

    if (questionType === 'true_false') {
      opts = isUzbek ? ['To‘g‘ri', 'Noto‘g‘ri'] : ['True', 'False'];
      correctIdx = i % 2 === 0 ? 0 : 1;
      explanation = isUzbek 
        ? `Ushbu tasdiq ${opts[correctIdx]} hisoblanadi, chunki mavzu qoidalariga to'liq javob beradi.`
        : `This statement is ${opts[correctIdx]} based on the standard curriculum curriculum principles.`;
    }

    questions.push({
      id: `q-${Date.now()}-${i}`,
      question: qText,
      options: opts,
      correctAnswer: correctIdx,
      explanation: explanation,
      difficulty: difficulty === 'Mixed' || difficulty === 'Aralash' ? (i % 3 === 0 ? 'Qiyin' : i % 2 === 0 ? 'O‘rtacha' : 'Oson') : difficulty,
      type: questionType === 'true_false' ? 'true_false' : 'multiple_choice'
    });
  }

  return questions;
}

// API: Generate Test with Gemini
app.post('/api/generate-test', async (req: Request, res: Response) => {
  const {
    subject = 'Matematika',
    grade = '8-sinf',
    topic = 'Kvadrat tenglamalar',
    questionCount = 10,
    difficulty = 'O‘rtacha',
    questionType = 'multiple_choice',
    language = 'O‘zbekcha',
    instructions = '',
  } = req.body;

  const count = Math.min(Math.max(Number(questionCount) || 5, 3), 50);

  // If Gemini AI client is initialized, attempt real AI generation
  if (ai) {
    try {
      const prompt = `Siz maktab va oliy o'quv yurtlari uchun yuqori darajadagi professional test tuzuvchi metodistsiz.
Quyidagi parametrlarga muvofiq professional ta'lim test savollarini yarating:
- Fan (Subject): ${subject}
- Sinf/Kurs (Grade): ${grade}
- Mavzu (Topic): ${topic}
- Savollar soni (Number of questions): ${count}
- Qiyinlik darajasi (Difficulty): ${difficulty}
- Savol turi (Question type): ${questionType} (masalan: ko'p tanlovli 4 ta variant yoki to'g'ri/noto'g'ri)
- Til (Language): ${language}
- Qo'shimcha o'qituvchi ko'rsatmasi (Additional instructions): ${instructions || 'Yo\'q'}

Talablar:
1. Har bir savol chuqur pedagogik asosga ega bo'lsin, bir-birini takrorlamasin.
2. Har bir savol uchun aniq 4 ta variant (agar true_false bo'lsa 2 ta variant: "To'g'ri", "Noto'g'ri") bo'lsin.
3. correctAnswer - bu to'g'ri javob varianti indeksi (0, 1, 2, yoki 3).
4. explanation - nima uchun ushbu javob to'g'ri ekanligi haqida qisqa, aniq va tushunarli metodik izoh.
5. Har bir savolda toza ilmiy va adabiy tildan foydalaning.

Javobni FAQAT quyidagi JSON formatida qaytaring:
{
  "title": "${subject} — ${topic} (${grade})",
  "questions": [
    {
      "question": "Savol matni...",
      "options": ["A varianti", "B varianti", "C varianti", "D varianti"],
      "correctAnswer": 0,
      "explanation": "Izoh matni...",
      "difficulty": "${difficulty}"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctAnswer: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                  },
                  required: ['question', 'options', 'correctAnswer', 'explanation'],
                },
              },
            },
            required: ['title', 'questions'],
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          const formattedQuestions = parsed.questions.map((q: any, idx: number) => ({
            id: `q-${Date.now()}-${idx + 1}`,
            question: q.question,
            options: q.options || [],
            correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
            explanation: q.explanation || '',
            difficulty: q.difficulty || difficulty,
            type: questionType === 'true_false' ? 'true_false' : 'multiple_choice',
          }));

          return res.json({
            success: true,
            title: parsed.title || `${subject} — ${topic}`,
            questions: formattedQuestions,
            source: 'gemini-3.8-flash',
          });
        }
      }
    } catch (error: any) {
      console.error('Gemini generation error, falling back to curriculum engine:', error?.message || error);
    }
  }

  // Graceful fallback to curriculum engine
  const fallbackQuestions = generateCurriculumFallback(
    subject,
    topic,
    grade,
    count,
    difficulty,
    questionType,
    language
  );

  return res.json({
    success: true,
    title: `${subject}: ${topic} (${grade})`,
    questions: fallbackQuestions,
    source: 'curriculum-engine',
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    aiEnabled: Boolean(ai),
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduTest AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start EduTest AI server:', err);
  process.exit(1);
});

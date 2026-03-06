"use client";

import React, { useState, useCallback } from "react";
import Header from "../components/header";

// ─── Lesson Data ────────────────────────────────────────────────────────────

type Question = {
  prompt: string;
  promptLang: "en" | "bg";
  answer: string;
  choices: string[];
  hint?: string;
};

type Lesson = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  questions: Question[];
};

const LESSONS: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    description: "Learn how to say hello and goodbye",
    color: "from-green-500 to-emerald-600",
    questions: [
      {
        prompt: "Hello",
        promptLang: "en",
        answer: "Здравей",
        choices: ["Здравей", "Довиждане", "Благодаря", "Моля"],
        hint: "This is the most common greeting in Bulgarian",
      },
      {
        prompt: "Goodbye",
        promptLang: "en",
        answer: "Довиждане",
        choices: ["Здравей", "Довиждане", "Добре", "Да"],
        hint: "Literally means 'until we see each other again'",
      },
      {
        prompt: "Thank you",
        promptLang: "en",
        answer: "Благодаря",
        choices: ["Моля", "Благодаря", "Добре", "Да"],
      },
      {
        prompt: "Please / You're welcome",
        promptLang: "en",
        answer: "Моля",
        choices: ["Благодаря", "Здравей", "Моля", "Не"],
        hint: "This word works for both 'please' and 'you're welcome'",
      },
      {
        prompt: "Здравей",
        promptLang: "bg",
        answer: "Hello",
        choices: ["Goodbye", "Hello", "Thank you", "Please"],
      },
      {
        prompt: "Довиждане",
        promptLang: "bg",
        answer: "Goodbye",
        choices: ["Hello", "Yes", "Goodbye", "No"],
      },
      {
        prompt: "Good morning",
        promptLang: "en",
        answer: "Добро утро",
        choices: ["Добро утро", "Лека нощ", "Добър ден", "Здравей"],
      },
      {
        prompt: "Good night",
        promptLang: "en",
        answer: "Лека нощ",
        choices: ["Добро утро", "Лека нощ", "Довиждане", "Добър ден"],
      },
    ],
  },
  {
    id: "basics",
    title: "Basics",
    emoji: "✨",
    description: "Yes, no, and essential words",
    color: "from-blue-500 to-indigo-600",
    questions: [
      {
        prompt: "Yes",
        promptLang: "en",
        answer: "Да",
        choices: ["Не", "Да", "Може би", "Добре"],
        hint: "Short and simple!",
      },
      {
        prompt: "No",
        promptLang: "en",
        answer: "Не",
        choices: ["Да", "Не", "Добре", "Може би"],
      },
      {
        prompt: "Maybe",
        promptLang: "en",
        answer: "Може би",
        choices: ["Да", "Не", "Може би", "Добре"],
      },
      {
        prompt: "OK / Fine",
        promptLang: "en",
        answer: "Добре",
        choices: ["Добре", "Може би", "Да", "Не"],
      },
      {
        prompt: "I don't understand",
        promptLang: "en",
        answer: "Не разбирам",
        choices: ["Не разбирам", "Разбирам", "Говоря", "Учa"],
        hint: "Не = no/not, разбирам = I understand",
      },
      {
        prompt: "Да",
        promptLang: "bg",
        answer: "Yes",
        choices: ["No", "Maybe", "Yes", "OK"],
      },
      {
        prompt: "Не",
        promptLang: "bg",
        answer: "No",
        choices: ["Yes", "No", "Maybe", "Fine"],
      },
      {
        prompt: "Може би",
        promptLang: "bg",
        answer: "Maybe",
        choices: ["Yes", "No", "Maybe", "Fine"],
      },
    ],
  },
  {
    id: "numbers",
    title: "Numbers",
    emoji: "🔢",
    description: "Count from 1 to 10",
    color: "from-purple-500 to-violet-600",
    questions: [
      {
        prompt: "One",
        promptLang: "en",
        answer: "Едно",
        choices: ["Едно", "Две", "Три", "Четири"],
      },
      {
        prompt: "Two",
        promptLang: "en",
        answer: "Две",
        choices: ["Едно", "Две", "Три", "Четири"],
      },
      {
        prompt: "Three",
        promptLang: "en",
        answer: "Три",
        choices: ["Две", "Три", "Четири", "Пет"],
      },
      {
        prompt: "Four",
        promptLang: "en",
        answer: "Четири",
        choices: ["Три", "Четири", "Пет", "Шест"],
      },
      {
        prompt: "Five",
        promptLang: "en",
        answer: "Пет",
        choices: ["Четири", "Пет", "Шест", "Седем"],
      },
      {
        prompt: "Шест",
        promptLang: "bg",
        answer: "Six",
        choices: ["Five", "Six", "Seven", "Eight"],
      },
      {
        prompt: "Седем",
        promptLang: "bg",
        answer: "Seven",
        choices: ["Six", "Seven", "Eight", "Nine"],
      },
      {
        prompt: "Eight",
        promptLang: "en",
        answer: "Осем",
        choices: ["Седем", "Осем", "Девет", "Десет"],
      },
      {
        prompt: "Nine",
        promptLang: "en",
        answer: "Девет",
        choices: ["Осем", "Девет", "Десет", "Едно"],
      },
      {
        prompt: "Ten",
        promptLang: "en",
        answer: "Десет",
        choices: ["Девет", "Десет", "Едно", "Две"],
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    emoji: "🎨",
    description: "Learn to describe colors",
    color: "from-pink-500 to-rose-600",
    questions: [
      {
        prompt: "Red",
        promptLang: "en",
        answer: "Червен",
        choices: ["Червен", "Син", "Зелен", "Жълт"],
      },
      {
        prompt: "Blue",
        promptLang: "en",
        answer: "Син",
        choices: ["Червен", "Син", "Зелен", "Жълт"],
      },
      {
        prompt: "Green",
        promptLang: "en",
        answer: "Зелен",
        choices: ["Зелен", "Жълт", "Оранжев", "Лилав"],
      },
      {
        prompt: "Yellow",
        promptLang: "en",
        answer: "Жълт",
        choices: ["Зелен", "Жълт", "Оранжев", "Бял"],
      },
      {
        prompt: "White",
        promptLang: "en",
        answer: "Бял",
        choices: ["Бял", "Черен", "Сив", "Кафяв"],
      },
      {
        prompt: "Черен",
        promptLang: "bg",
        answer: "Black",
        choices: ["White", "Black", "Gray", "Brown"],
      },
      {
        prompt: "Оранжев",
        promptLang: "bg",
        answer: "Orange",
        choices: ["Pink", "Purple", "Orange", "Red"],
      },
      {
        prompt: "Purple",
        promptLang: "en",
        answer: "Лилав",
        choices: ["Лилав", "Розов", "Оранжев", "Кафяв"],
      },
    ],
  },
  {
    id: "food",
    title: "Food & Drinks",
    emoji: "🍕",
    description: "Common food and drink words",
    color: "from-orange-500 to-amber-600",
    questions: [
      {
        prompt: "Water",
        promptLang: "en",
        answer: "Вода",
        choices: ["Вода", "Хляб", "Мляко", "Сок"],
        hint: "Essential for survival!",
      },
      {
        prompt: "Bread",
        promptLang: "en",
        answer: "Хляб",
        choices: ["Вода", "Хляб", "Сирене", "Месо"],
      },
      {
        prompt: "Milk",
        promptLang: "en",
        answer: "Мляко",
        choices: ["Вода", "Хляб", "Мляко", "Кафе"],
      },
      {
        prompt: "Coffee",
        promptLang: "en",
        answer: "Кафе",
        choices: ["Чай", "Кафе", "Вода", "Сок"],
      },
      {
        prompt: "Кафе",
        promptLang: "bg",
        answer: "Coffee",
        choices: ["Tea", "Juice", "Coffee", "Water"],
      },
      {
        prompt: "Cheese",
        promptLang: "en",
        answer: "Сирене",
        choices: ["Месо", "Сирене", "Яйце", "Риба"],
        hint: "Bulgaria is famous for its white cheese!",
      },
      {
        prompt: "Риба",
        promptLang: "bg",
        answer: "Fish",
        choices: ["Meat", "Egg", "Fish", "Cheese"],
      },
      {
        prompt: "Apple",
        promptLang: "en",
        answer: "Ябълка",
        choices: ["Ябълка", "Портокал", "Банан", "Грозде"],
      },
    ],
  },
  {
    id: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    description: "Talk about your family",
    color: "from-teal-500 to-cyan-600",
    questions: [
      {
        prompt: "Mother",
        promptLang: "en",
        answer: "Майка",
        choices: ["Майка", "Баща", "Брат", "Сестра"],
      },
      {
        prompt: "Father",
        promptLang: "en",
        answer: "Баща",
        choices: ["Майка", "Баща", "Дядо", "Баба"],
      },
      {
        prompt: "Brother",
        promptLang: "en",
        answer: "Брат",
        choices: ["Сестра", "Брат", "Майка", "Баща"],
      },
      {
        prompt: "Sister",
        promptLang: "en",
        answer: "Сестра",
        choices: ["Брат", "Сестра", "Дядо", "Баба"],
      },
      {
        prompt: "Дядо",
        promptLang: "bg",
        answer: "Grandfather",
        choices: ["Grandmother", "Grandfather", "Father", "Uncle"],
      },
      {
        prompt: "Grandmother",
        promptLang: "en",
        answer: "Баба",
        choices: ["Дядо", "Баба", "Майка", "Леля"],
        hint: "Баба also informally means 'old woman'",
      },
      {
        prompt: "Child",
        promptLang: "en",
        answer: "Дете",
        choices: ["Дете", "Приятел", "Съсед", "Брат"],
      },
      {
        prompt: "Friend",
        promptLang: "en",
        answer: "Приятел",
        choices: ["Приятел", "Дете", "Брат", "Сестра"],
      },
    ],
  },
];

// ─── Phonetics ───────────────────────────────────────────────────────────────

const PHONETICS: Record<string, string> = {
  // Greetings
  "Здравей": "ZDRA-vey",
  "Довиждане": "do-VIZH-da-ne",
  "Благодаря": "bla-go-da-RYA",
  "Моля": "MO-lya",
  "Добро утро": "DO-bro OO-tro",
  "Лека нощ": "LE-ka nosht",
  "Добър ден": "DO-bar den",
  // Basics
  "Да": "da",
  "Не": "ne",
  "Може би": "MO-zhe bi",
  "Добре": "do-BRE",
  "Не разбирам": "ne raz-BI-ram",
  "Разбирам": "raz-BI-ram",
  "Говоря": "go-VO-rya",
  "Учa": "U-cha",
  // Numbers
  "Едно": "ED-no",
  "Две": "dve",
  "Три": "tri",
  "Четири": "che-TI-ri",
  "Пет": "pet",
  "Шест": "shest",
  "Седем": "SE-dem",
  "Осем": "O-sem",
  "Девет": "DE-vet",
  "Десет": "DE-set",
  // Colors
  "Червен": "CHER-ven",
  "Син": "sin",
  "Зелен": "ZE-len",
  "Жълт": "zhalt",
  "Бял": "byal",
  "Черен": "CHE-ren",
  "Оранжев": "o-RAN-zhev",
  "Лилав": "LI-lav",
  "Розов": "RO-zov",
  "Кафяв": "kaf-YAV",
  "Сив": "siv",
  // Food
  "Вода": "vo-DA",
  "Хляб": "hlyab",
  "Мляко": "MLYA-ko",
  "Кафе": "ka-FE",
  "Чай": "chay",
  "Сок": "sok",
  "Сирене": "si-RE-ne",
  "Месо": "ME-so",
  "Яйце": "yay-TSE",
  "Риба": "RI-ba",
  "Ябълка": "YA-bal-ka",
  "Портокал": "por-to-KAL",
  "Банан": "ba-NAN",
  "Грозде": "GROZ-de",
  // Family
  "Майка": "MAY-ka",
  "Баща": "bash-TA",
  "Брат": "brat",
  "Сестра": "ses-TRA",
  "Дядо": "DYA-do",
  "Баба": "BA-ba",
  "Дете": "de-TE",
  "Приятел": "pri-YA-tel",
  "Съсед": "SA-sed",
  "Леля": "LE-lya",
};

function phonetic(word: string): string | undefined {
  return PHONETICS[word];
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "home" | "lesson" | "result";

type AnswerState = "unanswered" | "correct" | "incorrect";

// ─── Alphabet Popup ───────────────────────────────────────────────────────────

const CYRILLIC_LETTERS = [
  { bg: "А а", en: "A" },
  { bg: "Б б", en: "B" },
  { bg: "В в", en: "V" },
  { bg: "Г г", en: "G" },
  { bg: "Д д", en: "D" },
  { bg: "Е е", en: "E" },
  { bg: "Ж ж", en: "ZH" },
  { bg: "З з", en: "Z" },
  { bg: "И и", en: "I" },
  { bg: "Й й", en: "Y" },
  { bg: "К к", en: "K" },
  { bg: "Л л", en: "L" },
  { bg: "М м", en: "M" },
  { bg: "Н н", en: "N" },
  { bg: "О о", en: "O" },
  { bg: "П п", en: "P" },
  { bg: "Р р", en: "R" },
  { bg: "С с", en: "S" },
  { bg: "Т т", en: "T" },
  { bg: "У у", en: "U" },
  { bg: "Ф ф", en: "F" },
  { bg: "Х х", en: "H" },
  { bg: "Ц ц", en: "TS" },
  { bg: "Ч ч", en: "CH" },
  { bg: "Ш ш", en: "SH" },
  { bg: "Щ щ", en: "SHT" },
  { bg: "Ъ ъ", en: '"UH"' },
  { bg: "Ь ь", en: "soft sign" },
  { bg: "Ю ю", en: "YU" },
  { bg: "Я я", en: "YA" },
];

function AlphabetModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">The Bulgarian Alphabet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Bulgarian uses the Cyrillic script. Many letters look similar to Latin!
        </p>
        <div className="grid grid-cols-5 gap-2">
          {CYRILLIC_LETTERS.map((l) => (
            <div
              key={l.bg}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2"
            >
              <span className="text-lg font-bold">{l.bg}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{l.en}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────

function HomeScreen({
  completedLessons,
  onStartLesson,
}: {
  completedLessons: Set<string>;
  onStartLesson: (lesson: Lesson) => void;
}) {
  const [showAlphabet, setShowAlphabet] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {showAlphabet && <AlphabetModal onClose={() => setShowAlphabet(false)} />}

      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🇧🇬</div>
        <h1 className="text-3xl font-bold mb-2">Learn Bulgarian</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Super beginner friendly — start from zero!
        </p>
        <button
          onClick={() => setShowAlphabet(true)}
          className="mt-4 text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          View the Cyrillic Alphabet
        </button>
      </div>

      {completedLessons.size > 0 && (
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-full px-4 py-2">
            <span className="text-yellow-500 font-bold text-lg">
              {completedLessons.size}
            </span>
            <span className="text-yellow-700 dark:text-yellow-300 text-sm font-medium">
              lesson{completedLessons.size !== 1 ? "s" : ""} completed
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {LESSONS.map((lesson) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onStartLesson(lesson)}
              className={`relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all shadow-sm cursor-pointer
                ${
                  isCompleted
                    ? "bg-white dark:bg-gray-800 border-2 border-green-400 hover:shadow-md"
                    : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300"
                }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${lesson.color} shadow-sm flex-shrink-0`}
              >
                {lesson.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{lesson.title}</span>
                  {isCompleted && (
                    <span className="text-green-500 text-sm font-bold">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {lesson.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {lesson.questions.length} questions
                </p>
              </div>
              <div className={`text-xl ${isCompleted ? "text-green-400" : "text-gray-400"}`}>›</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Lesson Screen ────────────────────────────────────────────────────────────

function LessonScreen({
  lesson,
  onComplete,
  onExit,
}: {
  lesson: Lesson;
  onComplete: (lessonId: string, score: number, total: number) => void;
  onExit: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const current = lesson.questions[qIndex];
  const progress = (qIndex / lesson.questions.length) * 100;

  const handleSelect = useCallback(
    (choice: string) => {
      if (answerState !== "unanswered") return;
      setSelected(choice);
      if (choice === current.answer) {
        setAnswerState("correct");
        setScore((s) => s + 1);
      } else {
        setAnswerState("incorrect");
        setHearts((h) => Math.max(0, h - 1));
      }
    },
    [answerState, current.answer]
  );

  const handleNext = useCallback(() => {
    const nextIndex = qIndex + 1;
    if (nextIndex >= lesson.questions.length || hearts === 0) {
      onComplete(lesson.id, score, lesson.questions.length);
    } else {
      setQIndex(nextIndex);
      setSelected(null);
      setAnswerState("unanswered");
    }
  }, [qIndex, lesson, hearts, score, onComplete]);

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onExit}
          className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center"
        >
          &times;
        </button>
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={`text-lg ${i < hearts ? "opacity-100" : "opacity-20"}`}>
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {current.promptLang === "en" ? "Translate to Bulgarian" : "Translate to English"}
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="text-3xl">{current.promptLang === "en" ? "🇬🇧" : "🇧🇬"}</div>
          <div>
            <p className="text-2xl font-bold">{current.prompt}</p>
            {current.promptLang === "bg" && phonetic(current.prompt) && (
              <p className="text-sm text-blue-500 dark:text-blue-400 mt-0.5 font-mono">
                ({phonetic(current.prompt)})
              </p>
            )}
            {current.hint && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 italic">
                Hint: {current.hint}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {current.choices.map((choice) => {
          let btnClass =
            "border-2 rounded-xl p-4 text-base font-semibold text-left transition-all duration-200 ";
          if (answerState === "unanswered") {
            btnClass +=
              "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer active:scale-95";
          } else if (choice === current.answer) {
            btnClass +=
              "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
          } else if (choice === selected && answerState === "incorrect") {
            btnClass +=
              "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
          } else {
            btnClass +=
              "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-50";
          }

          const ph = phonetic(choice);
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={btnClass}
            >
              <span>{choice}</span>
              {ph && (
                <span className="block text-xs font-normal opacity-60 font-mono mt-0.5">
                  ({ph})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {answerState !== "unanswered" && (
        <div
          className={`rounded-2xl p-5 flex items-center justify-between transition-all ${
            answerState === "correct"
              ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-400"
              : "bg-red-50 dark:bg-red-900/20 border-2 border-red-400"
          }`}
        >
          <div>
            <p
              className={`font-bold text-base ${
                answerState === "correct"
                  ? "text-green-700 dark:text-green-300"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {answerState === "correct" ? "Correct!" : "Incorrect!"}
            </p>
            {answerState === "incorrect" && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                Answer: <span className="font-semibold">{current.answer}</span>
                {phonetic(current.answer) && (
                  <span className="ml-1 font-mono opacity-70">({phonetic(current.answer)})</span>
                )}
              </p>
            )}
          </div>
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-white transition-colors ${
              answerState === "correct"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {qIndex + 1 >= lesson.questions.length || hearts === 0
              ? "Finish"
              : "Next"}
          </button>
        </div>
      )}

      {/* Question counter */}
      <p className="text-center text-xs text-gray-400 mt-4">
        {qIndex + 1} / {lesson.questions.length}
      </p>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────

function ResultScreen({
  lesson,
  score,
  total,
  onHome,
  onRetry,
}: {
  lesson: Lesson;
  score: number;
  total: number;
  onHome: () => void;
  onRetry: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <div className="text-6xl mb-4">{passed ? "🎉" : "😅"}</div>
      <h2 className="text-2xl font-bold mb-2">
        {passed ? "Lesson Complete!" : "Good effort!"}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {passed
          ? "You're making great progress with Bulgarian!"
          : "Keep practicing — you'll get it!"}
      </p>

      {/* Score ring */}
      <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-8 border-green-400 mb-8">
        <span className="text-3xl font-bold">{pct}%</span>
        <span className="text-sm text-gray-500">
          {score}/{total} correct
        </span>
      </div>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        {passed && (
          <button
            onClick={onHome}
            className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-base transition-colors"
          >
            Continue Learning
          </button>
        )}
        <button
          onClick={onRetry}
          className="w-full py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-base transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          className="w-full py-3 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
        >
          Back to lessons
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BulgarianPage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setScreen("lesson");
  };

  const handleComplete = (lessonId: string, score: number, total: number) => {
    setLastScore({ score, total });
    const pct = Math.round((score / total) * 100);
    if (pct >= 70) {
      setCompletedLessons((prev) => new Set([...prev, lessonId]));
    }
    setScreen("result");
  };

  const handleRetry = () => {
    if (activeLesson) {
      setScreen("lesson");
    }
  };

  const handleHome = () => {
    setActiveLesson(null);
    setScreen("home");
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-1 pb-12">
        {screen === "home" && (
          <HomeScreen
            completedLessons={completedLessons}
            onStartLesson={handleStartLesson}
          />
        )}
        {screen === "lesson" && activeLesson && (
          <LessonScreen
            lesson={activeLesson}
            onComplete={handleComplete}
            onExit={handleHome}
          />
        )}
        {screen === "result" && activeLesson && (
          <ResultScreen
            lesson={activeLesson}
            score={lastScore.score}
            total={lastScore.total}
            onHome={handleHome}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
}

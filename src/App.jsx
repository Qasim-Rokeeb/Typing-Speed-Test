// src/components/TypingTest.jsx
import { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect, so keep typing every day.",
  "JavaScript is a versatile programming language.",
  "React and Tailwind make frontend development easier.",
  "Typing fast takes accuracy, rhythm, and patience.",
  "OpenAI creates powerful language models like ChatGPT.",
  "Frontend development involves both logic and design.",
  "Never stop learning, the journey has just begun."
];

export default function TypingTest() {
  const [sentence, setSentence] = useState(getRandomSentence());
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  function getRandomSentence() {
    return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  }

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput === sentence) {
      const endTime = Date.now();
      const minutes = (endTime - startTime) / 1000 / 60;
      const words = sentence.trim().split(" ").length;
      const calculatedWpm = Math.round(words / minutes);
      const correctChars = sentence
        .split("")
        .filter((char, idx) => userInput[idx] === char).length;
      const calculatedAccuracy = Math.round((correctChars / sentence.length) * 100);

      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
      setIsFinished(true);
    }
  }, [userInput]);

  const handleRestart = () => {
    setSentence(getRandomSentence());
    setUserInput("");
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 max-w-3xl w-full space-y-6 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 dark:text-white">Typing Speed Test</h1>

        <p className="text-lg sm:text-xl text-center font-medium text-gray-700 dark:text-gray-300 bg-blue-100 dark:bg-gray-800 px-4 py-3 rounded">
          {sentence}
        </p>

        <textarea
          rows="3"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Start typing here..."
        />

        {isFinished && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="text-xl font-bold text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 p-4 rounded-lg bg-green-50 dark:bg-green-900">
              WPM: {wpm}
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
              Accuracy: {accuracy}%
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            <FaRedo className="text-white" />
            Restart Test
          </button>
        </div>
      </div>
    </div>
  );
}

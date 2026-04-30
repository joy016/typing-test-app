"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosRefresh } from "react-icons/io";

const sentences = [
  {
    key: 1,
    words:
      "apple banana keyboard monitor coffee window planet school river garden",
  },
  {
    key: 2,
    words:
      "function variable react nextjs typescript backend frontend database redux algorithm",
  },
  {
    key: 3,
    words:
      "success discipline growth focus progress challenge effort future dream consistency, success discipline growth focus progress challenge effort future dream consistency",
  },
];

interface Type {
  seconds: number;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  timeKey: number;
}

const TypingSection = ({
  seconds,
  isRunning,
  setIsRunning,
  setSeconds,
  timeKey,
}: Type) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [wordsTyped, setWordsTyped] = useState("");
  const inputRef = useRef(null);

  const shuffleWords = () => {
    setWordsTyped("");
    setCurrentIndex(0);
    setSentenceIdx((prevIdx) => {
      let newIdx;
      do {
        newIdx = Math.floor(Math.random() * sentences.length);
      } while (newIdx === prevIdx);
      return newIdx;
    });
    setIsRunning(false);
    setSeconds(timeKey);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (e: any) => {
    //it means the user type in , touch the keyboard
    setIsRunning(true);
    if (e.key.length === 1) {
      setCurrentIndex((prev) => prev + 1);
      setWordsTyped((prev) => prev + e.key);
    }
    if (e.key === "Backspace") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setWordsTyped((prev) => prev.slice(0, -1));
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-3/4 h-auto flex flex-col justify-center items-center gap-5">
      {isRunning && (
        <h3 className="self-start text-[#FACC15] tracking-widest text-4xl ml-[20px]">
          {formatTime(seconds)}
        </h3>
      )}

      <div onClick={() => inputRef.current.focus()}>
        {/* hidden input that captures keyboard */}
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute"
        />

        {/* display UI */}
        <h3 className="text-[#6B7280] text-lg md:text-4xl font-mono tracking-widest text-center leading-snug">
          {sentences[sentenceIdx].words.split("").map((char, index) => {
            let color = "";

            if (index < wordsTyped.length) {
              color =
                wordsTyped[index] === char ? "text-[#FACC15]" : "text-red-400";
            }

            return (
              <span key={index} className={`relative ${color}`}>
                {char}
                {index === currentIndex && (
                  <span className="absolute left-0 top-0 w-[5px] h-10 bg-[#FACC15] animate-pulse" />
                )}
              </span>
            );
          })}
        </h3>
      </div>
      <button
        onClick={shuffleWords}
        className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#2A2B3D] transition"
      >
        <IoIosRefresh size={20} />
      </button>
    </div>
  );
};

export default TypingSection;

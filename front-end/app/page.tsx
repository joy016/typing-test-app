"use client";

import { useEffect, useState } from "react";
import SubHeader from "./component/SubHeader";
import TypingSection from "./component/TypingSection";

export default function Home() {
  const [timeKey, setTimeKey] = useState<number>(30);
  const [seconds, setSeconds] = useState<number>(timeKey);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (seconds === 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setTimeout(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds, isRunning]);

  return (
    <div className="p-[2rem]">
      <div>
        <SubHeader
          timeKey={timeKey}
          setTimeKey={setTimeKey}
          setSeconds={setSeconds}
        />
      </div>
      <div className="h-screen flex items-center justify-center flex-col">
        <TypingSection
          seconds={seconds}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          setSeconds={setSeconds}
          timeKey={timeKey}
        />
      </div>
    </div>
  );
}

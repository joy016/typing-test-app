import React, { Dispatch, SetStateAction } from "react";
import { IoSettings } from "react-icons/io5";

const timerOptions = [
  {
    key: 15,
    label: 15,
  },
  {
    key: 30,
    label: 30,
  },
  {
    key: 60,
    label: 60,
  },
  {
    key: 120,
    label: 120,
  },
  {
    key: 100,
    label: "customize",
  },
];

const sentenceType = [
  {
    key: 1,
    label: "Time",
  },
  {
    key: 2,
    label: "Words",
  },
  {
    key: 3,
    label: "Qoute",
  },
  {
    key: 4,
    label: "customize",
  },
];

interface SubHeader {
  timeKey: number;
  setTimeKey: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
}

const SubHeader = ({ timeKey, setTimeKey, setSeconds }: SubHeader) => {
  return (
    <div className="flex  items-center justify-center gap-[2rem]">
      {/* senteces type */}
      <div className="bg-[#313647] p-3 rounded-md flex gap-2 shadow-sm">
        {sentenceType.map((time) =>
          time.label === "customize" ? (
            <button
              key={time.key}
              className="text-[#6B7280] hover:text-white text-md tracking-widest transition-colors duration-200"
            >
              <IoSettings />
            </button>
          ) : (
            <button
              key={time.key}
              className="text-[#6B7280] hover:text-white text-md  tracking-widest transition-colors duration-200"
            >
              {time.label}
            </button>
          ),
        )}
      </div>
      {/*  timer options */}
      <div className="bg-[#313647] p-3 rounded-md flex gap-2 shadow-sm">
        {timerOptions.map((time) =>
          time.label === "customize" ? (
            <button
              key={time.key}
              className="text-[#6B7280] hover:text-white text-md tracking-widest transition-colors duration-200"
            >
              <IoSettings />
            </button>
          ) : (
            <button
              key={time.key}
              className={`${timeKey === time.key ? "text-[#FACC15]" : "text-[#6B7280]"} text-[#6B7280] hover:text-white  text-md tracking-widest transition-colors duration-200`}
              onClick={() => {
                setTimeKey(time.key);
                setSeconds(time.key);
              }}
            >
              {time.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default SubHeader;

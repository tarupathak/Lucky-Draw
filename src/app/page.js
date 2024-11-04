"use client";
import { useState } from "react";
import Header from "./header";

export default function Home() {
  const [currentNumber, setCurrentNumber] = useState(["0", "0", "0"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLuckyNumberFound, setIsLuckyNumberFound] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const generateLuckyNumber = () => {
    let randomNum;
    do {
      randomNum = String(Math.floor(Math.random() * 120) + 1).padStart(3, "0");
    } while (
      generatedNumbers.includes(randomNum) &&
      generatedNumbers.length < 120
    );

    return randomNum;
  };

  const handleClick = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsLuckyNumberFound(false);

    let intervalId;
    let count = 0;

    intervalId = setInterval(() => {
      const newNum = String(Math.floor(Math.random() * 120) + 1)
        .padStart(3, "0")
        .split("");
      setCurrentNumber(newNum);
      count++;

      if (count >= 25) {
        clearInterval(intervalId);
        const luckyNumber = generateLuckyNumber().split("");
        setCurrentNumber(luckyNumber);
        setGeneratedNumbers([...generatedNumbers, luckyNumber.join("")]);
        setIsGenerating(false);
        setIsLuckyNumberFound(true); // Mark lucky number as found
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-center text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <h1 className="text-5xl font-bold text-yellow-400 mt-10 mb-4">
        LUCKY DRAW
      </h1>

      <div className="flex items-center justify-center mb-4">
        {currentNumber.map((digit, index) => (
          <div
            key={index}
            className={`text-5xl md:text-6xl font-bold ${
              isLuckyNumberFound ? "text-yellow-400" : "text-white"
            } bg-purple-700 border-4 border-purple-600 w-16 h-20 mx-2 flex items-center justify-center rounded-md shadow-lg`}
          >
            {digit}
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        disabled={isGenerating}
        className={`mt-8 px-8 py-4 rounded-md font-semibold text-white transition ${
          isGenerating
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isGenerating ? "Generating..." : "Find Lucky Number"}
      </button>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import logoRight from '../../public/image2.jpg';
import Image from "next/image";

export default function Home() {
  const [currentNumber, setCurrentNumber] = useState(["0", "0", "0"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLuckyNumberFound, setIsLuckyNumberFound] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [luckyNumber, setLuckyNumber] = useState("");
  const [isHistoryPopupVisible, setIsHistoryPopupVisible] = useState(false);

  useEffect(() => {
    // Clear sessionStorage and localStorage on page reload
    sessionStorage.clear();  // Clears sessionStorage data
    localStorage.clear();    // Clears localStorage data (if you are using localStorage as well)

    // Optionally, you can initialize or reset the state here
    setGeneratedNumbers([]);  // Reset generated numbers state
  }, []);

  useEffect(() => {
    // Storing the generated numbers in sessionStorage
    sessionStorage.setItem("generatedNumbers", JSON.stringify(generatedNumbers));
  }, [generatedNumbers]);

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

      if (count >= 30) {
        clearInterval(intervalId);
        const luckyNum = generateLuckyNumber();
        setCurrentNumber(luckyNum.split(""));
        setGeneratedNumbers((prev) => [...prev, luckyNum]);
        setLuckyNumber(luckyNum);
        setIsGenerating(false);
        setIsLuckyNumberFound(true);
      }
    }, 50);
  };

  const closePopup = () => {
    setIsLuckyNumberFound(false);
  };

  const toggleHistoryPopup = () => {
    setIsHistoryPopupVisible(!isHistoryPopupVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-center text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 ">
        <div className="flex items-center space-x-4">
          <Image
            src={logoRight} // Replace with the path to your logo image
            alt="Logo"
            className="w-16 h-16"
          />
          <h1 className="text-3xl font-bold text-yellow-400">AKGEC Skills</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center mb-4 mt-12">
        {currentNumber.map((digit, index) => (
          <div
            key={index}
            className={`text-9xl md:text-[10rem] font-extrabold ${
              isLuckyNumberFound ? "text-yellow-400" : "text-white"
            } bg-gradient-to-r from-purple-700 to-blue-700 border-4 border-purple-600 w-40 h-44 mx-3 flex items-center justify-center rounded-lg shadow-xl`}
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

      {/* Congratulations Popup */}
      {isLuckyNumberFound && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gradient-to-b from-purple-800 to-blue-700 text-white text-center p-8 rounded-xl shadow-2xl transform transition-all animate-bounceY w-full sm:w-auto">
            <h2 className="text-6xl font-extrabold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-3xl mb-6">Number {luckyNumber} is the winner!</p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-3 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* History Button */}
      <button
        onClick={toggleHistoryPopup}
        className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition"
      >
        Show History
      </button>

      {/* History Popup */}
      {isHistoryPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gradient-to-b from-purple-800 to-blue-700 text-white text-center p-8 rounded-xl shadow-2xl w-full sm:w-80 max-h-96 overflow-y-auto">
            <h3 className="text-4xl font-bold mb-4">Generated Numbers</h3>
            <ul className="text-xl space-y-2 list-inside list-disc">
              {generatedNumbers.length > 0 ? (
                generatedNumbers.map((num, idx) => (
                  <li key={idx} className="text-yellow-400 font-semibold">
                    {num}
                  </li>
                ))
              ) : (
                <li className="text-white">No numbers generated yet</li>
              )}
            </ul>
            <button
              onClick={toggleHistoryPopup}
              className="mt-4 px-6 py-3 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounceY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounceY {
          animation: bounceY 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Board from "./components/Board";

export default function Page() {
  const [difficulty, setDifficulty] = useState<number>(1);

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const mineCount = parseInt(event.target.value, 10);
    setDifficulty(mineCount);
  };

  return (
    <div className="bg-black min-h-[100dvh] flex flex-col justify-center items-center mx-5">
      <h1 className="text-2xl font-extrabold text-center text-gradient  mb-6">
        MineSweeper
      </h1>

      <select
        value={difficulty}
        onChange={handleDifficultyChange}
        className="difficulty-select text-black mb-6 p-2 border  rounded"
      >
        <option value={1}>Puppy: 1 mine</option>
        <option value={3}>Expert: 3 mines</option>
        <option value={5}>God: 5 mines</option>
        <option value={7}>Programmer: 7 mines</option>
        <option value={12}>Gladiator: 12 mines</option>
        <option value={24}>Really impossible: 24 mines</option>
      </select>

      <Board size={5} mineCount={difficulty} />
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import RestartButton from "./RestartButton";
import Confetti from "react-confetti";

interface BoardProps {
  size: number;
  mineCount: number;
}

const Board: React.FC<BoardProps> = ({ size, mineCount }) => {
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedCells, setRevealedCells] = useState<boolean[]>(
    Array(size * size).fill(false)
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    initGame();
  }, [mineCount]);

  useEffect(() => {
    if (gameWon) {
      let timer = 5;
      setCountdown(timer);
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(interval);
          initGame();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameWon]);

  const initGame = () => {
    const newMinePositions: number[] = generateMines();
    setMinePositions(newMinePositions);
    setRevealedCells(Array(size * size).fill(false));
    setGameOver(false);
    setGameWon(false);
    setCountdown(null);
  };

  const generateMines = () => {
    const mines: number[] = [];
    while (mines.length < mineCount) {
      const position = Math.floor(Math.random() * (size * size));
      if (!mines.includes(position)) {
        mines.push(position);
      }
    }
    return mines;
  };

  const handleCellClick = (index: number) => {
    if (gameOver || revealedCells[index]) return;
    if (minePositions.includes(index)) {
      setGameOver(true);
    }
    revealCell(index);
  };

  const revealCell = (index: number) => {
    const newRevealedCells = [...revealedCells];
    newRevealedCells[index] = true;
    setRevealedCells(newRevealedCells);
    checkWin(newRevealedCells);
  };

  const checkWin = (revealedCells: boolean[]) => {
    const revealedNonMineCells = revealedCells.filter(
      (cell, index) => !minePositions.includes(index) && cell
    ).length;
    if (revealedNonMineCells === size * size - mineCount) {
      setGameWon(true);
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const cellIndex = i * size + j;
        row.push(
          <Cell
            key={cellIndex}
            isMine={minePositions.includes(cellIndex)}
            isRevealed={revealedCells[cellIndex]}
            onClick={() => handleCellClick(cellIndex)}
          />
        );
      }
      cells.push(
        <div key={i} className="flex">
          {row}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="board p-5">
      {renderCells()}
      {gameOver && <RestartButton onClick={initGame} />}
      {gameWon && <Confetti />}
      {countdown !== null && (
        <div className="countdown text-center">Game restarts in {countdown}</div>
      )}
    </div>
  );
};

export default Board;

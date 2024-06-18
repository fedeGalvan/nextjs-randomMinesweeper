import React from "react";

interface RestartButtonProps {
  onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition  ease-out transform hover:scale-105 block mx-auto mt-5 text-md"
      onClick={onClick}
    >
      Restart Game
    </button>
  );
};

export default RestartButton;

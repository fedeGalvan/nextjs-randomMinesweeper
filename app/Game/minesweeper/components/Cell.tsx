import React from "react";

interface CellProps {
  isMine: boolean;
  isRevealed: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isMine, isRevealed, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`cell m-2 w-14 h-14  flex justify-center items-center cursor-pointer text-2xl rounded-md perspective-1000 ${
        isRevealed ? "bg-green-300" : "bg-gray-100"
      } ${isMine && isRevealed ? "mine-cell" : ""}`}
      onClick={handleClick}
      style={{
        transform: isRevealed ? "rotateY(180deg)" : "none",
        transition: "transform 0.3s ease",
      }}
    >
      {isRevealed &&
        (isMine ? (
          <span style={{ transform: "rotateY(180deg)" }}>💣</span>
        ) : (
          <span style={{ transform: "rotateY(180deg)" }}></span>
        ))}
    </div>
  );
};

export default Cell;

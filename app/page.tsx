import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href={"/Game/minesweeper"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition ease-out transform hover:scale-105 text-md">
          Click to play
        </button>
      </Link>
    </div>
  );
}

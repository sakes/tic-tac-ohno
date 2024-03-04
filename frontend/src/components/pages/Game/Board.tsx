import { useMemo } from "react";
import { computeBorderStyle } from "./Board.util";

const ROWS = [0, 1, 2];
const COLS = [0, 1, 2];

const Cell = ({ row, idx }) => {
  const borderStyle = useMemo(() => computeBorderStyle(row, idx), [row, idx]);
  return (
    <div
      className={`flex-none w-[100px] h-[100px] flex justify-center bg-white text-black border-0 border-black ${borderStyle}`}
    >
      <div className="flex-none self-center ">
        {row}, {idx}
      </div>
    </div>
  );
};

const Row = ({ idx }) => {
  return (
    <div className="flex">
      {COLS.map((col) => (
        <Cell row={idx} idx={col} />
      ))}
    </div>
  );
};

const Board = () => (
  <div className="text-center">
    <div className="inline-block">
      {ROWS.map((row) => (
        <Row idx={row} />
      ))}
    </div>
  </div>
);

export default Board;

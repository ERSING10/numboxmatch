import { useEffect, useState } from 'react';
import { COLORS, COLS, ROWS } from '../app/constants';

type Block = { value: number; color: string; };
type Cell = Block | null;

export const useGameLogic = () => {
  const [board, setBoard] = useState<Cell[][]>([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    let newBoard: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
      let row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        if (r >= ROWS - 3) {
          let randomNum = Math.floor(Math.random() * 9) + 1;
          row.push({ value: randomNum, color: COLORS[randomNum] });
        } else {
          row.push(null);
        }
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };
  
  return { board };
};
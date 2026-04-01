import { useEffect, useState } from 'react';
import { COLORS, COLS, ROWS } from '../app/constants';

type Block = { value: number; color: string; };
type Cell = Block | null;

export const useGameLogic = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [selectedCells, setSelectedCells] = useState<{r: number, c: number}[]>([]);

  const [errorCells, setErrorCells] = useState<{r: number, c: number}[]>([]); // Hatalı seçilenler kırmızı olacak
  const [activeBlock, setActiveBlock] = useState<{r: number, c: number, value: number, color: string} | null>(null); // Havadan düşen blok
  const [tick, setTick] = useState<number>(0); // timer

  useEffect(() => {
    initializeBoard();
    generateNewTarget();
  }, []);

  //5000 / 8 (satır oldugu icin) = 625ms de bir aşağı kayar
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(prev => prev + 1);
    }, 625); 
    return () => clearInterval(timer);
  }, []);

  // düsen blogun hareketi
  useEffect(() => {
    if (!activeBlock) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      const randomCol = Math.floor(Math.random() * COLS);
      setActiveBlock({ r: 0, c: randomCol, value: randomNum, color: COLORS[randomNum] });
    } else {
      const nextR = activeBlock.r + 1;
      // Zemin veya altındaki kutu kontrolü
      if (nextR >= ROWS || board[nextR][activeBlock.c] !== null) {
        // Çarptıysa asıl matrise (board) yapıştır ve düşen bloğu sıfırla
        setBoard(prev => {
          const newBoard = prev.map(row => [...row]);
          newBoard[activeBlock.r][activeBlock.c] = { value: activeBlock.value, color: activeBlock.color };
          return newBoard;
        });
        setActiveBlock(null);
      } else {
        // Çarpmadıysa 1 birim (satır) aşağı indir
        setActiveBlock(prev => prev ? { ...prev, r: nextR } : null);
      }
    }
  }, [tick]);

// blokların patlaması ve kalan blokların asagı kayması
  useEffect(() => {
    if (selectedCells.length > 0) {
      // seçili kutuların değerlerini topla
      let currentSum = 0;
      selectedCells.forEach((cell) => {
        const block = board[cell.r][cell.c];
        if (block) {
          currentSum += block.value;
        }
      });

      if (currentSum === targetNumber) {
        console.log("Hedef vuruldu! Kutular patlıyor ve yerçekimi devreye giriyor...");
        
        setBoard((prevBoard) => {
          let tempBoard = prevBoard.map(row => [...row]); 
          
          // ilk secilenler null
          selectedCells.forEach((c) => {
            tempBoard[c.r][c.c] = null;
          });

          for (let c = 0; c < COLS; c++) {  
            for (let r = ROWS - 1; r >= 0; r--) {
              if (tempBoard[r][c] === null) {
                for (let k = r - 1; k >= 0; k--) {
                  if (tempBoard[k][c] !== null) {
                    tempBoard[r][c] = tempBoard[k][c];
                    tempBoard[k][c] = null; // Eski yerini boşalt
                    break; 
                  }
                }
              }
            }
          }

          return tempBoard; 
        });

        setSelectedCells([]);
        generateNewTarget();
      } 
      else if (currentSum > targetNumber) {
        setErrorCells(selectedCells); //hatalı secim kırmızı
        setSelectedCells([]); //seçimleri sıfırla

        setTimeout(() => {
          setErrorCells([]);
        }, 500);
      }
    }
  }, [selectedCells, targetNumber, board]);

  // oyun tahtasını başlatır
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

  //random hedef sayi üretir
  const generateNewTarget = () => {
    const newTarget = Math.floor(Math.random() * 21) + 10;
    setTargetNumber(newTarget);
  };
  
  //hücreye tıklama mantığı: Seçilen hücre zaten seçiliyse geri alma, değilse seçme. Maksimum 4 hücre seçilebilir ve sadece komşu hücreler seçilebilir.
  const handleCellPress = (r: number, c: number) => {
    if (activeBlock && r === activeBlock.r && c === activeBlock.c) return;

    setSelectedCells((prev) => {
      // tıklanan kutu zaten seçili mi
      const clickedIndex = prev.findIndex((cell) => cell.r === r && cell.c === c);
      if (clickedIndex !== -1) {
        return prev.slice(0, clickedIndex); // geri alma 
      }                                     // slice: (ilk tıklanana tekrar tıklanırsa tüm seçimler iptal olur)   

      if (prev.length >= 4) {
        return prev;
      }
      // komsu kare kontrolü
      if (prev.length > 0) {
        const lastSelected = prev[prev.length - 1]; 
        const isAdjacent = 
          Math.abs(lastSelected.r - r) <= 1 && 
          Math.abs(lastSelected.c - c) <= 1;
        
        if (!isAdjacent) {
          return prev;
        }
      }

      return [...prev, { r, c }];
    });
  };

  // Aktif düşen bloğu da dahil ederek tahtayı günceller ve geri döndürür
  const displayBoard = board.map(row => [...row]);
  if (activeBlock) {
    displayBoard[activeBlock.r][activeBlock.c] = { value: activeBlock.value, color: activeBlock.color };
  }

  return { board: displayBoard, targetNumber, handleCellPress, selectedCells, errorCells };
};
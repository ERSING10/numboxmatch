import { useEffect, useState } from 'react';
import { COLORS, COLS, ROWS } from '../app/constants';
import {
  calculateMoveScore,
  getFallInterval,
  getScoreToNextLevel,
  getSpeedLevel,
} from '../utils/scoring';
import { generateReachableTarget } from '../utils/targetGenerator';

type Block = { value: number; color: string; };
type Cell = Block | null;

export const useGameLogic = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [selectedCells, setSelectedCells] = useState<{r: number, c: number}[]>([]);


  const [selectionDirection, setSelectionDirection] = useState<{dr: number, dc: number} | null>(null);

  const [totalScore, setTotalScore] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0); // 3'e ulaşınca ceza uygulanır
  const [errorCells, setErrorCells] = useState<{r: number, c: number}[]>([]); // Hatalı seçilenler kırmızı olacak
  const [activeBlock, setActiveBlock] = useState<{r: number, c: number, value: number, color: string} | null>(null); // Havadan düşen blok
  const [tick, setTick] = useState<number>(0); // timer
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  
  useEffect(() => {
    const initialBoard = initializeBoard();
    generateTargetFromBoard(initialBoard);
  }, []);

  // en üstte herhangi bi kare varsa biter
  useEffect(() => {
    if (board.length > 0) {
      const isTopRowOccupied = board[0].some(cell => cell !== null);
      if (isTopRowOccupied) {
        setIsGameOver(true);
        setActiveBlock(null);
      }
    }
  }, [board]);

  // Toplam puana göre düşme hızı belirlenir; puan arttıkça interval azalır
  const fallInterval = getFallInterval(totalScore);
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTick(prev => prev + 1);
    }, fallInterval);
    return () => clearInterval(timer);
  }, [isGameOver, fallInterval]);

  // düsen blogun hareketi
  useEffect(() => {
    if (isGameOver) return;

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
  }, [tick,isGameOver]);

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

        // Hamle puanını hesapla ve toplam puana ekle
        const moveScore = calculateMoveScore(selectedCells, board);
        setTotalScore(prev => prev + moveScore);

        // Yeni tahtayı önceden hesapla (hedef üretimi için gerekli)
        const newBoard = board.map(row => [...row]);

        // Seçili blokları kaldır
        selectedCells.forEach((cell) => {
          newBoard[cell.r][cell.c] = null;
        });

        // Yerçekimi: boşlukları doldur
        for (let c = 0; c < COLS; c++) {
          for (let r = ROWS - 1; r >= 0; r--) {
            if (newBoard[r][c] === null) {
              for (let k = r - 1; k >= 0; k--) {
                if (newBoard[k][c] !== null) {
                  newBoard[r][c] = newBoard[k][c];
                  newBoard[k][c] = null;
                  break;
                }
              }
            }
          }
        }

        setBoard(newBoard);
        setSelectedCells([]);
        setSelectionDirection(null);
        // Güncel tahtadan ulaşılabilir bir hedef üret
        generateTargetFromBoard(newBoard);
      }
      else if (currentSum > targetNumber  || (currentSum != targetNumber && selectedCells.length==4)) {
        setErrorCells(selectedCells); // hatalı seçim kırmızı
        setSelectedCells([]);
        setSelectionDirection(null);

        const nextWrong = wrongCount + 1;

        if (nextWrong >= 3) {
          // CEZA: her sütunun mevcut yığınının üstüne yeni bir blok ekle
          setBoard(prev => {
            const penaltyBoard = prev.map(row => [...row]);
            for (let c = 0; c < COLS; c++) {
              // Sütunun en üstteki dolu satırını bul
              let topRow = ROWS; // varsayılan: sütun tamamen boş
              for (let r = 0; r < ROWS; r++) {
                if (penaltyBoard[r][c] !== null) {
                  topRow = r;
                  break;
                }
              }
              // Bir satır üstüne yeni blok yerleştir
              if (topRow > 0) {
                const randomNum = Math.floor(Math.random() * 9) + 1;
                penaltyBoard[topRow - 1][c] = { value: randomNum, color: COLORS[randomNum] };
              }
            }
            return penaltyBoard;
          });
          setWrongCount(0);
        } else {
          setWrongCount(nextWrong);
        }

        setTimeout(() => {
          setErrorCells([]);
        }, 500);
      }
    }
  }, [selectedCells, targetNumber, board]);

  // oyun tahtasını başlatır ve oluşturulan board'u döndürür
  const initializeBoard = (): Cell[][] => {
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
    return newBoard;
  };

  // Tahtadaki mevcut bloklardan ulaşılabilir bir hedef sayı üretir.
  // Geçerli grup bulunamazsa fallback olarak rastgele sayı kullanır.
  const generateTargetFromBoard = (currentBoard: Cell[][]) => {
    const reachable = generateReachableTarget(currentBoard);
    setTargetNumber(reachable ?? Math.floor(Math.random() * 21) + 10);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setSelectedCells([]);
    setSelectionDirection(null);
    setErrorCells([]);
    setActiveBlock(null);
    setTotalScore(0);
    setWrongCount(0);
    const freshBoard = initializeBoard();
    generateTargetFromBoard(freshBoard);
  };
  
  //hücreye tıklama mantığı: Seçilen hücre zaten seçiliyse geri alma, değilse seçme. Maksimum 4 hücre seçilebilir.
  // Sadece komşu ve aynı yönde hücreler seçilebilir (yatay, dikey veya çapraz - tek yön kilitlenir).
  const handleCellPress = (r: number, c: number) => {
    if (isGameOver) return;
    if (activeBlock && r === activeBlock.r && c === activeBlock.c) return;

    // tıklanan kutu zaten seçili mi → geri alma
    const clickedIndex = selectedCells.findIndex((cell) => cell.r === r && cell.c === c);
    if (clickedIndex !== -1) {
      // 2. hücre veya daha öncesine dönülüyorsa yönü sıfırla
      if (clickedIndex <= 1) {
        setSelectionDirection(null);
      }
      setSelectedCells(prev => prev.slice(0, clickedIndex));
      return;
    }

    if (selectedCells.length >= 4) return;

    if (selectedCells.length > 0) {
      const lastSelected = selectedCells[selectedCells.length - 1];
      const dr = r - lastSelected.r;
      const dc = c - lastSelected.c;

      // Komşu olmalı (max 1 adım)
      if (Math.abs(dr) > 1 || Math.abs(dc) > 1) return;

      if (selectedCells.length === 1) {
        // 2. hücre seçilince yönü belirle ve kilitle
        setSelectionDirection({ dr, dc });
      } else {
        // 3. ve 4. hücre aynı yönde devam etmeli
        if (!selectionDirection || dr !== selectionDirection.dr || dc !== selectionDirection.dc) {
          return; // yön uyuşmuyor, seçime izin verme
        }
      }
    }

    setSelectedCells(prev => [...prev, { r, c }]);
  };

  // Aktif düşen bloğu da dahil ederek tahtayı günceller ve geri döndürür
  const displayBoard = board.map(row => [...row]);
  if (activeBlock) {
    displayBoard[activeBlock.r][activeBlock.c] = { value: activeBlock.value, color: activeBlock.color };
  }

  const speedLevel = getSpeedLevel(totalScore);
  const scoreToNext = getScoreToNextLevel(totalScore);

  return {
    board: displayBoard,
    targetNumber,
    handleCellPress,
    selectedCells,
    errorCells,
    isGameOver,
    restartGame,
    totalScore,
    speedLevel,
    scoreToNext,
    wrongCount,
  };
};
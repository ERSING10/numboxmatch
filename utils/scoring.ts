type Block = { value: number; color: string };
type CellData = Block | null;

// Her sayı için sabit puan değerleri
export const POINT_VALUES: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 7,
  6: 9,
  7: 12,
  8: 15,
  9: 20,
};

// Seçilen blokların puan değerlerini toplar
export const calculateMoveScore = (
  selectedCells: { r: number; c: number }[],
  board: CellData[][]
): number => {
  return selectedCells.reduce((total, cell) => {
    const block = board[cell.r][cell.c];
    return total + (block ? (POINT_VALUES[block.value] ?? 0) : 0);
  }, 0);
};

// Toplam puana göre blok düşme aralığını (ms cinsinden, satır başına) döndürür
// Toplam düşme süresi: 0-99 → 5sn, 100-199 → 4sn, 200-299 → 3sn, 300-399 → 2sn, 400+ → 1sn
export const getFallInterval = (totalScore: number): number => {
  if (totalScore >= 400) return 100;  // 1 sn toplam düşme
  if (totalScore >= 300) return 200;  // 2 sn
  if (totalScore >= 200) return 300;  // 3 sn
  if (totalScore >= 100) return 400;  // 4 sn
  return 500;                          // 5 sn (başlangıç)
};

// Puana göre hız seviyesi (1-5)
export const getSpeedLevel = (totalScore: number): number => {
  if (totalScore >= 400) return 5;
  if (totalScore >= 300) return 4;
  if (totalScore >= 200) return 3;
  if (totalScore >= 100) return 2;
  return 1;
};

// Bir sonraki hız seviyesine kaç puan kaldığı (max seviyedeyse null)
export const getScoreToNextLevel = (totalScore: number): number | null => {
  if (totalScore >= 400) return null;
  if (totalScore >= 300) return 400 - totalScore;
  if (totalScore >= 200) return 300 - totalScore;
  if (totalScore >= 100) return 200 - totalScore;
  return 100 - totalScore;
};

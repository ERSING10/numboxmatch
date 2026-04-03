type Block = { value: number; color: string };
type CellData = Block | null;

// Sadece bir yönde ilerlenen 4 temel yön vektörü (çift sayımı önlemek için pozitif yönler)
const DIRECTIONS = [
  { dr: 0, dc: 1 },  // yatay sağ
  { dr: 1, dc: 0 },  // dikey aşağı
  { dr: 1, dc: 1 },  // çapraz sağ-aşağı
  { dr: 1, dc: -1 }, // çapraz sol-aşağı
];

/**
 * Mevcut tahtadaki dolu bloklardan seçilebilir 3-4'lü grupları bulur,
 * bunlardan birini rastgele seçer ve toplamını döndürür.
 * Eğer hiç geçerli grup bulunamazsa null döner.
 */
export const generateReachableTarget = (board: CellData[][]): number | null => {
  const ROWS = board.length;
  const COLS = board[0]?.length ?? 0;

  // Geçerli tüm grupların toplamlarını topla
  const validSums: number[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!board[r][c]) continue;

      for (const { dr, dc } of DIRECTIONS) {
        for (let size = 3; size <= 4; size++) {
          let sum = 0;
          let valid = true;

          for (let i = 0; i < size; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;

            if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || !board[nr][nc]) {
              valid = false;
              break;
            }
            sum += board[nr][nc]!.value;
          }

          if (valid) {
            validSums.push(sum);
          }
        }
      }
    }
  }

  if (validSums.length === 0) return null;

  // Rastgele bir toplamı hedef olarak seç
  return validSums[Math.floor(Math.random() * validSums.length)];
};

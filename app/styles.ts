import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sağ panel + boşluklar için ayrılan alan
const SCORE_PANEL_WIDTH = 76;
const SCORE_PANEL_MARGIN = 8;
const H_PADDING = 16;          // sol + sağ kenar boşluğu
const V_PADDING = 90;          // status bar + genel dikey boşluk
const TARGET_TEXT_HEIGHT = 42; // "Hedef: X" satırının yüksekliği

// Yatayda sığabilecek maksimum hücre boyutu (8 sütun)
const maxCellByWidth = Math.floor(
  (Math.min(screenWidth, 430) - SCORE_PANEL_WIDTH - SCORE_PANEL_MARGIN - H_PADDING) / 8
);

// Dikeyde sığabilecek maksimum hücre boyutu (10 satır)
const maxCellByHeight = Math.floor(
  (screenHeight - V_PADDING - TARGET_TEXT_HEIGHT) / 10
) - 2; // margin payı

// İkisinin minimumunu al, maksimum 40px ile sınırla
export const CELL_SIZE = Math.min(maxCellByWidth, maxCellByHeight, 40);

const FONT_SIZE = Math.max(11, Math.floor(CELL_SIZE * 0.52));

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardColumn: {
    alignItems: 'center',
  },
  targetText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  board: {
    borderWidth: 2,
    borderColor: '#424242',
    backgroundColor: '#EEEEEE',
    padding: 2,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 4,
  },
  cellText: {
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
    color: '#333333',
  },
});

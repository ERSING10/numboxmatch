import React from 'react';
import { View } from 'react-native';
import { styles } from '../app/styles';
import Cell from './Cell';

type Block = { value: number; color: string; };
type CellData = Block | null;

type BoardProps = {
  board: CellData[][];
  onCellPress: (r: number, c: number) => void;
  selectedCells: {r: number, c: number}[];
  errorCells: {r: number, c: number}[];
};

export default function Board({ board, onCellPress, selectedCells, errorCells }: BoardProps) {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => {
            
            const isSelected = selectedCells.some(s => s.r === rowIndex && s.c === colIndex);
            const isError = errorCells.some(e => e.r === rowIndex && e.c === colIndex);

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onPress={onCellPress}
                isSelected={isSelected}
                isError={isError} // Hata durumunu Cell'e gönderiyoruz
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
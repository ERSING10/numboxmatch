import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../app/styles';

type Block = { value: number; color: string; };
type Cell = Block | null;

type BoardProps = {
  board: Cell[][];
};

export default function Board({ board }: BoardProps) {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                { backgroundColor: cell ? cell.color : '#F5F5F5' }
              ]}
            >
              {cell && <Text style={styles.cellText}>{cell.value}</Text>}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
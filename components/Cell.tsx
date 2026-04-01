import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../app/styles';

type Block = { value: number; color: string; };
type CellData = Block | null;

type CellProps = {
  cell: CellData;
  rowIndex: number;
  colIndex: number;
  onPress: (r: number, c: number) => void;
  isSelected: boolean;
  isError: boolean; 
};

export default function Cell({ cell, rowIndex, colIndex, onPress, isSelected, isError }: CellProps) {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { backgroundColor: isError ? 'rgba(255, 68, 68, 0.6)' : (cell ? cell.color : '#F5F5F5') },
        isSelected ? { borderWidth: 3, borderColor: '#333' } : { borderWidth: 1, borderColor: '#ddd' }
      ]}
      onPress={() => onPress(rowIndex, colIndex)}
      activeOpacity={0.7}
      disabled={!cell}
    >
      {cell && <Text style={styles.cellText}>{cell.value}</Text>}
    </TouchableOpacity>
  );
}
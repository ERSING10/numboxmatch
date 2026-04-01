import React from 'react';
import { Text, View } from 'react-native';
import Board from '../components/Board';
import { useGameLogic } from '../hooks/useGameLogic';
import { styles } from './styles';

export default function HomeScreen() {
  const { board, targetNumber, handleCellPress, selectedCells, errorCells } = useGameLogic();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
        Hedef Sayı: {targetNumber}
      </Text>
      <Board 
        board={board} 
        onCellPress={handleCellPress} 
        selectedCells={selectedCells}
        errorCells={errorCells} 
      />
    </View>
  );
}
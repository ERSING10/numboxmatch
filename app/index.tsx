import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Board from '../components/Board';
import { useGameLogic } from '../hooks/useGameLogic';
import { styles } from './styles';

export default function HomeScreen() {
  const { 
    board, targetNumber, handleCellPress, selectedCells, 
    errorCells, isGameOver, restartGame 
  } = useGameLogic();

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

      {/* YENİ EKLENEN: GAME OVER EKRANI */}
      {isGameOver && (
        <View style={styles.overlay}>
          <Text style={styles.gameOverText}>OYUN BİTTİ!</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}
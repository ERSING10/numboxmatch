import React from 'react';
import { Text, View } from 'react-native';
import Board from '../components/Board';
import { useGameLogic } from '../hooks/useGameLogic';
import { styles } from './styles';

export default function HomeScreen() {
  const { board } = useGameLogic();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
        Hedef Sayı: ?
      </Text>
      <Board board={board} />
    </View>
  );
}
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Board from '../components/Board';
import LeaderboardScreen from '../components/LeaderboardScreen';
import NameInputScreen from '../components/NameInputScreen';
import ScorePanel from '../components/ScorePanel';
import StartScreen from '../components/StartScreen';
import { useGameLogic } from '../hooks/useGameLogic';
import { LeaderboardEntry, getLeaderboard, saveScore } from '../utils/leaderboard';
import { styles } from './styles';

type GamePhase = 'start' | 'playing' | 'name_input' | 'leaderboard';

export default function HomeScreen() {
  const {
    board, targetNumber, handleCellPress, selectedCells,
    errorCells, isGameOver, restartGame,
    totalScore, speedLevel, scoreToNext, wrongCount,
  } = useGameLogic();

  const [gamePhase, setGamePhase] = useState<GamePhase>('start');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Oyun bitince isim ekranına geç
  useEffect(() => {
    if (isGameOver && gamePhase === 'playing') {
      setGamePhase('name_input');
    }
  }, [isGameOver]);

  const handlePlay = () => {
    restartGame();
    setGamePhase('playing');
  };

  const handleNameSubmit = async (name: string) => {
    const updated = await saveScore(name, totalScore);
    setLeaderboard(updated);
    setGamePhase('leaderboard');
  };

  const handlePlayAgain = async () => {
    const current = await getLeaderboard();
    setLeaderboard(current);
    setGamePhase('playing');
    restartGame();
  };

  // Giriş ekranı
  if (gamePhase === 'start') {
    return <StartScreen onPlay={handlePlay} />;
  }

  return (
    <View style={styles.container}>

      {/* Oyun alanı: board solda, panel sağda */}
      <View style={styles.gameRow}>
        <View style={styles.boardColumn}>
          <Text style={styles.targetText}>Hedef: {targetNumber}</Text>
          <Board
            board={board}
            onCellPress={handleCellPress}
            selectedCells={selectedCells}
            errorCells={errorCells}
          />
        </View>

        <ScorePanel
          totalScore={totalScore}
          speedLevel={speedLevel}
          scoreToNext={scoreToNext}
          wrongCount={wrongCount}
        />
      </View>

      {/* İsim giriş ekranı */}
      {gamePhase === 'name_input' && (
        <NameInputScreen
          finalScore={totalScore}
          onSubmit={handleNameSubmit}
        />
      )}

      {/* Sıralama ekranı */}
      {gamePhase === 'leaderboard' && (
        <LeaderboardScreen
          entries={leaderboard}
          currentScore={totalScore}
          onPlayAgain={handlePlayAgain}
        />
      )}

    </View>
  );
}

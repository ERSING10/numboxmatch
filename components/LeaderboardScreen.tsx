import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LeaderboardEntry } from '../utils/leaderboard';

type LeaderboardScreenProps = {
  entries: LeaderboardEntry[];
  currentScore: number;
  onPlayAgain: () => void;
};

const MEDALS = ['🥇', '🥈', '🥉', '4.', '5.'];
const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32', '#aaa', '#aaa'];

export default function LeaderboardScreen({
  entries,
  currentScore,
  onPlayAgain,
}: LeaderboardScreenProps) {
  return (
    <View style={overlayStyle}>
      <View style={cardStyle}>
        <Text style={titleStyle}>EN İYİ 5</Text>

        {entries.length === 0 ? (
          <Text style={emptyStyle}>Henüz kayıt yok</Text>
        ) : (
          entries.map((entry, index) => {
            const isCurrentGame =
              index === entries.findIndex(
                (e) => e.score === currentScore && e.name === entry.name
              );
            return (
              <View
                key={index}
                style={[
                  rowStyle,
                  isCurrentGame && { backgroundColor: 'rgba(74,144,226,0.15)', borderRadius: 8 },
                ]}
              >
                <Text style={[rankStyle, { color: MEDAL_COLORS[index] }]}>
                  {MEDALS[index]}
                </Text>
                <Text style={nameStyle} numberOfLines={1}>{entry.name}</Text>
                <Text style={dateStyle}>{entry.date}</Text>
                <Text style={[scoreStyle, { color: MEDAL_COLORS[index] }]}>
                  {entry.score}
                </Text>
              </View>
            );
          })
        )}

        <TouchableOpacity style={buttonStyle} onPress={onPlayAgain}>
          <Text style={buttonTextStyle}>Tekrar Oyna</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const overlayStyle = {
  position: 'absolute' as const,
  top: 0, bottom: 0, left: 0, right: 0,
  backgroundColor: 'rgba(0,0,0,0.88)',
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  zIndex: 20,
};

const cardStyle = {
  backgroundColor: '#1e1e2e',
  borderRadius: 16,
  padding: 24,
  width: 300,
  borderWidth: 1,
  borderColor: '#333',
};

const titleStyle = {
  fontSize: 22,
  fontWeight: 'bold' as const,
  color: '#FFD700',
  textAlign: 'center' as const,
  letterSpacing: 3,
  marginBottom: 20,
};

const rowStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  paddingVertical: 8,
  paddingHorizontal: 6,
  marginBottom: 4,
};

const rankStyle = {
  fontSize: 18,
  width: 30,
  textAlign: 'center' as const,
};

const nameStyle = {
  flex: 1,
  fontSize: 14,
  fontWeight: '600' as const,
  color: '#eee',
  marginLeft: 6,
};

const dateStyle = {
  fontSize: 10,
  color: '#666',
  marginRight: 8,
};

const scoreStyle = {
  fontSize: 16,
  fontWeight: 'bold' as const,
  minWidth: 40,
  textAlign: 'right' as const,
};

const emptyStyle = {
  color: '#666',
  textAlign: 'center' as const,
  marginVertical: 20,
  fontSize: 14,
};

const buttonStyle = {
  backgroundColor: '#4a90e2',
  borderRadius: 8,
  paddingVertical: 13,
  alignItems: 'center' as const,
  marginTop: 20,
};

const buttonTextStyle = {
  color: '#fff',
  fontSize: 15,
  fontWeight: 'bold' as const,
};

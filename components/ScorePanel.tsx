import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { POINT_VALUES } from '../utils/scoring';

type ScorePanelProps = {
  totalScore: number;
  speedLevel: number;
  scoreToNext: number | null;
  wrongCount: number;
};

const SPEED_COLORS = ['#43a047', '#7cb342', '#fb8c00', '#f4511e', '#e53935'];

export default function ScorePanel({ totalScore, speedLevel, scoreToNext, wrongCount }: ScorePanelProps) {
  const levelColor = SPEED_COLORS[speedLevel - 1] ?? '#43a047';

  return (
    <ScrollView
      style={{ marginLeft: 8, width: 76 }}
      contentContainerStyle={{ alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      {/* PUAN */}
      <View style={cardStyle}>
        <Text style={labelStyle}>PUAN</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>{totalScore}</Text>
      </View>

      {/* CEZA */}
      <View style={cardStyle}>
        <Text style={labelStyle}>CEZA</Text>
        <View style={{ flexDirection: 'row', gap: 4, marginTop: 3 }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: i < wrongCount ? '#e53935' : '#eee',
                borderWidth: 1.5,
                borderColor: i < wrongCount ? '#b71c1c' : '#ccc',
              }}
            />
          ))}
        </View>
        <Text style={{ fontSize: 7, color: '#bbb', marginTop: 3, textAlign: 'center' }}>
          3'te ceza!
        </Text>
      </View>

      {/* HIZ */}
      <View style={[cardStyle, { borderColor: levelColor, borderWidth: 2 }]}>
        <Text style={labelStyle}>HIZ</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: levelColor }}>
          Lv.{speedLevel}
        </Text>
        {scoreToNext !== null ? (
          <Text style={{ fontSize: 8, color: '#aaa', marginTop: 2, textAlign: 'center' }}>
            +{scoreToNext}{'\n'}sonraki
          </Text>
        ) : (
          <Text style={{ fontSize: 8, color: levelColor, marginTop: 2, fontWeight: '600' }}>MAX</Text>
        )}
      </View>

      {/* DEĞERLER tablosu */}
      <View style={[cardStyle, { paddingHorizontal: 8 }]}>
        <Text style={[labelStyle, { marginBottom: 4 }]}>DEĞERLER</Text>
        {Object.entries(POINT_VALUES).map(([num, pts]) => (
          <View
            key={num}
            style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 1 }}
          >
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#444' }}>{num}</Text>
            <Text style={{ fontSize: 10, color: '#888' }}>{pts}p</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 7,
  paddingHorizontal: 6,
  marginBottom: 7,
  borderWidth: 1,
  borderColor: '#ddd',
  width: '100%' as const,
  alignItems: 'center' as const,
};

const labelStyle = {
  fontSize: 8,
  color: '#aaa',
  fontWeight: '700' as const,
  letterSpacing: 1,
  marginBottom: 1,
};

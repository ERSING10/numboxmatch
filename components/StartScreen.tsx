import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

type StartScreenProps = {
  onPlay: () => void;
};

export default function StartScreen({ onPlay }: StartScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Giriş animasyonu
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    // Buton nefes alma animasyonu
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={containerStyle}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>

        {/* Renk blok dekorasyonu */}
        <View style={blocksRowStyle}>
          {DEMO_BLOCKS.map((b, i) => (
            <View key={i} style={[blockStyle, { backgroundColor: b.color }]}>
              <Text style={blockTextStyle}>{b.num}</Text>
            </View>
          ))}
        </View>

        {/* Logo / Başlık */}
        <Text style={titleTopStyle}>NUM</Text>
        <Text style={titleBottomStyle}>BOX<Text style={titleAccentStyle}>MATCH</Text></Text>
        <Text style={subtitleStyle}>Sayıları birleştir, skoru yakala!</Text>

        {/* Oyna Butonu */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }], marginTop: 40 }}>
          <TouchableOpacity style={playButtonStyle} onPress={onPlay} activeOpacity={0.85}>
            <Text style={playButtonTextStyle}>OYNA</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Alt bilgi */}
        <Text style={hintStyle}>3–4 komşu bloğu seç • Hedefi tut</Text>

      </Animated.View>
    </View>
  );
}

const DEMO_BLOCKS = [
  { num: 3, color: '#FFFFBA' },
  { num: 7, color: '#BAE1FF' },
  { num: 5, color: '#BAFFC9' },
  { num: 9, color: '#E8BAFF' },
  { num: 2, color: '#FFB3BA' },
];

const containerStyle = {
  flex: 1,
  backgroundColor: '#12121f',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const blocksRowStyle = {
  flexDirection: 'row' as const,
  marginBottom: 24,
  gap: 8,
};

const blockStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
};

const blockTextStyle = {
  fontSize: 20,
  fontWeight: 'bold' as const,
  color: '#333',
};

const titleTopStyle = {
  fontSize: 52,
  fontWeight: '900' as const,
  color: '#ffffff',
  letterSpacing: 8,
  lineHeight: 56,
};

const titleBottomStyle = {
  fontSize: 52,
  fontWeight: '900' as const,
  color: '#ffffff',
  letterSpacing: 6,
  lineHeight: 56,
};

const titleAccentStyle = {
  color: '#4a90e2',
};

const subtitleStyle = {
  fontSize: 13,
  color: '#666',
  marginTop: 10,
  letterSpacing: 0.5,
};

const playButtonStyle = {
  backgroundColor: '#4a90e2',
  paddingHorizontal: 64,
  paddingVertical: 18,
  borderRadius: 14,
  shadowColor: '#4a90e2',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  elevation: 8,
};

const playButtonTextStyle = {
  color: '#fff',
  fontSize: 22,
  fontWeight: 'bold' as const,
  letterSpacing: 4,
};

const hintStyle = {
  fontSize: 11,
  color: '#444',
  marginTop: 28,
  letterSpacing: 0.3,
};

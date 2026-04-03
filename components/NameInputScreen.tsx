import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type NameInputScreenProps = {
  finalScore: number;
  onSubmit: (name: string) => void;
};

export default function NameInputScreen({ finalScore, onSubmit }: NameInputScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name.trim() || 'İsimsiz');
  };

  return (
    <View style={overlayStyle}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={cardStyle}>
          <Text style={titleStyle}>OYUN BİTTİ</Text>

          <Text style={scoreStyle}>{finalScore}</Text>
          <Text style={scoreLabelStyle}>PUAN</Text>

          <Text style={labelStyle}>İsminizi girin</Text>
          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="İsim..."
            placeholderTextColor="#bbb"
            maxLength={16}
            autoFocus
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />

          <TouchableOpacity style={buttonStyle} onPress={handleSubmit}>
            <Text style={buttonTextStyle}>Skoru Kaydet</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const overlayStyle = {
  position: 'absolute' as const,
  top: 0, bottom: 0, left: 0, right: 0,
  backgroundColor: 'rgba(0,0,0,0.85)',
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  zIndex: 20,
};

const cardStyle = {
  backgroundColor: '#1e1e2e',
  borderRadius: 16,
  padding: 28,
  width: 280,
  alignItems: 'center' as const,
  borderWidth: 1,
  borderColor: '#333',
};

const titleStyle = {
  fontSize: 26,
  fontWeight: 'bold' as const,
  color: '#ff4444',
  marginBottom: 16,
  letterSpacing: 2,
};

const scoreStyle = {
  fontSize: 52,
  fontWeight: 'bold' as const,
  color: '#fff',
  lineHeight: 60,
};

const scoreLabelStyle = {
  fontSize: 12,
  color: '#888',
  letterSpacing: 2,
  marginBottom: 24,
};

const labelStyle = {
  fontSize: 13,
  color: '#aaa',
  marginBottom: 8,
  alignSelf: 'flex-start' as const,
};

const inputStyle = {
  backgroundColor: '#2a2a3e',
  color: '#fff',
  fontSize: 16,
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 10,
  width: '100%' as const,
  borderWidth: 1,
  borderColor: '#444',
  marginBottom: 16,
};

const buttonStyle = {
  backgroundColor: '#4a90e2',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 32,
  width: '100%' as const,
  alignItems: 'center' as const,
};

const buttonTextStyle = {
  color: '#fff',
  fontSize: 15,
  fontWeight: 'bold' as const,
};

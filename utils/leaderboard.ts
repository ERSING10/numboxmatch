import AsyncStorage from '@react-native-async-storage/async-storage';

export type LeaderboardEntry = {
  name: string;
  score: number;
  date: string;
};

const STORAGE_KEY = 'leaderboard';
const MAX_ENTRIES = 5;

const readEntries = async (): Promise<LeaderboardEntry[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json) as LeaderboardEntry[];
  } catch {
    return [];
  }
};

const writeEntries = async (entries: LeaderboardEntry[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Mevcut sıralamayı getirir
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  return readEntries();
};

// Yeni skoru kaydeder, sıralayıp ilk 5'i saklar; güncel listeyi döndürür
export const saveScore = async (
  name: string,
  score: number
): Promise<LeaderboardEntry[]> => {
  const existing = await readEntries();
  const newEntry: LeaderboardEntry = {
    name: name.trim() || 'İsimsiz',
    score,
    date: new Date().toLocaleDateString('tr-TR'),
  };
  const updated = [...existing, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES);
  await writeEntries(updated);
  return updated;
};

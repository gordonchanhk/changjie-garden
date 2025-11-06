interface ScoreEntry {
  score: number;
  mode: string;
  date: string;
  speed: string;
}

const STORAGE_KEY = 'changjie_garden_scores';
const MAX_SCORES = 10;

export function saveScore(score: number, mode: string, speed: string): void {
  const scores = getScores();
  const newScore: ScoreEntry = {
    score,
    mode,
    speed,
    date: new Date().toISOString(),
  };
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  
  const limitedScores = scores.slice(0, MAX_SCORES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedScores));
}

export function getScores(): ScoreEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading scores:', error);
    return [];
  }
}

export function getBestScore(): number {
  const scores = getScores();
  return scores.length > 0 ? scores[0].score : 0;
}

export function clearScores(): void {
  localStorage.removeItem(STORAGE_KEY);
}

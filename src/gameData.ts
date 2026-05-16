export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface GameIdea {
  genre: string;
  theme: string;
  gimmick: string;
  difficulty: Difficulty;
  hints: string[];
}

export const genres = [
  "2Dアクション",
  "パズル",
  "ランゲーム",
  "シューティング",
  "タワーディフェンス",
  "プラットフォーマー",
  "クリッカーゲーム",
  "脱出ゲーム",
  "リズムゲーム",
  "ローグライク",
  "経営シミュレーション",
  "カードゲーム",
  "ピンボール",
  "釣りゲーム",
  "育成ゲーム",
];

export const themes = [
  "お寿司",
  "宇宙",
  "深海",
  "江戸時代",
  "お菓子の国",
  "廃墟",
  "水族館",
  "忍者",
  "ラーメン屋",
  "雨の日",
  "図書館",
  "動物園",
  "砂漠",
  "夢の世界",
  "冬の雪山",
  "お花畑",
  "地下鉄",
  "屋台",
  "海賊",
  "サイバーシティ",
];

export const gimmicks = [
  "3回しかジャンプできない",
  "画面が少しずつ縮まっていく",
  "重力が逆転する",
  "触れると色が変わる",
  "時間が逆再生できる",
  "敵を踏むと巨大化する",
  "コインを集めると世界がスローモーションになる",
  "プレイヤーが影を残す",
  "壁を走れる",
  "体力が減るほど速くなる",
  "画面外に出ると反対側に出てくる",
  "同じアクションを連続で使えない",
  "スコアが増えると敵も強くなる",
  "音楽のリズムで攻撃が強くなる",
  "オブジェクトを磁石のように引き寄せられる",
  "プレイヤーが分身する",
  "ジャンプするたびにランダムな効果が発動",
  "死ぬと幽霊になって壁をすり抜けられる",
  "光の当たる場所でしか見えない敵がいる",
  "アイテムを消費して地形を作れる",
];

const difficultyHints: Record<Difficulty, { label: string; hints: string[] }> = {
  1: {
    label: "超かんたん",
    hints: [
      "GDotやUnity の公式チュートリアルが使えます",
      "まずは1画面で完結するシンプルな作りにしましょう",
      "ゲームオーバー条件は1つだけに絞るのがコツです",
    ],
  },
  2: {
    label: "かんたん",
    hints: [
      "スプライトは無料素材サイト（itch.io など）を活用しましょう",
      "当たり判定はシンプルな四角形で始めるのがオススメ",
      "スコアと最高記録を保存するとグッと完成度が上がります",
    ],
  },
  3: {
    label: "ふつう",
    hints: [
      "ステートマシンでキャラクターの状態管理をしましょう",
      "SEやBGMを入れると一気にゲームらしくなります",
      "プレイテストを繰り返して難易度調整に時間をかけましょう",
    ],
  },
  4: {
    label: "むずかしい",
    hints: [
      "プロシージャル生成でステージを自動生成すると面白くなります",
      "セーブ・ロード機能の実装を検討しましょう",
      "UIとゲームロジックをしっかり分離して設計しましょう",
    ],
  },
  5: {
    label: "かなりむずかしい",
    hints: [
      "スコープを絞ってまずプロトタイプを動かすことを優先しましょう",
      "他の開発者にアルファ版を試してもらいフィードバックを得ましょう",
      "パフォーマンス最適化を意識した設計が必要です",
    ],
  },
};

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function calcDifficulty(genre: string, gimmick: string): Difficulty {
  const hardGenres = ["ローグライク", "経営シミュレーション", "リズムゲーム"];
  const easyGenres = ["クリッカーゲーム", "脱出ゲーム", "釣りゲーム"];
  const complexGimmicks = [
    "時間が逆再生できる",
    "プロシージャル生成",
    "プレイヤーが分身する",
    "死ぬと幽霊になって壁をすり抜けられる",
  ];

  let score = 3;
  if (hardGenres.includes(genre)) score += 1;
  if (easyGenres.includes(genre)) score -= 1;
  if (complexGimmicks.some((g) => gimmick.includes(g))) score += 1;

  return (Math.max(1, Math.min(5, score)) as Difficulty);
}

export function generateIdea(): GameIdea {
  const genre = randomItem(genres);
  const theme = randomItem(themes);
  const gimmick = randomItem(gimmicks);
  const difficulty = calcDifficulty(genre, gimmick);
  const { hints } = difficultyHints[difficulty];

  return { genre, theme, gimmick, difficulty, hints };
}

export function getDifficultyLabel(d: Difficulty): string {
  return difficultyHints[d].label;
}

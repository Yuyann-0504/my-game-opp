export interface BookRecommendation {
  title: string;
  description: string;
  affiliateUrl: string;
  icon: string;
}

const genreRecommendations: Record<string, BookRecommendation[]> = {
  "2Dアクション": [
    {
      title: "入門 Python 3",
      description: "Pythonの基礎からゲーム開発まで。初心者向けの最適な教科書",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "📚",
    },
    {
      title: "Unity ゲーム開発マスターガイド",
      description: "Unity での 2D アクションゲーム開発について詳しく学べます",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎮",
    },
    {
      title: "ゲーム開発者のための物理演算入門",
      description: "アクションゲームに必須の物理演算の基礎をマスター",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "⚙️",
    },
  ],
  パズル: [
    {
      title: "アルゴリズム図鑑",
      description: "パズル/脳トレゲームの裏側にあるアルゴリズムを学ぶ",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🧩",
    },
    {
      title: "Godot Engine 完全ガイド",
      description: "オープンソースエンジンでパズルゲームを作る",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🔧",
    },
  ],
  ランゲーム: [
    {
      title: "ゲームシステム設計論",
      description: "ランゲームのスコア・ステージシステム設計の秘訣",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🏃",
    },
    {
      title: "Unreal Engine 入門ガイド",
      description: "高速ゲーム開発に最適なエンジンの使い方",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🚀",
    },
  ],
  シューティング: [
    {
      title: "ゲーム開発技術の解剖図鑑",
      description: "シューティングゲームの弾幕システムなど実装テクニック",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "💥",
    },
    {
      title: "C# 完全解説 ゲーム開発編",
      description: "Unity で使用される C# の完全な理解",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "⚡",
    },
  ],
  タワーディフェンス: [
    {
      title: "ゲーム AIの基礎と応用",
      description: "敵 AI とバランス調整の実装テクニック",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🤖",
    },
    {
      title: "ゲーム経済学 徹底講座",
      description: "ゲーム内経済の設計で面白さを最大化",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "💰",
    },
  ],
  プラットフォーマー: [
    {
      title: "グラフィックス基礎講座",
      description: "美しいステージデザインとカメラワーク",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎨",
    },
    {
      title: "Phaser フレームワーク完全ガイド",
      description: "Web 向けプラットフォーマー開発の最速ルート",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🌐",
    },
  ],
  クリッカーゲーム: [
    {
      title: "インディーゲーム大ヒットの法則",
      description: "シンプルながら中毒性のあるゲーム設計",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎯",
    },
    {
      title: "JavaScript ゲーム開発スタートガイド",
      description: "ブラウザでクリッカーゲームを高速開発",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "📱",
    },
  ],
  脱出ゲーム: [
    {
      title: "ゲームシナリオ制作ガイド",
      description: "ストーリー性のある脱出ゲームの組み立て方",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🔐",
    },
    {
      title: "UI/UX デザインの鉄則",
      description: "脱出ゲームのインターフェース設計の極意",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎮",
    },
  ],
  リズムゲーム: [
    {
      title: "オーディオプログラミング入門",
      description: "音楽同期とサウンドエフェクト実装",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎵",
    },
    {
      title: "Wwise マスターガイド",
      description: "プロ級の音声システム実装",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎧",
    },
  ],
  ローグライク: [
    {
      title: "プロシージャル生成の宝典",
      description: "無限に遊べるステージを自動生成する方法",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🌑",
    },
    {
      title: "難易度調整とゲームバランス論",
      description: "中毒性のあるゲームループの作り方",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "⚔️",
    },
  ],
  経営シミュレーション: [
    {
      title: "ゲーム経済システム設計図",
      description: "複雑な経済シミュレーションの基礎",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "📊",
    },
    {
      title: "データベース設計とゲーム",
      description: "セーブデータとプレイヤー情報の管理",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "💾",
    },
  ],
  カードゲーム: [
    {
      title: "カードゲーム設計論",
      description: "バランスの取れたカード対戦ゲームの作り方",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🃏",
    },
    {
      title: "ネットワークプログラミング入門",
      description: "オンライン対戦機能の実装",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🌍",
    },
  ],
  ピンボール: [
    {
      title: "物理エンジン Chipmunk 解説書",
      description: "精密な物理演算でリアルなピンボール実装",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎪",
    },
  ],
  釣りゲーム: [
    {
      title: "ゲーム効果音デザイン",
      description: "釣りゲームのリラックス感を演出するサウンド",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "🎣",
    },
  ],
  育成ゲーム: [
    {
      title: "キャラクター育成システム設計",
      description: "長期プレイを促すやり込み要素の設計",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "👶",
    },
    {
      title: "ゲーム上のグラフィック表現",
      description: "キャラクターの魅力をアップするグラフィックス",
      affiliateUrl: "https://amzn.to/4udTrM1",
      icon: "✨",
    },
  ],
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRecommendationsForGenre(genre: string): BookRecommendation[] {
  const recommendations = genreRecommendations[genre];
  if (!recommendations || recommendations.length === 0) {
    return getRecommendationsForGenre("2Dアクション");
  }
  return recommendations.slice(0, 2);
}

export function getRandomRecommendation(): BookRecommendation {
  const allBooks = Object.values(genreRecommendations).flat();
  return getRandomItem(allBooks);
}

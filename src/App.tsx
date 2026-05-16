import { useState, useCallback, useEffect } from "react";
import { Lightbulb, Gamepad2, Sparkles, Zap, ChevronRight, Share2, BookOpen, Twitter, Github, MessageCircle, X } from "lucide-react";
import { generateIdea, getDifficultyLabel, type GameIdea, type Difficulty } from "./gameData";
import { getRecommendationsForGenre } from "./recommendations";
import { trackAffiliateClick, trackShareClick } from "./analytics";

function StarRating({ value }: { value: Difficulty }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg transition-colors duration-300 ${
            i <= value ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" : "text-gray-700"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function difficultyBadge(d: Difficulty): string {
  const map: Record<Difficulty, string> = {
    1: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    2: "text-green-400 border-green-500/40 bg-green-500/10",
    3: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
    4: "text-orange-400 border-orange-500/40 bg-orange-500/10",
    5: "text-red-400 border-red-500/40 bg-red-500/10",
  };
  return map[d];
}

function IdeaRow({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: "cyan" | "sky" | "blue"; }) {
  const borderColor = { cyan: "border-cyan-500/40", sky: "border-sky-500/40", blue: "border-blue-500/40" }[color];
  const bgColor = { cyan: "bg-cyan-500/5", sky: "bg-sky-500/5", blue: "bg-blue-500/5" }[color];
  const textColor = { cyan: "text-cyan-300", sky: "text-sky-300", blue: "text-blue-300" }[color];

  return (
    <div className={`flex items-center gap-4 rounded-xl border ${borderColor} ${bgColor} px-5 py-4`}>
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
        <p className={`text-base font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
}

function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/50 bg-gray-900 p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400 flex items-center justify-center gap-2">
          <Sparkles size={20} /> ナビゲーター紹介
        </h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 items-start bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl font-bold shrink-0 text-white shadow-lg">ド</div>
            <div>
              <p className="text-xs text-orange-400 font-bold mb-1 tracking-wider">ドラ</p>
              <p className="text-sm text-gray-200 leading-relaxed">「よう！俺はドラ！ゲーム開発のアイデア出しを手伝うぜ！」</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl font-bold shrink-0 text-white shadow-lg">ユ</div>
            <div>
              <p className="text-xs text-purple-400 font-bold mb-1 tracking-wider">ユイ</p>
              <p className="text-sm text-gray-200 leading-relaxed">「初めまして、ユイです！私たちがこのアプリのナビゲーターを務めます！」</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <a href="https://store.line.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold transition-all hover:scale-[1.02] shadow-lg shadow-[#06C755]/20">
            <MessageCircle size={20} />
            ドラとユイの公式LINEスタンプ発売中！
          </a>
          <button onClick={onClose} className="w-full py-3.5 rounded-xl border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold transition-colors">
            さっそくアイデアを生成する
          </button>
        </div>
      </div>
    </div>
  );
}

function AmazonRecommendations({ genre }: { genre: string }) {
  const recommendations = getRecommendationsForGenre(genre);
  const handleClick = (title: string) => trackAffiliateClick(genre, title);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-orange-950/30 backdrop-blur-sm overflow-hidden shadow-[0_0_30px_rgba(217,119,6,0.1)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-amber-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              このジャンルの開発に役立つ書籍
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((book, i) => (
              <a
                key={i}
                href={book.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(book.title)}
                className="group flex items-start gap-3 p-3 rounded-lg border border-amber-600/40 bg-amber-900/20 hover:bg-amber-900/40 hover:border-amber-500/60 transition-all duration-200"
              >
                <span className="text-xl shrink-0 mt-0.5">{book.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-amber-200 group-hover:text-amber-100 transition-colors truncate">
                    {book.title}
                  </p>
                  <p className="text-xs text-amber-300/70 leading-snug line-clamp-2">
                    {book.description}
                  </p>
                </div>
                <span className="shrink-0 text-amber-500 group-hover:translate-x-1 transition-transform text-lg">→</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-amber-300/60 pt-2 border-t border-amber-700/30">
            Amazon アフィリエイトリンク
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>
    </div>
  );
}

function ShareSection({ idea }: { idea: GameIdea }) {
  const handleShare = (platform: string) => {
    trackShareClick(platform, idea.genre, idea.theme, idea.gimmick);
    const text = `ドラとユイが新しいゲームのアイデアをくれたよ！\n\n【ゲームアイデア】\nジャンル: ${idea.genre}\nテーマ: ${idea.theme}\nギミック: ${idea.gimmick}\n\n#ゲーム開発 #ドラユイアプリ #indie`;
    const url = "https://beginner-game-idea-g-a8xf.bolt.host";

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      note: `https://note.com?text=${encodeURIComponent(text)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Share2 size={16} className="text-purple-400" />
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-300">
            このアイデアをシェアする
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-purple-600/60 bg-purple-900/30 hover:bg-purple-900/60 hover:border-purple-500 text-purple-200 hover:text-purple-100 font-semibold text-sm transition-all duration-200 group"
          >
            <Twitter size={16} className="group-hover:scale-110 transition-transform" />
            X に投稿
          </button>
          <button
            onClick={() => handleShare("note")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-600/60 bg-cyan-900/30 hover:bg-cyan-900/60 hover:border-cyan-500 text-cyan-200 hover:text-cyan-100 font-semibold text-sm transition-all duration-200 group"
          >
            <Github size={16} className="group-hover:scale-110 transition-transform" />
            Note に投稿
          </button>
        </div>
      </div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: GameIdea }) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn space-y-5">
      
      <div className="rounded-2xl border border-pink-500/30 bg-gray-900/80 backdrop-blur-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-[0_0_20px_rgba(236,72,153,0.1)]">
        <div className="flex-1 space-y-2 w-full">
          <p className="text-sm text-gray-300 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <span className="text-orange-400 font-bold mr-1">ドラ：</span>
            「おっ！『{idea.genre}』か！腕が鳴るぜ！」
          </p>
          <p className="text-sm text-gray-300 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <span className="text-purple-400 font-bold mr-1">ユイ：</span>
            「『{idea.theme}』のテーマと上手く合わせるのがコツですね！」
          </p>
        </div>
        <a href="https://store.line.me/" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 bg-[#06C755]/20 hover:bg-[#06C755]/30 border border-[#06C755]/50 text-[#06C755] rounded-xl text-sm font-bold transition-all hover:scale-105">
          <MessageCircle size={18} />
          LINEスタンプ
        </a>
      </div>

      <div className="relative rounded-2xl border border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <IdeaRow icon={<Gamepad2 size={18} className="text-cyan-400" />} label="ジャンル" value={idea.genre} color="cyan" />
            <IdeaRow icon={<Sparkles size={18} className="text-sky-400" />} label="テーマ" value={idea.theme} color="sky" />
            <IdeaRow icon={<Zap size={18} className="text-blue-400" />} label="ギミック" value={idea.gimmick} color="blue" />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">制作難易度</p>
              <StarRating value={idea.difficulty} />
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${difficultyBadge(idea.difficulty)}`}>
              {getDifficultyLabel(idea.difficulty)}
            </span>
          </div>

          <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-cyan-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">開発のヒント</p>
            </div>
            <ul className="space-y-2">
              {idea.hints.map((hint, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
                  <ChevronRight size={14} className="mt-0.5 shrink-0 text-cyan-500" />
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>

      <AmazonRecommendations genre={idea.genre} />
      <ShareSection idea={idea} />
    </div>
  );
}

export default function App() {
  const [idea, setIdea] = useState<GameIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowModal(false);
  };

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setIdea(null);
    setTimeout(() => {
      setIdea(generateIdea());
      setIsGenerating(false);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {showModal && <WelcomeModal onClose={handleCloseModal} />}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="w-full px-4 pt-4">
          <div className="max-w-2xl mx-auto rounded-xl border border-dashed border-gray-700 bg-gray-900/40 h-16 flex items-center justify-center">
            <span className="text-xs font-mono tracking-widest text-gray-600 uppercase">広告スペース（728 × 90）</span>
          </div>
        </div>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles size={12} />
              Game Idea Generator
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                ゲームアイデア
              </span>
              <br />
              <span className="text-white">ジェネレーター</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              ゲーム開発初心者向け。ランダムなアイデアで、あなたの次の傑作をひらめかせよう。
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-gray-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <span className="absolute inset-0 rounded-2xl ring-1 ring-cyan-300/50" />
            {isGenerating ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-gray-950/40 border-t-gray-950 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Zap size={22} className="transition-transform group-hover:scale-110" />
                アイデアを生成する
              </>
            )}
          </button>

          {idea && <IdeaCard idea={idea} />}

          {!idea && !isGenerating && (
            <div className="text-center space-y-2 opacity-40 select-none">
              <Gamepad2 size={40} className="mx-auto text-gray-600" />
              <p className="text-gray-600 text-sm">ボタンを押してアイデアを生成しよう</p>
            </div>
          )}
        </main>

        <footer className="text-center py-6 px-4 text-gray-700 text-xs tracking-wide space-y-4">
          <div>© 2026 Game Idea Generator — for indie developers</div>
          
          <div className="flex justify-center gap-6 items-center">
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-400 transition-colors">
              <Twitter size={14} /> ドラ: @yuyann_ne.kingnights
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-cyan-400 transition-colors">
              <Twitter size={14} /> ユイ: @yuyann_ne.dreamydoo
            </a>
          </div>

          <div className="pt-2">
            <a
              href="https://amzn.to/4udTrM1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-2 rounded-lg border border-gray-600 hover:border-cyan-500/50 bg-gray-900/40 hover:bg-gray-800/60 text-cyan-400 hover:text-cyan-300 transition-all duration-200 font-semibold text-xs"
            >
              ゲーム開発に役立つ本・グッズ →
            </a>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

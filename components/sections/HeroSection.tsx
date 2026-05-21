// HeroSection - キャッチコピー・メインCTA・フローティングアニメーション・ネオングロウ
"use client";

import { motion } from "framer-motion";
import { IMAGE_PATHS } from "@/constants/shopInfo";
import {
  HERO_FLOAT_ANIMATE,
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
} from "@/constants/animations";

// フォームセクションへのアンカーID
const APPLICATION_FORM_ANCHOR = "entry-form";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-darkBase"
      aria-label="メインビジュアル"
    >
      {/* 背景グラデーション + グリッドパターン */}
      <div
        className="absolute inset-0 bg-grid-pattern"
        role="img"
        aria-label="背景装飾グリッドパターン"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-darkBase via-darkCard/50 to-darkBase" />

      {/* ネオンカラーの装飾的な光球 */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #ff2d78, transparent)" }}
        role="img"
        aria-label="ネオンピンク装飾光"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
        role="img"
        aria-label="ネオンシアン装飾光"
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #9b5de5, transparent)" }}
        role="img"
        aria-label="ネオンパープル装飾光"
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* バッジ */}
          <motion.div variants={FADE_IN_UP_VARIANTS} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-neonCyan/40 bg-neonCyan/10 text-neonCyan text-sm font-medium tracking-widest">
              🌊 STAFF WANTED 🐬
            </span>
          </motion.div>

          {/* メインキャッチコピー */}
          <motion.h1
            variants={FADE_IN_UP_VARIANTS}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="block text-glow-pink text-neonPink">
              夜を楽しんで、
            </span>
            <span className="block text-white mt-2">
              一緒に盛り上げよう。
            </span>
          </motion.h1>

          {/* サブキャッチコピー */}
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-lg md:text-xl text-textSecondary mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            ダーツ・お酒・音楽が好きなあなたへ。
            <br className="hidden md:block" />
            週1日〜、未経験OK。ナイトバースタッフ募集中。
          </motion.p>

          {/* 時給バッジ */}
          <motion.div
            variants={FADE_IN_UP_VARIANTS}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {[
              { label: "時給1,200円〜", color: "neonPink" },
              { label: "週1日〜OK", color: "neonCyan" },
              { label: "未経験歓迎", color: "neonPurple" },
              { label: "服装・髪型自由", color: "neonCyan" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  color === "neonPink"
                    ? "bg-neonPink/20 text-neonPink border border-neonPink/40"
                    : color === "neonCyan"
                    ? "bg-neonCyan/20 text-neonCyan border border-neonCyan/40"
                    : "bg-neonPurple/20 text-neonPurple border border-neonPurple/40"
                }`}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* メインCTAボタン */}
          <motion.div variants={FADE_IN_UP_VARIANTS}>
            <motion.a
              href={`#${APPLICATION_FORM_ANCHOR}`}
              className="inline-block px-10 py-5 rounded-full text-lg font-black text-white bg-gradient-neon-pink-purple relative overflow-hidden group"
              animate={HERO_FLOAT_ANIMATE}
              // パターン2: ネオンglow pulseをボタンに適用
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow:
                  "0 0 20px rgba(255, 45, 120, 0.6), 0 0 40px rgba(255, 45, 120, 0.3)",
              }}
            >
              <span className="relative z-10">今すぐ応募する 🎯</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>

          {/* フローティングイルカイラスト - パターン3適用 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 flex justify-center"
            aria-hidden="true"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* 実素材差し替え用プレースホルダー */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-8xl md:text-9xl"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(255, 45, 120, 0.3), rgba(155, 93, 229, 0.2), transparent)",
                  boxShadow:
                    "0 0 40px rgba(255, 45, 120, 0.3), 0 0 80px rgba(0, 245, 255, 0.1)",
                }}
                role="img"
                aria-label="ピンクイルカ/ロゴイラスト（差し替え用）"
              >
                🐬
              </div>
              {/* 画像素材が用意できたらimgタグに切り替え:
                  <Image src={IMAGE_PATHS.heroIllustration} alt="ショップロゴ・イルカイラスト（差し替え用）" fill /> */}
              <div className="sr-only">{IMAGE_PATHS.heroIllustration}</div>
            </div>
          </motion.div>

          {/* スクロール誘導 */}
          <motion.div
            variants={FADE_IN_UP_VARIANTS}
            className="mt-12 flex flex-col items-center gap-2 text-textSecondary text-sm"
          >
            <span>スクロールして詳細を見る</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-neonCyan"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

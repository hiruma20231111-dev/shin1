// アニメーション定数 - 要件で定義された3パターンのFramer Motion variants

import type { Variants, TargetAndTransition } from "framer-motion";

// パターン1: スクロールトリガーのフェードインアップ（y: 40→0, opacity: 0→1）
export const FADE_IN_UP_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 子要素をstaggerさせるコンテナ用variants
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// パターン2: ネオンカラーのpulseグロウ（box-shadowのopacity周期変化）
// as constではなくTargetAndTransitionで明示的に型付け（readonly配列がFramer Motion型と不整合になるため）
export const NEON_GLOW_ANIMATE: Record<"pink" | "cyan", TargetAndTransition> = {
  pink: {
    boxShadow: [
      "0 0 10px rgba(255, 45, 120, 0.4), 0 0 20px rgba(255, 45, 120, 0.2)",
      "0 0 25px rgba(255, 45, 120, 0.9), 0 0 50px rgba(255, 45, 120, 0.5), 0 0 80px rgba(255, 45, 120, 0.2)",
      "0 0 10px rgba(255, 45, 120, 0.4), 0 0 20px rgba(255, 45, 120, 0.2)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  cyan: {
    boxShadow: [
      "0 0 10px rgba(0, 245, 255, 0.4), 0 0 20px rgba(0, 245, 255, 0.2)",
      "0 0 25px rgba(0, 245, 255, 0.9), 0 0 50px rgba(0, 245, 255, 0.5), 0 0 80px rgba(0, 245, 255, 0.2)",
      "0 0 10px rgba(0, 245, 255, 0.4), 0 0 20px rgba(0, 245, 255, 0.2)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// パターン3: ヒーローセクションのフローティング（y軸±10pxの繰り返し）
export const HERO_FLOAT_ANIMATE: TargetAndTransition = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// useInViewのデフォルトオプション - 画面の20%に入ったらトリガー
export const IN_VIEW_OPTIONS = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const;

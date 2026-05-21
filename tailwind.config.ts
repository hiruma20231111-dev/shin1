// Tailwind設定 - ネオン×ブラック トロピカルナイト系カラーパレットを定義
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ライトモード切り替え禁止: darkModeはclassベースだがトグルUIは実装しない
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ブランドカラー: ネオンピンク・シアン・パープル
        neonPink: "#ff2d78",
        neonCyan: "#00f5ff",
        neonPurple: "#9b5de5",
        darkBase: "#0a0a0f",
        darkSurface: "#12121a",
        darkCard: "#1a1a2e",
        darkBorder: "#2a2a3e",
        textPrimary: "#ffffff",
        textSecondary: "#b0b0c8",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-neon-pink-purple":
          "linear-gradient(135deg, #ff2d78 0%, #9b5de5 100%)",
        "gradient-neon-cyan-purple":
          "linear-gradient(135deg, #00f5ff 0%, #9b5de5 100%)",
        "gradient-dark-radial":
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
      },
      boxShadow: {
        // ネオングロウエフェクト - pulseアニメーションと組み合わせて使用
        neonPink: "0 0 20px rgba(255, 45, 120, 0.6), 0 0 40px rgba(255, 45, 120, 0.3)",
        neonCyan: "0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(0, 245, 255, 0.3)",
        neonPurple: "0 0 20px rgba(155, 93, 229, 0.6), 0 0 40px rgba(155, 93, 229, 0.3)",
        neonPinkSm: "0 0 10px rgba(255, 45, 120, 0.5), 0 0 20px rgba(255, 45, 120, 0.2)",
        neonCyanSm: "0 0 10px rgba(0, 245, 255, 0.5), 0 0 20px rgba(0, 245, 255, 0.2)",
      },
      keyframes: {
        // ネオングロウpulse: box-shadowのopacity周期変化
        neonPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgba(255, 45, 120, 0.4), 0 0 20px rgba(255, 45, 120, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgba(255, 45, 120, 0.9), 0 0 50px rgba(255, 45, 120, 0.5), 0 0 80px rgba(255, 45, 120, 0.2)",
          },
        },
        neonCyanPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgba(0, 245, 255, 0.4), 0 0 20px rgba(0, 245, 255, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgba(0, 245, 255, 0.9), 0 0 50px rgba(0, 245, 255, 0.5), 0 0 80px rgba(0, 245, 255, 0.2)",
          },
        },
        // フローティング: ヒーローセクション用y軸±10px繰り返し
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        neonPulse: "neonPulse 2s ease-in-out infinite",
        neonCyanPulse: "neonCyanPulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

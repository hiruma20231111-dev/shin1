// ConditionsSection - 待遇・シフト条件（時給・勤務時間・交通費・服装規定）
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  NEON_GLOW_ANIMATE,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import { JOB_CONDITIONS } from "@/constants/shopInfo";

type ConditionItem = {
  icon: string;
  label: string;
  value: string;
  highlight: boolean;
  color: "pink" | "cyan" | "purple";
};

const CONDITION_ITEMS: ConditionItem[] = [
  {
    icon: "💴",
    label: "時給",
    value: JOB_CONDITIONS.hourlyWage,
    highlight: true,
    color: "pink",
  },
  {
    icon: "🌙",
    label: "勤務時間",
    value: JOB_CONDITIONS.workingHours,
    highlight: false,
    color: "cyan",
  },
  {
    icon: "📅",
    label: "最低勤務日数",
    value: JOB_CONDITIONS.minimumDaysPerWeek,
    highlight: false,
    color: "purple",
  },
  {
    icon: "⏰",
    label: "最低勤務時間",
    value: JOB_CONDITIONS.minimumHoursPerDay,
    highlight: false,
    color: "cyan",
  },
  {
    icon: "🚃",
    label: "交通費",
    value: JOB_CONDITIONS.transportation,
    highlight: false,
    color: "purple",
  },
  {
    icon: "👗",
    label: "服装・髪型",
    value: JOB_CONDITIONS.dresscode,
    highlight: true,
    color: "pink",
  },
];

const colorClasses: Record<
  ConditionItem["color"],
  { text: string; border: string; bg: string }
> = {
  pink: {
    text: "text-neonPink",
    border: "border-neonPink/40",
    bg: "bg-neonPink/10",
  },
  cyan: {
    text: "text-neonCyan",
    border: "border-neonCyan/40",
    bg: "bg-neonCyan/10",
  },
  purple: {
    text: "text-neonPurple",
    border: "border-neonPurple/40",
    bg: "bg-neonPurple/10",
  },
};

export default function ConditionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section
      ref={ref}
      id="conditions"
      className="py-24 px-4 bg-darkBase relative overflow-hidden"
      aria-labelledby="conditions-heading"
    >
      {/* 背景装飾グラデーション */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #9b5de5, transparent)" }}
        role="img"
        aria-label="背景装飾グラデーション"
      />

      <div className="container mx-auto max-w-5xl">
        {/* セクションヘッダー */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-neonPink text-sm font-medium tracking-widest mb-3"
          >
            CONDITIONS
          </motion.p>
          <motion.h2
            id="conditions-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            待遇・シフト条件
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-lg"
          >
            あなたのライフスタイルに合わせて、無理なく働ける環境です。
          </motion.p>
        </motion.div>

        {/* 時給ハイライトカード - パターン2: ネオンglow pulse適用 */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.div
            animate={NEON_GLOW_ANIMATE.pink}
            className="rounded-3xl border border-neonPink/50 bg-gradient-to-br from-neonPink/20 to-neonPurple/10 p-8 md:p-12 text-center"
          >
            <p className="text-neonPink text-sm font-medium tracking-widest mb-2">
              💴 時給
            </p>
            <p className="text-6xl md:text-8xl font-black text-white">
              {JOB_CONDITIONS.hourlyWage}
            </p>
            <p className="text-textSecondary mt-3">
              ※経験・スキルに応じて昇給あり
            </p>
          </motion.div>
        </motion.div>

        {/* 条件グリッド */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CONDITION_ITEMS.filter((item) => !item.highlight).map((item) => {
            const classes = colorClasses[item.color];
            return (
              <motion.div
                key={item.label}
                variants={FADE_IN_UP_VARIANTS}
                className={`rounded-2xl border ${classes.border} ${classes.bg} p-6`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-textSecondary text-xs font-medium tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className={`text-xl font-bold ${classes.text}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 補足情報 */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="rounded-2xl border border-neonCyan/20 bg-neonCyan/5 p-6">
            <h3 className="text-neonCyan font-bold mb-3 flex items-center gap-2">
              <span aria-hidden="true">✅</span> こんな人が活躍中
            </h3>
            <ul className="text-textSecondary text-sm space-y-2">
              {[
                "大学生・専門学生",
                "バイト掛け持ち中の方",
                "ナイトワーク初挑戦の方",
                "ダーツ・お酒好きな方",
                "接客経験ゼロでも◎",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="text-neonCyan" aria-hidden="true">→</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-neonPurple/20 bg-neonPurple/5 p-6">
            <h3 className="text-neonPurple font-bold mb-3 flex items-center gap-2">
              <span aria-hidden="true">🎁</span> その他待遇
            </h3>
            <ul className="text-textSecondary text-sm space-y-2">
              {[
                "研修期間あり（丁寧にサポート）",
                "まかないドリンクあり",
                "友人紹介制度あり",
                "シフト希望柔軟に対応",
                "入れ墨・ピアス相談OK",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="text-neonPurple" aria-hidden="true">→</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

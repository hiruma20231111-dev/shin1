// JobDescriptionSection - 仕事内容紹介（ダーツ・ドリンク提供・接客等）
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";

type JobItem = {
  icon: string;
  title: string;
  description: string;
  color: "pink" | "cyan" | "purple";
};

const JOB_ITEMS: JobItem[] = [
  {
    icon: "🎯",
    title: "ダーツのサポート",
    description:
      "ルールを知らないお客様への丁寧なレクチャーや、ゲーム盛り上げ。ダーツ未経験でも研修でしっかり覚えられます。",
    color: "pink",
  },
  {
    icon: "🍹",
    title: "ドリンク・フード提供",
    description:
      "オーダーを受けてカクテルや各種ドリンクをご提供。バーテンダー未経験でも教えるので安心です。",
    color: "cyan",
  },
  {
    icon: "🎤",
    title: "カラオケ盛り上げ",
    description:
      "お客様のカラオケを一緒に楽しみながら場を盛り上げるのも大事なお仕事。歌が好きな方、大歓迎！",
    color: "purple",
  },
  {
    icon: "💬",
    title: "接客・会話",
    description:
      "常連様・初来店の方どちらにも気持ちよく過ごしてもらえるようにコミュニケーションをとります。",
    color: "pink",
  },
  {
    icon: "✨",
    title: "店内清掃・仕込み",
    description:
      "オープン前の軽い清掃や氷・フルーツの仕込みなど。丁寧にやることで接客に自信が生まれます。",
    color: "cyan",
  },
  {
    icon: "🎶",
    title: "BGM・雰囲気づくり",
    description:
      "その日の客層や雰囲気に合わせてBGMを選んだり、インスタ映えするディスプレイを整えたり。センスを活かせます。",
    color: "purple",
  },
];

const colorClasses: Record<JobItem["color"], { border: string; bg: string; icon: string; text: string }> = {
  pink: {
    border: "border-neonPink/30",
    bg: "bg-neonPink/5",
    icon: "bg-neonPink/20 text-neonPink",
    text: "text-neonPink",
  },
  cyan: {
    border: "border-neonCyan/30",
    bg: "bg-neonCyan/5",
    icon: "bg-neonCyan/20 text-neonCyan",
    text: "text-neonCyan",
  },
  purple: {
    border: "border-neonPurple/30",
    bg: "bg-neonPurple/5",
    icon: "bg-neonPurple/20 text-neonPurple",
    text: "text-neonPurple",
  },
};

export default function JobDescriptionSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section
      ref={ref}
      id="job-description"
      className="py-24 px-4 bg-darkSurface relative overflow-hidden"
      aria-labelledby="job-description-heading"
    >
      {/* 背景装飾 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)",
        }}
        role="img"
        aria-label="セクション区切り装飾ライン"
      />

      <div className="container mx-auto max-w-6xl">
        {/* セクションヘッダー */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-neonCyan text-sm font-medium tracking-widest mb-3"
          >
            WHAT YOU DO
          </motion.p>
          <motion.h2
            id="job-description-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            仕事内容
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-lg max-w-xl mx-auto"
          >
            難しいことはありません。楽しむことが、一番大事な仕事です。
          </motion.p>
        </motion.div>

        {/* 仕事内容カードグリッド */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {JOB_ITEMS.map((item) => {
            const classes = colorClasses[item.color];
            return (
              <motion.div
                key={item.title}
                variants={FADE_IN_UP_VARIANTS}
                className={`rounded-2xl border ${classes.border} ${classes.bg} p-6 backdrop-blur-sm`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 ${classes.icon}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${classes.text}`}>
                  {item.title}
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 補足メッセージ */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center p-6 rounded-2xl border border-neonPink/20 bg-neonPink/5"
        >
          <p className="text-white font-medium text-lg">
            🎯 ダーツが全くできなくてもOK！
          </p>
          <p className="text-textSecondary mt-2">
            お客様と一緒に楽しめる姿勢があれば、スキルはあとからついてきます。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

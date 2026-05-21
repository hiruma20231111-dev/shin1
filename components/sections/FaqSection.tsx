// FaqSection - よくある質問（採用LP向け5〜7問）アコーディオン形式
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "ダーツが全くできないのですが、大丈夫ですか？",
    answer:
      "全く問題ありません！ダーツ未経験のスタッフが大半です。研修期間中に丁寧にルールとゲームの盛り上げ方をお教えします。むしろ「お客様と一緒に楽しめる姿勢」の方が大切です。",
  },
  {
    question: "お酒が飲めなくても働けますか？",
    answer:
      "はい、問題ありません。スタッフとしてお客様にドリンクを提供するお仕事なので、自分が飲む必要はありません。ソフトドリンク対応も可能です。",
  },
  {
    question: "バイトの掛け持ちはOKですか？",
    answer:
      "もちろんOKです！大学・専門学校との両立や他のバイトとの掛け持ちをしているスタッフも多いです。シフトは希望に合わせて柔軟に調整できます。",
  },
  {
    question: "深夜のバイトは初めてなのですが、不安があります。",
    answer:
      "初めての方が多いので、安心してください。先輩スタッフがしっかりサポートします。店内は安全な環境で、困ったことは何でも相談できる体制を整えています。",
  },
  {
    question: "服装や髪型に制限はありますか？",
    answer:
      "服装・髪型は完全に自由です。個性的なファッションや派手な髪色のスタッフも活躍中です。自分らしさをそのまま発揮してください。",
  },
  {
    question: "週1日・短時間から本当に働けますか？",
    answer:
      "はい。週1日・1日4時間からOKです。学校やプライベートを最優先にしたい方も大歓迎です。慣れてきたら希望に応じてシフトを増やすことも可能です。",
  },
  {
    question: "未成年でも応募できますか？",
    answer:
      "申し訳ありませんが、ナイトバーという業態の性質上、18歳以上（高校生不可）の方を対象としています。大学生・専門学生・社会人の方からのご応募をお待ちしています。",
  },
];

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="py-24 px-4 bg-darkBase relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* 背景装飾 */}
      <div
        className="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
        role="img"
        aria-label="背景装飾グラデーション"
      />

      <div className="container mx-auto max-w-3xl">
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
            FAQ
          </motion.p>
          <motion.h2
            id="faq-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            よくある質問
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-lg"
          >
            不安なことは、遠慮なく応募フォームの備考欄でも聞いてください。
          </motion.p>
        </motion.div>

        {/* FAQアコーディオン */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.question}
              variants={FADE_IN_UP_VARIANTS}
              className="rounded-2xl border border-darkBorder bg-darkCard overflow-hidden"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-neonCyan font-black text-lg flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    Q.
                  </span>
                  <span className="text-white font-medium leading-snug">
                    {item.question}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-neonCyan flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-darkBorder pt-4 flex gap-3">
                        <span
                          className="text-neonPink font-black text-lg flex-shrink-0"
                          aria-hidden="true"
                        >
                          A.
                        </span>
                        <p className="text-textSecondary leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

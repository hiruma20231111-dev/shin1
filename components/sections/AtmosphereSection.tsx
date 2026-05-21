// AtmosphereSection - 職場の雰囲気・スタッフ紹介（写真プレースホルダー付き）
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import { IMAGE_PATHS } from "@/constants/shopInfo";

type StaffMember = {
  imagePath: string;
  imageAlt: string;
  name: string;
  role: string;
  comment: string;
  emoji: string;
};

const STAFF_MEMBERS: StaffMember[] = [
  {
    imagePath: IMAGE_PATHS.staff1,
    imageAlt: "スタッフ写真（差し替え用）- スタッフAの顔写真またはポートレート",
    name: "スタッフA",
    role: "大学3年生",
    comment:
      "最初はバーテンダーなんて全然できなかったけど、今では常連さんに顔を覚えてもらえるようになりました！夜が好きなら絶対楽しいです。",
    emoji: "🎯",
  },
  {
    imagePath: IMAGE_PATHS.staff2,
    imageAlt: "スタッフ写真（差し替え用）- スタッフBの顔写真またはポートレート",
    name: "スタッフB",
    role: "大学2年生",
    comment:
      "週2で入ってて、授業との両立もしやすい。ダーツめちゃくちゃ上手くなったし、友達もいっぱい増えました！",
    emoji: "🍹",
  },
  {
    imagePath: IMAGE_PATHS.staff3,
    imageAlt: "スタッフ写真（差し替え用）- スタッフCの顔写真またはポートレート",
    name: "スタッフC",
    role: "専門学生",
    comment:
      "他のバイトと掛け持ちしてます。夜の仕事は初めてで不安でしたが、先輩スタッフが丁寧に教えてくれてすぐ慣れました！",
    emoji: "🎤",
  },
];

type ShopPhotoItem = {
  imagePath: string;
  imageAlt: string;
  label: string;
};

const SHOP_PHOTOS: ShopPhotoItem[] = [
  {
    imagePath: IMAGE_PATHS.shopInterior1,
    imageAlt: "店内写真（差し替え用）- ダーツエリアの様子",
    label: "ダーツエリア",
  },
  {
    imagePath: IMAGE_PATHS.shopInterior2,
    imageAlt: "店内写真（差し替え用）- バーカウンターの様子",
    label: "バーカウンター",
  },
];

export default function AtmosphereSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section
      ref={ref}
      id="atmosphere"
      className="py-24 px-4 bg-darkSurface relative overflow-hidden"
      aria-labelledby="atmosphere-heading"
    >
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
            className="text-neonPurple text-sm font-medium tracking-widest mb-3"
          >
            ATMOSPHERE
          </motion.p>
          <motion.h2
            id="atmosphere-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            職場の雰囲気
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-lg max-w-xl mx-auto"
          >
            バーは怖いところじゃない。居心地よく、自分らしく働ける場所です。
          </motion.p>
        </motion.div>

        {/* 店内写真プレースホルダー */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {SHOP_PHOTOS.map((photo) => (
            <motion.div
              key={photo.label}
              variants={FADE_IN_UP_VARIANTS}
              className="relative rounded-2xl overflow-hidden aspect-video border border-darkBorder group"
            >
              {/* 画像プレースホルダー: 実素材を public/images/ に配置後、img/Imageタグに差し替え */}
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #12121a 50%, #1a1a2e 100%)",
                  backgroundSize: "400% 400%",
                }}
                role="img"
                aria-label={photo.imageAlt}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3" aria-hidden="true">
                    📷
                  </div>
                  <p className="text-textSecondary text-sm">{photo.label}</p>
                  <p className="text-darkBorder text-xs mt-1">
                    {photo.imagePath}
                  </p>
                </div>
              </div>
              {/* グラデーションオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkBase/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-textSecondary">{photo.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* スタッフ紹介カード */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.h3
            variants={FADE_IN_UP_VARIANTS}
            className="text-2xl font-black text-white text-center mb-10"
          >
            スタッフの声
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAFF_MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                variants={FADE_IN_UP_VARIANTS}
                className="rounded-2xl border border-darkBorder bg-darkCard p-6"
              >
                {/* スタッフ写真プレースホルダー */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-neonPurple/40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(155,93,229,0.2), rgba(255,45,120,0.1))",
                  }}
                  role="img"
                  aria-label={member.imageAlt}
                >
                  <span className="text-3xl" aria-hidden="true">
                    {member.emoji}
                  </span>
                  {/* 画像差し替え用パス: {member.imagePath} */}
                </div>
                <div className="text-center mb-4">
                  <p className="font-bold text-white">{member.name}</p>
                  <p className="text-textSecondary text-xs mt-1">
                    {member.role}
                  </p>
                </div>
                <p className="text-textSecondary text-sm leading-relaxed text-center">
                  &ldquo;{member.comment}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 雰囲気キーワードタグ */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "🏖️ リラックス感",
              "🌴 トロピカルな雰囲気",
              "🎯 ダーツで盛り上がる",
              "🤝 チームワーク抜群",
              "🌊 海モチーフのデコ",
              "🐬 個性的なスタッフ",
              "🎶 音楽が流れる夜",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-darkCard border border-darkBorder text-textSecondary text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// AtmosphereSection - 職場の雰囲気・スタッフ写真（名前非表示）・イベント紹介
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import { IMAGE_PATHS } from "@/constants/shopInfo";

type StaffPhotoItem = {
  imagePath: string;
  imageAlt: string;
};

// スタッフ写真3枚 - 名前・役職は意図的に非表示
const STAFF_PHOTO_ITEMS: StaffPhotoItem[] = [
  { imagePath: IMAGE_PATHS.staff1, imageAlt: "PinkDolphinスタッフ写真（バー勤務シーン）" },
  { imagePath: IMAGE_PATHS.staff2, imageAlt: "PinkDolphinスタッフ写真（浴衣イベント）" },
  { imagePath: IMAGE_PATHS.staff3, imageAlt: "PinkDolphinスタッフ写真（ハロウィンイベント）" },
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

// 画像読み込みエラー時にプレースホルダーへフォールバックするコンポーネント
// HEIC形式はブラウザ非対応のためフォールバックが表示される（JPEG変換後に解消）
function StaffPhotoCard({ item }: { item: StaffPhotoItem }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden border border-darkBorder group">
      {hasError ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,45,120,0.1), rgba(155,93,229,0.1))",
          }}
          role="img"
          aria-label={item.imageAlt}
        >
          <span className="text-4xl mb-2" aria-hidden="true">
            📷
          </span>
          <p className="text-textSecondary text-xs text-center px-3">
            {item.imageAlt}
          </p>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imagePath}
          alt={item.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}
      {/* ホバー時グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-neonPink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

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

        {/* 店内写真（差し替え用プレースホルダー） */}
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
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #12121a 50%, #1a1a2e 100%)",
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
            </motion.div>
          ))}
        </motion.div>

        {/* スタッフ写真セクション */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.h3
            variants={FADE_IN_UP_VARIANTS}
            className="text-2xl font-black text-white text-center mb-3"
          >
            スタッフ紹介
          </motion.h3>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-center mb-10"
          >
            個性豊かなメンバーが揃っています。
          </motion.p>

          {/* 3枚フォトグリッド: モバイル1列、sm以上で3列 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STAFF_PHOTO_ITEMS.map((item) => (
              <motion.div key={item.imagePath} variants={FADE_IN_UP_VARIANTS}>
                <StaffPhotoCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* "愉快なスタッフたちと一緒に働きましょう" タグライン */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <div className="rounded-3xl border border-neonPink/30 bg-gradient-to-br from-neonPink/10 via-neonPurple/5 to-darkCard p-8 text-center">
            <p className="text-3xl md:text-4xl font-black text-white mb-3">
              愉快なスタッフたちと
              <br className="md:hidden" />
              一緒に働きましょう 🐬
            </p>
            <p className="text-textSecondary text-lg">
              笑いあり、ダーツあり、夜ならではの盛り上がりあり。
              <br />
              PinkDolphinは、あなたを待っています。
            </p>
          </div>
        </motion.div>

        {/* イベント開催について */}
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          <div className="rounded-2xl border border-neonCyan/20 bg-neonCyan/5 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl flex-shrink-0" aria-hidden="true">
              🎉
            </div>
            <div>
              <h4 className="text-neonCyan font-black text-xl mb-2">
                イベントも定期開催！
              </h4>
              <p className="text-textSecondary leading-relaxed">
                ダーツトーナメントや季節のイベントなど、お客様と一緒に盛り上がる企画を定期的に行っています。
                スタッフとして運営に携わることで、接客だけでは得られない達成感と楽しさを体験できます。
              </p>
            </div>
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
              "🎉 定期イベント開催",
              "🌊 海モチーフのデコ",
              "🐬 愉快なスタッフ",
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

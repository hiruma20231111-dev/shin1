// AccessSection - アクセス・店舗情報（住所・営業時間・地図プレースホルダー）
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import {
  SHOP_NAME,
  SHOP_ADDRESS,
  SHOP_NEAREST_STATION,
  SHOP_BUSINESS_HOURS,
  SHOP_PHONE,
  GOOGLE_MAPS_EMBED_URL,
} from "@/constants/shopInfo";

type InfoItem = {
  icon: string;
  label: string;
  value: string;
};

const INFO_ITEMS: InfoItem[] = [
  { icon: "🏪", label: "店舗名", value: SHOP_NAME },
  { icon: "📍", label: "住所", value: SHOP_ADDRESS },
  { icon: "🚃", label: "最寄り駅", value: SHOP_NEAREST_STATION },
  { icon: "🌙", label: "営業時間", value: SHOP_BUSINESS_HOURS },
  { icon: "📞", label: "電話番号", value: SHOP_PHONE },
];

export default function AccessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  // TODO: 要確認 - GOOGLE_MAPS_EMBED_URLが確定したらiframeのsrcに設定すること
  const isMapEmbedUrlReady = !GOOGLE_MAPS_EMBED_URL.startsWith("TODO:");

  return (
    <section
      ref={ref}
      id="access"
      className="py-24 px-4 bg-darkSurface relative overflow-hidden"
      aria-labelledby="access-heading"
    >
      {/* 背景装飾 */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff2d78, transparent)" }}
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
            ACCESS
          </motion.p>
          <motion.h2
            id="access-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            アクセス・店舗情報
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 店舗情報リスト */}
          <motion.div
            variants={STAGGER_CONTAINER_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-4">
              {INFO_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={FADE_IN_UP_VARIANTS}
                  className="flex items-start gap-4 p-4 rounded-xl bg-darkCard border border-darkBorder"
                >
                  <span
                    className="text-2xl flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-textSecondary text-xs font-medium tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 補足: スタッフ採用時の勤務時間 */}
            <motion.div
              variants={FADE_IN_UP_VARIANTS}
              className="mt-4 p-4 rounded-xl bg-neonCyan/5 border border-neonCyan/20"
            >
              <p className="text-neonCyan text-sm font-medium mb-1">
                📋 スタッフ勤務時間
              </p>
              <p className="text-textSecondary text-sm">
                19:30〜6:00（シフト制）
                <br />
                ※業務の都合により変動する場合があります
              </p>
            </motion.div>
          </motion.div>

          {/* Google Maps埋め込みプレースホルダー */}
          <motion.div
            variants={FADE_IN_UP_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl overflow-hidden border border-darkBorder aspect-video lg:aspect-auto lg:min-h-80"
          >
            {isMapEmbedUrlReady ? (
              // TODO: 要確認 - Google Maps URL確定後にこのiframeが表示される
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="店舗へのアクセスマップ"
              />
            ) : (
              // マップURL未設定時のプレースホルダー
              <div
                className="w-full h-full min-h-80 flex flex-col items-center justify-center bg-darkCard"
                role="img"
                aria-label="Googleマップ（差し替え用）- 店舗住所確定後に埋め込みURLを設定してください"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  🗺️
                </div>
                <p className="text-textSecondary text-sm text-center px-4">
                  Googleマップ
                  <br />
                  （住所確定後に埋め込みURLを設定）
                </p>
                <p className="text-darkBorder text-xs mt-2 text-center px-4">
                  constants/shopInfo.ts の
                  <br />
                  GOOGLE_MAPS_EMBED_URL を更新
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

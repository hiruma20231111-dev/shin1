// AccessSection - アクセス・店舗情報（住所・営業時間・Instagram・地図プレースホルダー）
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
  SHOP_INSTAGRAM_URL,
  SHOP_INSTAGRAM_HANDLE,
  GOOGLE_MAPS_EMBED_URL,
} from "@/constants/shopInfo";

type InfoItem =
  | { kind: "text"; icon: string; label: string; value: string }
  | { kind: "link"; icon: string; label: string; value: string; href: string };

const INFO_ITEMS: InfoItem[] = [
  { kind: "text", icon: "🏪", label: "店舗名", value: SHOP_NAME },
  { kind: "text", icon: "📍", label: "住所", value: SHOP_ADDRESS },
  { kind: "text", icon: "🚃", label: "最寄り駅", value: SHOP_NEAREST_STATION },
  { kind: "text", icon: "🌙", label: "営業時間", value: SHOP_BUSINESS_HOURS },
  { kind: "text", icon: "📞", label: "電話番号", value: SHOP_PHONE },
  {
    kind: "link",
    icon: "📸",
    label: "Instagram",
    value: SHOP_INSTAGRAM_HANDLE,
    href: SHOP_INSTAGRAM_URL,
  },
];

export default function AccessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

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
                    {item.kind === "link" ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neonPink font-medium text-sm hover:text-neonPink/80 underline underline-offset-2 transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium text-sm leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* スタッフ勤務時間補足 */}
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
              <div
                className="w-full h-full min-h-80 flex flex-col items-center justify-center bg-darkCard"
                role="img"
                aria-label="Googleマップ（差し替え用）- 大阪府東大阪市足代新町11-9 リップルⅡ1F"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  🗺️
                </div>
                <p className="text-textSecondary text-sm text-center px-4">
                  Googleマップ
                  <br />
                  大阪府東大阪市足代新町11-9
                </p>
                <p className="text-darkBorder text-xs mt-2 text-center px-4">
                  constants/shopInfo.ts の
                  <br />
                  GOOGLE_MAPS_EMBED_URL を更新してください
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CtaBanner - 応募フォームへアンカーリンクで誘導するCTAバナー（セクション間2箇所に配置）
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FADE_IN_UP_VARIANTS, NEON_GLOW_ANIMATE, IN_VIEW_OPTIONS } from "@/constants/animations";

type CtaBannerVariant = "pink" | "cyan";

type CtaBannerProps = {
  heading: string;
  subText: string;
  buttonLabel: string;
  variant: CtaBannerVariant;
};

const APPLICATION_FORM_ANCHOR = "entry-form";

const variantStyles: Record<
  CtaBannerVariant,
  {
    border: string;
    bg: string;
    headingColor: string;
    glowAnimate: (typeof NEON_GLOW_ANIMATE)[keyof typeof NEON_GLOW_ANIMATE];
    buttonBg: string;
    buttonShadow: string;
  }
> = {
  pink: {
    border: "border-neonPink/30",
    bg: "from-neonPink/15 via-neonPurple/10 to-darkCard",
    headingColor: "text-neonPink",
    glowAnimate: NEON_GLOW_ANIMATE.pink,
    buttonBg: "linear-gradient(135deg, #ff2d78 0%, #9b5de5 100%)",
    buttonShadow:
      "0 0 20px rgba(255, 45, 120, 0.5), 0 0 40px rgba(255, 45, 120, 0.2)",
  },
  cyan: {
    border: "border-neonCyan/30",
    bg: "from-neonCyan/10 via-neonPurple/10 to-darkCard",
    headingColor: "text-neonCyan",
    glowAnimate: NEON_GLOW_ANIMATE.cyan,
    buttonBg: "linear-gradient(135deg, #00f5ff 0%, #9b5de5 100%)",
    buttonShadow:
      "0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)",
  },
};

export default function CtaBanner({
  heading,
  subText,
  buttonLabel,
  variant,
}: CtaBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);
  const styles = variantStyles[variant];

  return (
    <div ref={ref} className="py-12 px-4" aria-label="応募誘導バナー">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            animate={styles.glowAnimate}
            className={`rounded-3xl border ${styles.border} bg-gradient-to-br ${styles.bg} p-8 md:p-12 text-center`}
          >
            <p className={`text-2xl md:text-3xl font-black mb-3 ${styles.headingColor}`}>
              {heading}
            </p>
            <p className="text-textSecondary mb-8 text-lg">{subText}</p>
            <motion.a
              href={`#${APPLICATION_FORM_ANCHOR}`}
              className="inline-block px-10 py-4 rounded-full text-white font-black text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: styles.buttonBg,
                boxShadow: styles.buttonShadow,
              }}
            >
              {buttonLabel}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

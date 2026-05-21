// ページルート - 全セクションの配置・CTA配置（セクション間2箇所）
import HeroSection from "@/components/sections/HeroSection";
import JobDescriptionSection from "@/components/sections/JobDescriptionSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import AtmosphereSection from "@/components/sections/AtmosphereSection";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import ApplicationFormSection from "@/components/sections/ApplicationFormSection";
import CtaBanner from "@/components/CtaBanner";
import { SHOP_NAME } from "@/constants/shopInfo";

export default function RecruitmentLandingPage() {
  return (
    <main>
      {/* 1. ヒーロー */}
      <HeroSection />

      {/* 2. 仕事内容 */}
      <JobDescriptionSection />

      {/* CTAバナー①: 仕事内容→待遇の間に配置 */}
      <CtaBanner
        heading="気になったら、まず応募してみよう。"
        subText="選考の詳細はご応募後にお伝えします。まずは気軽にどうぞ！"
        buttonLabel="今すぐ応募する 🎯"
        variant="pink"
      />

      {/* 3. 待遇・シフト条件 */}
      <ConditionsSection />

      {/* 4. 職場の雰囲気・スタッフ紹介 */}
      <AtmosphereSection />

      {/* CTAバナー②: 雰囲気紹介→FAQ の間に配置 */}
      <CtaBanner
        heading="一緒に夜を盛り上げませんか？"
        subText="週1日・未経験OK。あなたのペースで始められます。"
        buttonLabel="応募フォームへ 🌊"
        variant="cyan"
      />

      {/* 5. FAQ */}
      <FaqSection />

      {/* 6. アクセス・店舗情報 */}
      <AccessSection />

      {/* 7. 応募フォーム */}
      <ApplicationFormSection />

      {/* フッター */}
      <footer className="py-8 px-4 bg-darkSurface border-t border-darkBorder text-center">
        <p className="text-textSecondary text-sm">
          © 2025 {SHOP_NAME}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

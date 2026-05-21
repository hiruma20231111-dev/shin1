// ルートレイアウト - ダークモード固定、メタデータ設定
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "スタッフ募集 | ダーツバー アルバイト求人",
  description:
    "ダーツ・ドリンク・音楽で盛り上がれるナイトバーでスタッフ募集中！時給1,200円〜、週1日〜OK、服装・髪型自由。未経験歓迎です。",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 常時ダークモード: classにdarkを付与して全子要素にダークモードを強制適用
    <html lang="ja" className="dark scrollbar-dark">
      <body className="bg-darkBase text-textPrimary antialiased">
        {children}
      </body>
    </html>
  );
}

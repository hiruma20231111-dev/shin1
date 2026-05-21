// 店舗固有情報定数 - 確定次第各TODO箇所を更新すること

// TODO: 要確認 - 以下の定数はすべてオーナーへの確認後に実際の値へ置き換えること

export const SHOP_NAME = "TODO: 要確認 - 店舗名（例: Dart Bar TROPICANA）";

export const SHOP_ADDRESS = "TODO: 要確認 - 正式住所（例: 東京都渋谷区〇〇町1-2-3 ××ビル2F）";

export const SHOP_NEAREST_STATION = "TODO: 要確認 - 最寄り駅・徒歩分数（例: 渋谷駅 徒歩3分）";

export const SHOP_BUSINESS_HOURS = "TODO: 要確認 - 営業時間（例: 19:00〜翌6:00）";

export const SHOP_PHONE = "TODO: 要確認 - 電話番号";

// Google Maps埋め込みURL: Google Maps > 共有 > 地図を埋め込む からiframeのsrc値を取得
export const GOOGLE_MAPS_EMBED_URL = "TODO: 要確認 - Google Maps埋め込みURL（例: https://www.google.com/maps/embed?pb=...）";

// FormspreeフォームID: https://formspree.io でフォームを作成し、送信先をshin.crml.c@icloud.comに設定後、
// フォームID（例: xpwzabcd）をここに記載する
export const FORMSPREE_FORM_ID = "TODO: 要確認 - FormspreeフォームID（formspree.ioでフォーム作成後に取得）";

// 採用条件 - ヒアリング済み確定値
export const JOB_CONDITIONS = {
  hourlyWage: "1,200円〜",
  workingHours: "19:30〜6:00（シフト制）",
  minimumDaysPerWeek: "週1日〜OK",
  minimumHoursPerDay: "1日4h〜OK",
  transportation: "規定内支給",
  dresscode: "服装・髪型 自由",
} as const;

// 画像パス定数 - public/images/ 配下に実素材を配置後、パスを差し替えること
export const IMAGE_PATHS = {
  heroBackground: "/images/hero-bg.jpg",        // TODO: 要確認 - ヒーロー背景画像（差し替え用）
  heroIllustration: "/images/hero-dolphin.png", // TODO: 要確認 - ピンクイルカ/ロゴイラスト（差し替え用）
  shopInterior1: "/images/shop-interior-1.jpg", // TODO: 要確認 - 店内写真1（差し替え用）
  shopInterior2: "/images/shop-interior-2.jpg", // TODO: 要確認 - 店内写真2（差し替え用）
  staff1: "/images/staff-1.jpg",                // TODO: 要確認 - スタッフ写真1（差し替え用）
  staff2: "/images/staff-2.jpg",                // TODO: 要確認 - スタッフ写真2（差し替え用）
  staff3: "/images/staff-3.jpg",                // TODO: 要確認 - スタッフ写真3（差し替え用）
  shopLogo: "/images/shop-logo.png",            // TODO: 要確認 - ショップロゴ（差し替え用）
} as const;

// 店舗固有情報定数

export const SHOP_NAME = "darts&shot Bar PinkDolphin";

export const SHOP_ADDRESS = "大阪府東大阪市足代新町11-9 リップルⅡ1F";

export const SHOP_NEAREST_STATION = "近鉄布施駅 徒歩10分";

export const SHOP_BUSINESS_HOURS = "TODO: 要確認 - 営業時間（例: 19:00〜翌6:00）";

export const SHOP_PHONE = "06-6224-7773";

export const SHOP_INSTAGRAM_URL = "https://www.instagram.com/fuse.bar.pindol/";

export const SHOP_INSTAGRAM_HANDLE = "@fuse.bar.pindol";

// Google Maps埋め込みURL: Google Maps > 共有 > 地図を埋め込む からiframeのsrc値を取得
export const GOOGLE_MAPS_EMBED_URL = "TODO: 要確認 - Google Maps埋め込みURL（例: https://www.google.com/maps/embed?pb=...）";

// Formspreeフォームエンドポイント: https://formspree.io/f/xbdbognr
// 送信先: shin.crml.c@icloud.com
export const FORMSPREE_FORM_ID = "xbdbognr";

// 採用条件 - ヒアリング済み確定値
export const JOB_CONDITIONS = {
  hourlyWage: "1,200円〜",
  workingHours: "19:30〜6:00（シフト制）",
  minimumDaysPerWeek: "週1日〜OK",
  minimumHoursPerDay: "1日4h〜OK",
  transportation: "規定内支給",
  dresscode: "服装・髪型 自由",
} as const;

// 画像パス定数 - public/images/ 配下にファイルを配置して使用
// IMPORTANT: HEIC形式（IMG_7409.HEIC, IMG_7522.HEIC）はブラウザ非対応のため、
// macOSプレビュー.app・Squoosh（https://squoosh.app）等でJPEGまたはWebPに変換後、
// 同じファイル名のまま拡張子のみ変更してください。変換前は代替プレースホルダーが表示されます。
export const IMAGE_PATHS = {
  heroBackground: "/images/hero-bg.jpg",        // TODO: 要確認 - ヒーロー背景画像（差し替え用）
  heroIllustration: "/images/hero-dolphin.png", // TODO: 要確認 - ピンクイルカ/ロゴイラスト（差し替え用）
  shopInterior1: "/images/shop-interior-1.jpg", // TODO: 要確認 - 店内写真1（差し替え用）
  shopInterior2: "/images/shop-interior-2.jpg", // TODO: 要確認 - 店内写真2（差し替え用）
  // スタッフ写真3枚: HEIC→JPEG変換後に実際の写真が表示されます（上記コメント参照）
  staff1: "/images/IMG_7409.HEIC",  // スタッフソロ写真（HEIC→JPEG変換が必要）
  staff2: "/images/IMG_7522.HEIC",  // 浴衣イベント写真（HEIC→JPEG変換が必要）
  staff3: "/images/IMG_7898.JPG",   // ハロウィンイベント写真（JPG・即表示可能）
  shopLogo: "/images/shop-logo.png",            // TODO: 要確認 - ショップロゴ（差し替え用）
} as const;

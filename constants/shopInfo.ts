// 店舗固有情報定数

export const SHOP_NAME = "darts&shot Bar PinkDolphin";

export const SHOP_ADDRESS = "大阪府東大阪市足代新町11-9 リップルⅡ1F";

export const SHOP_NEAREST_STATION = "近鉄布施駅 徒歩10分";

export const SHOP_BUSINESS_HOURS = "TODO: 要確認 - 営業時間（例: 19:00〜翌6:00）";

export const SHOP_PHONE = "06-6224-7773";

export const SHOP_INSTAGRAM_URL = "https://www.instagram.com/fuse.bar.pindol/";

export const SHOP_INSTAGRAM_HANDLE = "@fuse.bar.pindol";

// Google Maps埋め込みURL（APIキー不要の住所検索形式）
// 元のシェアURL: https://maps.app.goo.gl/k2QVPpCH8SVANn3f6
export const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=%E5%A4%A7%E9%98%AA%E5%BA%9C%E6%9D%B1%E5%A4%A7%E9%98%AA%E5%B8%82%E8%B6%B3%E4%BB%A3%E6%96%B0%E7%94%BA11-9%20%E3%83%AA%E3%83%83%E3%83%97%E3%83%ABII1F&output=embed&hl=ja&z=17";

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
  shopInterior1: "/images/shop-darts-corner.jpg", // ダーツコーナー写真 → public/images/shop-darts-corner.jpg に配置
  shopInterior2: "/images/shop-bar-counter.jpg",  // バーカウンター写真 → public/images/shop-bar-counter.jpg に配置
  // スタッフ写真3枚: HEIC→JPEG変換後に実際の写真が表示されます（上記コメント参照）
  staff1: "/images/IMG_7409.HEIC",  // スタッフソロ写真（HEIC→JPEG変換が必要）
  staff2: "/images/IMG_7522.HEIC",  // 浴衣イベント写真（HEIC→JPEG変換が必要）
  staff3: "/images/IMG_7898.JPG",   // ハロウィンイベント写真（JPG・即表示可能）
  shopLogo: "/images/shop-logo.png",            // TODO: 要確認 - ショップロゴ（差し替え用）
} as const;

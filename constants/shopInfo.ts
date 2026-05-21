// 店舗固有情報定数

export const SHOP_NAME = "darts&shot Bar PinkDolphin";

export const SHOP_ADDRESS = "大阪府東大阪市足代新町11-9 リップルⅡ1F";

export const SHOP_NEAREST_STATION = "近鉄布施駅 徒歩10分";

export const SHOP_BUSINESS_HOURS = "TODO: 要確認 - 営業時間（例: 19:00〜翌6:00）";

export const SHOP_PHONE = "06-6224-7773";

export const SHOP_INSTAGRAM_URL = "https://www.instagram.com/fuse.bar.pindol/";

export const SHOP_INSTAGRAM_HANDLE = "@fuse.bar.pindol";

// Google Maps埋め込みURL（Google Maps「地図を埋め込む」から取得した正式URL）
export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5738633914184!2d135.55719407574293!3d34.66546337293221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000de32420ad0ab%3A0x80c2399e59af2d3!2z44OU44Oz44Kv44OJ44Or44OV44Kj44Oz!5e0!3m2!1sja!2sjp!4v1779377618203!5m2!1sja!2sjp";

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

// 画像パス定数 - public/images/ 配下のファイルを参照
export const IMAGE_PATHS = {
  heroBackground: "/images/hero-bg.jpg",           // TODO: 要確認 - ヒーロー背景画像（差し替え用）
  heroIllustration: "/images/hero-dolphin.png",    // TODO: 要確認 - ピンクイルカ/ロゴイラスト（差し替え用）
  shopInterior1: "/images/shop-darts-corner.jpg",  // ダーツコーナー写真 → public/images/shop-darts-corner.jpg に配置
  shopInterior2: "/images/shop-bar-counter.jpg",   // バーカウンター写真 → public/images/shop-bar-counter.jpg に配置
  // スタッフ写真3枚: HEICをJPEGに変換済み（1200px・85%品質）
  staff1: "/images/IMG_7409.jpg",   // スタッフソロ写真
  staff2: "/images/IMG_7522.jpg",   // 浴衣イベント写真
  staff3: "/images/IMG_7898.jpg",   // ハロウィンイベント写真
  shopLogo: "/images/shop-logo.png",               // TODO: 要確認 - ショップロゴ（差し替え用）
} as const;

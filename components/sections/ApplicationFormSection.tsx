// ApplicationFormSection - 応募フォーム（Formspree送信・成功/失敗UI実装）
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  NEON_GLOW_ANIMATE,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import { FORMSPREE_FORM_ID } from "@/constants/shopInfo";

// Formspree送信エンドポイント
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

type FormField = "applicantName" | "phoneNumber" | "emailAddress" | "message";

type FormValues = Record<FormField, string>;

type FieldErrors = Partial<Record<FormField, string>>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM_VALUES: FormValues = {
  applicantName: "",
  phoneNumber: "",
  emailAddress: "",
  message: "",
};

function validateFormValues(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.applicantName.trim()) {
    errors.applicantName = "お名前を入力してください";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "電話番号を入力してください";
  } else if (!/^[\d\-+() ]{7,15}$/.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "正しい電話番号の形式で入力してください";
  }

  if (!values.emailAddress.trim()) {
    errors.emailAddress = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress.trim())) {
    errors.emailAddress = "正しいメールアドレスの形式で入力してください";
  }

  return errors;
}

type InputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
};

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-textSecondary mb-2"
      >
        {label}
        {required && (
          <span className="text-neonPink ml-1" aria-label="必須">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl bg-darkBase border transition-colors duration-200 text-white placeholder-textSecondary/50 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500/60 focus:ring-red-500/40 focus:border-red-500"
            : "border-darkBorder focus:ring-neonCyan/40 focus:border-neonCyan/60"
        }`}
      />
      {/* 送信失敗時: フォームを維持したままエラーメッセージをフィールド直下に表示 */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-red-400 text-xs flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationFormSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  const [formValues, setFormValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const updateField = (field: FormField) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    // フィールド編集時にそのフィールドのエラーをクリア
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateFormValues(formValues);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitStatus("submitting");
    setServerErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          お名前: formValues.applicantName,
          電話番号: formValues.phoneNumber,
          メールアドレス: formValues.emailAddress,
          メッセージ: formValues.message || "（なし）",
        }),
      });

      if (response.ok) {
        // 送信成功: フォームを非表示にして日本語の完了メッセージを表示
        setSubmitStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        const errorText =
          (data as { error?: string }).error ??
          "送信に失敗しました。しばらく経ってから再度お試しください。";
        setServerErrorMessage(errorText);
        setSubmitStatus("error");
      }
    } catch {
      setServerErrorMessage(
        "通信エラーが発生しました。インターネット接続を確認の上、再度お試しください。"
      );
      setSubmitStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="entry-form"
      className="py-24 px-4 bg-darkBase relative overflow-hidden"
      aria-labelledby="application-form-heading"
    >
      {/* 背景装飾 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,45,120,0.08) 0%, transparent 60%)",
        }}
        role="img"
        aria-label="背景装飾グラデーション"
      />

      <div className="container mx-auto max-w-2xl relative z-10">
        {/* セクションヘッダー */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-neonPink text-sm font-medium tracking-widest mb-3"
          >
            ENTRY
          </motion.p>
          <motion.h2
            id="application-form-heading"
            variants={FADE_IN_UP_VARIANTS}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            応募フォーム
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP_VARIANTS}
            className="text-textSecondary text-lg"
          >
            まずは気軽にご連絡ください。
            <br className="hidden md:block" />
            選考の詳細はご応募後にお伝えします。
          </motion.p>
        </motion.div>

        <motion.div
          variants={FADE_IN_UP_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 送信成功: フォームを非表示にして完了メッセージを表示 */}
          {submitStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={NEON_GLOW_ANIMATE.cyan}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border-2 border-neonCyan/50 bg-neonCyan/10"
              >
                ✅
              </motion.div>
              <h3 className="text-2xl font-black text-white mb-4">
                ご応募ありがとうございます！
              </h3>
              <p className="text-textSecondary leading-relaxed">
                応募内容を受け付けました。
                <br />
                担当者より3営業日以内にご連絡いたします。
                <br />
                しばらくお待ちください。
              </p>
              <p className="text-textSecondary text-sm mt-4">
                ※ 返信が届かない場合は、迷惑メールフォルダをご確認ください。
              </p>
            </motion.div>
          ) : (
            // 送信前・送信失敗時: フォームを表示
            <motion.form
              animate={NEON_GLOW_ANIMATE.pink}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-neonPink/30 bg-darkCard p-8 md:p-10 space-y-6"
              aria-label="採用応募フォーム"
            >
              <InputField
                id="applicantName"
                label="お名前"
                value={formValues.applicantName}
                onChange={updateField("applicantName")}
                error={fieldErrors.applicantName}
                required
                placeholder="山田 太郎"
              />

              <InputField
                id="phoneNumber"
                label="電話番号"
                type="tel"
                value={formValues.phoneNumber}
                onChange={updateField("phoneNumber")}
                error={fieldErrors.phoneNumber}
                required
                placeholder="090-1234-5678"
              />

              <InputField
                id="emailAddress"
                label="メールアドレス"
                type="email"
                value={formValues.emailAddress}
                onChange={updateField("emailAddress")}
                error={fieldErrors.emailAddress}
                required
                placeholder="example@email.com"
              />

              {/* メッセージ（任意） */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-textSecondary mb-2"
                >
                  メッセージ（任意）
                  <span className="text-textSecondary/50 ml-2 font-normal text-xs">
                    希望シフト・質問など、自由にどうぞ
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={(e) => updateField("message")(e.target.value)}
                  rows={4}
                  placeholder="週2〜3日希望です。ダーツ未経験ですが興味があります。"
                  className="w-full px-4 py-3 rounded-xl bg-darkBase border border-darkBorder text-white placeholder-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-neonCyan/40 focus:border-neonCyan/60 transition-colors duration-200 resize-none"
                />
              </div>

              {/* サーバーエラーメッセージ - 送信失敗時にフォーム直下に表示 */}
              {submitStatus === "error" && serverErrorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm flex items-start gap-2"
                >
                  <span aria-hidden="true" className="flex-shrink-0 mt-0.5">
                    ⚠
                  </span>
                  <p>{serverErrorMessage}</p>
                </div>
              )}

              {/* TODO: 要確認 - FORMSPREE_FORM_IDが未設定の場合の警告表示（本番環境では削除） */}
              {FORMSPREE_FORM_ID.startsWith("TODO:") && (
                <div
                  role="note"
                  className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 text-sm"
                >
                  ⚠ 開発環境: formspree.ioでフォームを作成し、
                  constants/shopInfo.ts の FORMSPREE_FORM_ID を設定してください
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="w-full py-4 rounded-xl text-white font-black text-lg relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #ff2d78 0%, #9b5de5 100%)",
                  boxShadow:
                    "0 0 20px rgba(255, 45, 120, 0.4), 0 0 40px rgba(255, 45, 120, 0.2)",
                }}
              >
                {submitStatus === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      aria-hidden="true"
                    >
                      ⟳
                    </motion.span>
                    送信中...
                  </span>
                ) : (
                  "応募する 🎯"
                )}
              </button>

              <p className="text-textSecondary text-xs text-center">
                送信された情報は採用選考のみに使用します。
                <br />
                プライバシーポリシーに同意の上、ご応募ください。
              </p>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

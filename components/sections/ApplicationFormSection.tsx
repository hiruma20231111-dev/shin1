// ApplicationFormSection - 応募フォーム（@formspree/react useFormフック使用）
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import {
  FADE_IN_UP_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  NEON_GLOW_ANIMATE,
  IN_VIEW_OPTIONS,
} from "@/constants/animations";
import { FORMSPREE_FORM_ID } from "@/constants/shopInfo";

// クライアントサイドバリデーション用のローカル状態型
// @formspree/react のサーバーサイドエラーと分離して管理する
type ClientFieldErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

type LocalFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const INITIAL_FORM_VALUES: LocalFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function validateLocalFormValues(values: LocalFormValues): ClientFieldErrors {
  const errors: ClientFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "お名前を入力してください";
  }

  if (!values.phone.trim()) {
    errors.phone = "電話番号を入力してください";
  } else if (!/^[\d\-+() ]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "正しい電話番号の形式で入力してください";
  }

  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "正しいメールアドレスの形式で入力してください";
  }

  return errors;
}

// ValidationErrorのスタイルをブランドデザインに合わせるためのラッパー
// @formspree/react の ValidationError はデフォルトでフィールドレベルのサーバーエラーを表示する
function FormspreeFieldError({
  field,
  errors,
}: {
  field: string;
  errors: Parameters<typeof ValidationError>[0]["errors"];
}) {
  return (
    <ValidationError
      field={field}
      errors={errors}
      className="mt-1.5 text-red-400 text-xs flex items-center gap-1"
    />
  );
}

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  clientError?: string;
  formspreeErrors: Parameters<typeof ValidationError>[0]["errors"];
  required?: boolean;
  placeholder?: string;
};

function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  clientError,
  formspreeErrors,
  required = false,
  placeholder,
}: InputFieldProps) {
  const hasError = !!clientError;
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
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={clientError ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl bg-darkBase border transition-colors duration-200 text-white placeholder-textSecondary/50 focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-500/60 focus:ring-red-500/40 focus:border-red-500"
            : "border-darkBorder focus:ring-neonCyan/40 focus:border-neonCyan/60"
        }`}
      />
      {/* クライアントサイドエラー: 送信前バリデーション */}
      {clientError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-red-400 text-xs flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {clientError}
        </p>
      )}
      {/* サーバーサイドエラー: @formspree/react が返す検証エラー */}
      <FormspreeFieldError field={name} errors={formspreeErrors} />
    </div>
  );
}

export default function ApplicationFormSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, IN_VIEW_OPTIONS);

  // @formspree/react: state.succeeded / state.submitting / state.errors を提供
  const [formspreeState, submitToFormspree] = useForm(FORMSPREE_FORM_ID);

  const [formValues, setFormValues] = useState<LocalFormValues>(INITIAL_FORM_VALUES);
  const [clientErrors, setClientErrors] = useState<ClientFieldErrors>({});

  const updateField =
    (field: keyof LocalFormValues) => (value: string) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
      // 入力時にそのフィールドのクライアントエラーをクリア
      if (clientErrors[field as keyof ClientFieldErrors]) {
        setClientErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof ClientFieldErrors];
          return next;
        });
      }
    };

  // クライアントバリデーションを通過した場合のみ useForm の送信ハンドラを呼ぶ
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLocalFormValues(formValues);
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    // @formspree/react に処理を委譲: HTMLフォームの name 属性でフィールドを送信
    submitToFormspree(e);
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
          {/* 送信成功: state.succeeded が true になったらフォームを非表示にして完了メッセージを表示 */}
          {formspreeState.succeeded ? (
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
            // 送信前・送信失敗時: フォームを表示したまま維持
            <motion.form
              animate={NEON_GLOW_ANIMATE.pink}
              onSubmit={handleFormSubmit}
              noValidate
              className="rounded-3xl border border-neonPink/30 bg-darkCard p-8 md:p-10 space-y-6"
              aria-label="採用応募フォーム"
            >
              <InputField
                id="applicantName"
                name="name"
                label="お名前"
                value={formValues.name}
                onChange={updateField("name")}
                clientError={clientErrors.name}
                formspreeErrors={formspreeState.errors}
                required
                placeholder="山田 太郎"
              />

              <InputField
                id="phoneNumber"
                name="phone"
                label="電話番号"
                type="tel"
                value={formValues.phone}
                onChange={updateField("phone")}
                clientError={clientErrors.phone}
                formspreeErrors={formspreeState.errors}
                required
                placeholder="090-1234-5678"
              />

              {/* email フィールド: Formspree が自動的にreply-toとして認識する name="email" を使用 */}
              <InputField
                id="emailAddress"
                name="email"
                label="メールアドレス"
                type="email"
                value={formValues.email}
                onChange={updateField("email")}
                clientError={clientErrors.email}
                formspreeErrors={formspreeState.errors}
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
                <FormspreeFieldError
                  field="message"
                  errors={formspreeState.errors}
                />
              </div>

              {/* フォームレベルのサーバーエラー（フィールド非紐付きエラー）
                  送信失敗時: フォームを維持したまま赤系エラーメッセージをフォーム直下に表示 */}
              <ValidationError
                errors={formspreeState.errors}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm"
              />

              <button
                type="submit"
                disabled={formspreeState.submitting}
                className="w-full py-4 rounded-xl text-white font-black text-lg relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #ff2d78 0%, #9b5de5 100%)",
                  boxShadow:
                    "0 0 20px rgba(255, 45, 120, 0.4), 0 0 40px rgba(255, 45, 120, 0.2)",
                }}
              >
                {formspreeState.submitting ? (
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

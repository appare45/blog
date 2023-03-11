import { useRouter } from "next/router";

const en = {
  name: "Takaharu Nakamura",
  message: "Content of inquiry",
  send: "Send",
  email: "E-mail",
  option: "(option)",
  reset: "Reset",
};
const ja = {
  name: "appare",
  message: "お問い合わせ内容",
  send: "送信",
  email: "メールアドレス",
  option: "(オプション)",
  reset: "リセット",
};

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "ja" ? ja : en;
  return { locale, t };
};

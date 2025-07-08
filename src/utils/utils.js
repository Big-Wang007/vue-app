import { loadLocaleMessages, setI18nLanguage } from "@/lang/index.js";
import dayjs from "dayjs";

export async function initI18n(I18n) {
  const lang = "zh";
  if (lang === "zh" || !I18n.global.availableLocales.includes(lang)) {
    await loadLocaleMessages(I18n, lang);
  }
  setI18nLanguage(I18n, lang);
}

// function formatDate(date) {
//   dayjs().format()
// }

// function formatTime(time) {

// }

export function formatDateTime(dt, type) {
  const formatType = {
    date: "YYYY-MM-DD",
    time: "hh:mm:ss",
    dateTime: "YYYY-MM-DD hh:mm:ss",
  };
  return dayjs(dt).format(formatType[type]);
}

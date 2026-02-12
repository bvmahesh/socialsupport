import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const btnClass = (lang) =>
    `
      px-4 py-1.5 rounded-full text-sm font-medium transition
      ${currentLang === lang
        ? "bg-white text-blue-900 shadow"
        : "text-white/80 hover:text-white hover:bg-white/10"}
    `;

  return (
    <div className="flex gap-2 bg-blue-800/40 p-1 rounded-full">
      <button
        onClick={() => changeLang("en")}
        className={btnClass("en")}
      >
        EN
      </button>

      <button
        onClick={() => changeLang("ar")}
        className={btnClass("ar")}
      >
        AR
      </button>
    </div>
  );
}

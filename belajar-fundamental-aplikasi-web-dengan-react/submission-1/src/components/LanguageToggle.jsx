import { Languages } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const LanguageToggle = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass hover:bg-white/10 transition-all duration-300"
      title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <Languages size={18} className="text-blue-400" />
      <span className="hidden sm:inline text-gray-300 uppercase font-medium">{locale}</span>
    </button>
  );
};

export default LanguageToggle;

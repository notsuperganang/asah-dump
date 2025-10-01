import { createContext, useState, useEffect, useMemo } from "react";
import id from "../utils/locales/id";
import en from "../utils/locales/en";

const LocaleContext = createContext();

const locales = {
  id,
  en,
};

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale && locales[savedLocale] ? savedLocale : "id";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === "id" ? "en" : "id"));
  };

  const contextValue = useMemo(() => ({
    locale,
    localeText: locales[locale],
    toggleLocale,
  }), [locale]);

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext, LocaleProvider };

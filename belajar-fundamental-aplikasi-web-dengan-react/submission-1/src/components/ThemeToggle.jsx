import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass hover:bg-white/10 transition-all duration-300"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <>
          <Sun size={18} className="text-yellow-400" />
          <span className="hidden sm:inline text-gray-300">Light</span>
        </>
      ) : (
        <>
          <Moon size={18} className="text-blue-400" />
          <span className="hidden sm:inline text-gray-800">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;

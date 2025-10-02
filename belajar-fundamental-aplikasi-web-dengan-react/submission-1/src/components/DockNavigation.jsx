import { Home, Archive, Plus, Languages, Moon, Sun, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { FloatingDock } from "./ui/floating-dock";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useLocale } from "../hooks/useLocale";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";

const DockNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authedUser, onLogout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, localeText } = useLocale();
  const themeButtonRef = useRef(null);

  const handleThemeToggle = useCallback(async (e) => {
    e.preventDefault();

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // Get the icon element (the actual svg/icon, not the anchor wrapper)
    const iconElement = e.currentTarget.querySelector("svg") || e.currentTarget;
    const { top, left, width, height } = iconElement.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [toggleTheme]);

  const handleLanguageToggle = (e) => {
    e.preventDefault();
    toggleLocale();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
    navigate("/login");
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  if (!authedUser) {
    return null;
  }

  const links = [
    {
      title: localeText.nav.tooltips.notes,
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/"),
    },
    {
      title: localeText.nav.tooltips.archive,
      icon: (
        <Archive className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/archive"),
    },
    {
      title: localeText.nav.tooltips.addNote,
      icon: (
        <Plus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/notes/new"),
    },
    {
      title: localeText.nav.tooltips.language,
      icon: (
        <Languages className="h-full w-full text-blue-500 dark:text-blue-400" />
      ),
      href: "#",
      onClick: handleLanguageToggle,
    },
    {
      title: theme === "dark" ? localeText.nav.tooltips.lightMode : localeText.nav.tooltips.darkMode,
      icon: theme === "dark" ? (
        <Sun className="h-full w-full text-yellow-500 dark:text-yellow-400" />
      ) : (
        <Moon className="h-full w-full text-blue-600 dark:text-blue-400" />
      ),
      href: "#",
      onClick: handleThemeToggle,
    },
    {
      title: authedUser.name,
      icon: (
        <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50" style={{ pointerEvents: "auto" }}>
      <FloatingDock items={links} />
    </div>
  );
};

export default DockNavigation;

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
  const { locale, toggleLocale } = useLocale();
  const themeButtonRef = useRef(null);

  const handleThemeToggle = useCallback(async (e) => {
    e.preventDefault();

    const button = e.currentTarget;

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    }).ready;

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
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
      title: "Notes",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/"),
    },
    {
      title: "Archive",
      icon: (
        <Archive className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/archive"),
    },
    {
      title: "Add Note",
      icon: (
        <Plus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: handleNavigation("/notes/new"),
    },
    {
      title: `Language: ${locale.toUpperCase()}`,
      icon: (
        <Languages className="h-full w-full text-blue-500 dark:text-blue-400" />
      ),
      href: "#",
      onClick: handleLanguageToggle,
    },
    {
      title: theme === "dark" ? "Light Mode" : "Dark Mode",
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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
};

export default DockNavigation;

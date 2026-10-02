"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentTheme = resolvedTheme || theme;
    const isDark = currentTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${rect.left + rect.width / 2}px`;
    const y = `${rect.top + rect.height / 2}px`;
    document.documentElement.style.setProperty("--click-x", x);
    document.documentElement.style.setProperty("--click-y", y);

    if (!(document as any).startViewTransition) {
      setTheme(newTheme);
      return;
    }

    (document as any).startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20" />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 transition-all duration-300 backdrop-blur-md shadow-sm hover:scale-105 active:scale-95 cursor-pointer relative"
      onClick={toggleTheme}
      title="Toggle Dark/Light Mode"
      aria-label="Toggle dark/light mode"
    >
      <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]" />
      <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-200 drop-shadow-[0_0_8px_rgba(203,213,225,0.4)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}


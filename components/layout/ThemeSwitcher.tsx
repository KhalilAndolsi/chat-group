"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button className="p-2" onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}>
      <Moon size={16} className="dark:hidden block" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  );
}

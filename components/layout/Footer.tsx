import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Footer() {
  return (
    <footer className="p-2 flex items-end lg:items-center justify-between ">
      <p className="text-xs text-center lg:text-start">
        © copyrights 2025 | developed by{" "}
        <a href="https://github.com/KhalilAndolsi" className="font-medium">
          Khalil Andolsi
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}

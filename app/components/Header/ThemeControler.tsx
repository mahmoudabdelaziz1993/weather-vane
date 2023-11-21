"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

export default function ThemeControler() {
  const theme_list = ["winter", "dark", "retro", "cyberpunk", "halloween", "forest", "aqua", "dracula", "coffee"];
  
  const cookies = useCookies();
  const [theme, setTheme] = useState(cookies.get("Vane-Theme") ?? theme_list[0]);

  function toggleTheme(theme: string): void {
    setTheme(theme);
    cookies.set("Vane-Theme", theme);
  }

  useEffect(() => {
    if (document) {
      const html = document.querySelector("html");
      const dropdown = document.getElementById("themeDropdwon");
      if (html && dropdown) {
        html.setAttribute("data-theme", theme);
        dropdown.removeAttribute("open");
      }
    }
  }, [theme]);

  return (
    <details id="themeDropdwon" className={`dropdown dropdown-end capitalize`}>
      <summary className="btn gap-2 btn-primary btn-outline">
        {theme}
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </summary>
      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-auto grid gap-2">
        {theme_list.map((themeVal: string, i: number) => (
          <li key={themeVal}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block  justify-start capitalize"
              aria-label={themeVal}
              value={themeVal}
              onChange={()=>toggleTheme(themeVal)}
            />
          </li>
        ))}
      </ul>
    </details>
  );
}

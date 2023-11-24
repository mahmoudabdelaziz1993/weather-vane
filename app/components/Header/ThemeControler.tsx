"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

export default function ThemeControler() {
  const theme_list = ["winter", "dark", "retro", "cyberpunk", "halloween", "forest", "aqua", "dracula", "coffee"];

  const cookies = useCookies();
  const [theme, setTheme] = useState(cookies.get("Vane-Theme") || theme_list[0]);

  function toggleTheme(theme: string): void {
    setTheme(theme);
    cookies.set("Vane-Theme", theme);
  }

  useEffect(
    () => {
      if (document) {
        const html = document.querySelector("html");
        const dropdown = document.getElementById("themeDropdwon");
        if (html && dropdown) {
          html.setAttribute("data-theme", theme);
          dropdown.removeAttribute("open");
        }
      }
    },
    [theme]
  );

  return (
    <details id="themeDropdwon" className={`dropdown dropdown-end capitalize`}>
      <summary className="btn gap-2 btn-link">
        {/* swatch icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
          />
        </svg>
        {/* arrow down icon */}
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
      <ul tabIndex={0} className="dropdown-content z-[1050] p-2 shadow-2xl bg-base-100 rounded-box w-auto grid gap-2">
        {theme_list.map((themeVal: string, i: number) => (
          <li key={themeVal}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block  justify-start capitalize"
              aria-label={themeVal}
              value={themeVal}
              onChange={() => toggleTheme(themeVal)}
            />
          </li>
        ))}
      </ul>
    </details>
  );
}

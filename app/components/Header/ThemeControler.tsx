"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export default function ThemeControler({  }: Props) {
  const theme_list = ["cupcake", "dark", "retro", "cyberpunk", "halloween", "forest", "aqua", "dracula", "coffee"];
  const [theme, setTheme] = useState(theme_list[0]);
  function toggleTheme(e: any): void {
    setTheme(e.target.value);
  }
  const themeDropdown = useRef<HTMLDetailsElement>(null);
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(
    () => {
      if (document) {
        const html = document.querySelector("html");
        const dropdwon = document.getElementById('themeDropdwon')
        if (html && dropdwon) {
          html.setAttribute("data-theme", theme);
          dropdwon.removeAttribute('open');
          console.log(dropdwon);
        }
      }
    },
    [theme]
  );
  return (
    <details id="themeDropdwon" className={`dropdown dropdown-end `}>
      <summary className="btn m-1" >
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
              className="theme-controller btn btn-sm btn-block  justify-start"
              aria-label={themeVal}
              value={themeVal}
              onChange={toggleTheme}
            />
          </li>
        ))}
      </ul>
    </details>
  );
}

"use client";
import React, { useEffect, useState } from "react";

type Props = {};

export default function ThemeControler({  }: Props) {
  const [theme, setTheme] = useState("light");
  const theme_list = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset"
  ];
  function toggleTheme(e: any): void {
    setTheme(e.target.value);
  }

  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(
    () => {
      if (document) {
        const html = document.querySelector("html");
        if (html) {
          html.setAttribute("data-theme", theme);
        }
      }
    },
    [theme]
  );
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1" onChange={toggleTheme}>
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-auto">
        {theme_list.map((themeVal: string,i: number) => (
          <li key={themeVal}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={themeVal}
              value={themeVal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

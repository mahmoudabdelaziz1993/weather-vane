"use client";
import { useState, useEffect } from "react";
import { useCombobox } from "downshift";

export default function CityAutocomplete() {
  const [inputItems, setInputItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      inputValue && setInputValue(inputValue);
    }
  });

  useEffect(
    () => {
      setIsLoading(true); // Set loading state to true
      if (inputValue.length > 2) {
        fetch(`https://geocode.maps.co/search?q=${inputValue}`)
          .then(response => response.json())
          .then(data => {
            setInputItems(data.map((result: any) => result.display_name));
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after the fetch is complete
          });
      }
    },
    [inputValue]
  );

  return (
    <div className="w-full max-w-xs mx-auto  ">
      <div className="prose prose-lg">
        <label className="label">
          <span className="flex gap-2 items-center">
            {" "}
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
                d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
              />
            </svg>
            What is your (country/city) ?
          </span>
        </label>
        <input
          {...getInputProps()}
          type="text"
          placeholder="Type your city here"
          className="input input-bordered input-primary bg-base-200 w-full max-w-xs"
        />
      </div>
      {isOpen && (
        <ul
          {...getMenuProps({}, { suppressRefError: true })}
          className=" mt-2 menu bg-base-300 w-full max-w-xs  max-h-40 overflow-hidden overflow-y-auto flex-nowrap rounded-box gap-2 p-2 "
        >
          {isLoading && (
            <li>
              <a>
                <span className="loading loading-dots loading-md text-primary" />
              </a>
            </li>
          )}
          {inputItems.length > 0 &&
            !isLoading &&
            inputItems.map((item, index) => (
              <li key={`${item}${index}`} {...getItemProps({ item, index })}>
                <a className={`${highlightedIndex === index ? "active" : ""}`}> {item}</a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

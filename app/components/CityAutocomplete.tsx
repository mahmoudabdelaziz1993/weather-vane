"use client";
import { useState, useEffect } from "react";
import { useCombobox } from "downshift";

export default function CityAutocomplete() {
  const [inputItems, setInputItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      inputValue && setInputValue(inputValue);
    }
  });

  useEffect(
    () => {
      if (inputValue.length > 2) {
        fetch(`https://geocode.maps.co/search?q=${inputValue}`)
          .then(response => response.json())
          .then(data => {
            setInputItems(data.map((result: any) => result.display_name));
          });
      }
    },
    [inputValue]
  );

  return (
    <div className="w-full max-w-xs mx-auto">
      <input
        {...getInputProps()}
        type="text"
        placeholder="Type your city here"
        className="input input-bordered input-primary w-full max-w-xs"
      />

      {isOpen && (
        <ul
          {...getMenuProps({}, { suppressRefError: true })}
          className="absolute mt-2 menu bg-base-200 w-full max-w-xs  max-h-40 overflow-hidden overflow-y-auto flex-nowrap rounded-box gap-2 py-2"
        >
          {inputItems.map((item, index) => (
            <li key={`${item}${index}`} {...getItemProps({ item, index })}>
              <a className={`${highlightedIndex === index ? "active" : ""}`}> {item}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

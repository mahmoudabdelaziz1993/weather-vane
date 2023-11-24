"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCombobox } from "downshift";
import { Place } from "@/Types";
import { debounce } from "lodash";
import { useCookies } from "next-client-cookies";
type Props = { selectedItems: Place[]; setSelectedItems: React.Dispatch<React.SetStateAction<Place[]>> };
export default function CityAutocomplete({ selectedItems, setSelectedItems }: Props) {
  const [inputItems, setInputItems] = useState<Place[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedItems, setSelectedItems] = useState<Place[]>([]);
  // const cookies = useCookies();

  // Create debounced function outside of your event handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetInputValue = useCallback(debounce(value => setInputValue(value), 500), []);
  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
    items: inputItems,
    itemToString: item => (item ? item.display_name : ""),
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        debouncedSetInputValue(inputValue);
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem && !selectedItems.some(item => item.place_id === selectedItem.place_id)) {
        setSelectedItems(prev => [...prev, selectedItem]);
      }
    }
  });
  // Declare and initialize the ref variable
  const ref = useRef<HTMLUListElement>(null);

  useEffect(
    () => {
      setIsLoading(true); // Set loading state to true
      if (inputValue.length > 2) {
        fetch(`https://geocode.maps.co/search?q=${inputValue}`)
          .then(response => response.json())
          .then((data: Place[]) => {
            setInputItems(data.map(result => result));
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setIsLoading(false); // Set loading state to false after the fetch is complete
          });
      }
    },
    [inputValue]
  );
  // useEffect(
  //   () => {
  //     console.log("selectedItem", selectedItems);
  //     cookies.set("selectedItems", JSON.stringify(selectedItems), { path: "/" });
  //   },
  //   [selectedItems, cookies]
  // );
  return (
    <div className="absolute top-4 w-full md:max-w-xs max-w-[280px] p-2 h-max z-10 card  backdrop-blur-lg m-2">
      <div className="prose md:prose-lg prose-base text-base-content   ">
        <label className="label" htmlFor="place">
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
            What is your (government/city) ?
          </span>
        </label>
        <input
          {...getInputProps({})}
          type="text"
          id="place"
          placeholder="Type your city here"
          className="input input-bordered input-primary bg-base-200 text-base-content w-full max-w-xs"
        />
      </div>
      {isOpen && (
        <ul
          {...getMenuProps({ ref }, { suppressRefError: true })}
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
              <li {...getItemProps({ item, index })} key={`${item.place_id}`}>
                <a className={`${highlightedIndex === index ? "active" : ""}`}> {item.display_name}</a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

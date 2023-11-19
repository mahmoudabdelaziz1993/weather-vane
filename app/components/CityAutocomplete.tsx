'use client'
import { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';

export default function CityAutocomplete() {
  const [inputItems, setInputItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
        inputValue && setInputValue(inputValue);
    },
  });

  useEffect(() => {
    if (inputValue.length > 2) {
      fetch(`https://geocode.maps.co/search?q=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          setInputItems(data.map((result:any) => result.display_name));
        });
    }
  }, [inputValue]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <input {...getInputProps()} className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline" />
      {isOpen && (
        <ul {...getMenuProps()} className="absolute mt-1 w-full bg-white rounded-md shadow-lg">
          {inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              className="relative p-2 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

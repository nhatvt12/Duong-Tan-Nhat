import React, { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface OptionProps {
  value: string;
  label: string;
  price: number;
  icon?: ReactNode;
}

interface SelectProps {
  options: OptionProps[];
  value: OptionProps;
  onChange: (value: OptionProps) => void;
  placeholder?: string;
  defaultValue?: OptionProps;
}

const SelectCustom: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const [isDisplayImg, setIsDisplayImg] = useState(true)

  const URL_TOKEN_IMAGE = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/"

  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (defaultValue && !value.value) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.offsetHeight || 0;

      setDropdownStyle({
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY,
        width: rect.width,
        maxHeight: dropdownHeight,
      });
    }
  }, [isOpen]);

  const dropdown = isOpen && (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-2 bg-gray-900 bg-opacity-80 backdrop-blur-md border border-gray-700 border-opacity-30 rounded-lg shadow-lg max-h-64 overflow-hidden"
      style={dropdownStyle}
    >
      <div className="overflow-y-auto max-h-48">
        {options.length === 0 && (
          <div className="p-2 text-sm text-gray-300">No results found</div>
        )}
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
            className={`px-4 py-2 flex items-center space-x-2 text-sm cursor-pointer transition-all duration-300 hover:bg-red-400 hover:bg-opacity-90 hover:text-gray-200 ${value.value === option.value
              ? "font-bold text-gray-200 bg-red-600"
              : "text-gray-400"
              }`}
          >
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={selectRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-themeForm backdrop-blur-md border border-gray-700 border-opacity-30 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer shadow-lg hover:bg-gray-900 hover:bg-opacity-80 transition-all duration-300 min-w-36"
      >
        <div className="flex items-center space-x-2">
          {value.value && (
            <img
              src = {URL_TOKEN_IMAGE + `${value.value}.svg`}
              alt="Token Icon"
              className= {`w-8 h-8 ${isDisplayImg ? "visible" : "hidden"}`}
              onError={() => setIsDisplayImg(false)}
              onLoad={() => setIsDisplayImg(true)}
            />)}
          <span className="text-base font-medium text-gray-200">
            {value.value
              ? options.find((opt) => opt.value === value.value)?.label
              : placeholder || "Select"}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </div>

      {isOpen && createPortal(dropdown, document.body)}
    </div>
  )
};

export default SelectCustom;

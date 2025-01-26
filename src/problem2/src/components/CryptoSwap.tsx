import React, { useEffect, useState } from "react";
import SwapSection from "./SwapSection";
import { fetchCryptoPrice } from "../services/api";
import { OptionProps } from "./SelectCustom";


const CryptoSwap: React.FC = () => {

  const [options, setOptions] = useState<OptionProps[]>([]);
  const [selectedFromOption, setSelectedFromOption] = useState<OptionProps>({
    label: "",
    value: "",
    price: 0,
  });
  const [selectedToOption, setSelectedToOption] = useState<OptionProps>({
    label: "",
    value: "",
    price: 0,
  });
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && selectedFromOption.price && selectedToOption.price) {
      const output = (amount * selectedFromOption.price) / selectedToOption.price;
      setToAmount(output.toFixed(4));
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setToAmount(value);

    const amount = parseFloat(value);
    if (!isNaN(amount) && selectedFromOption.price && selectedToOption.price) {
      const output = (amount * selectedToOption.price) / selectedFromOption.price;
      setFromAmount(output.toFixed(4));
    } else {
      setFromAmount('');
    }
  };

  const handleSwapTokens = () => {
    setSelectedFromOption(selectedToOption);
    setSelectedToOption(selectedFromOption);

    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };
  useEffect(() => {
    if (fromAmount && selectedFromOption.price && selectedToOption.price) {
      const amount = parseFloat(fromAmount);
      const output = (amount * selectedFromOption.price) / selectedToOption.price;
      setToAmount(output.toFixed(4));
    }
  }, [selectedFromOption, selectedToOption]);



  useEffect(() => {
    const apiFetchCrypto = async () => {
      try {
        const data = await fetchCryptoPrice();
        setOptions(data)
        setSelectedFromOption(data[0]);
        setSelectedToOption(data[1])
      } catch (error) {
        console.log('error', error)
      }
    };

    apiFetchCrypto();
  }, []);

  return (
    <div className="bg-themeForm rounded-lg shadow-lg p-6 max-w-md w-full relative">
      <SwapSection
        selectedOption={selectedFromOption}
        onOptionChange={setSelectedFromOption}
        options={options}
        defaultValue={options[0]}
        placeholder="0.00"
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
      />
      <div className="flex items-center justify-center absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          type="button"
          className="w-16 h-16 rounded-full shadow-lg bg-themeForm flex items-center justify-center"
          onClick={handleSwapTokens}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4498 6.71997L6.72974 3L3.00977 6.71997"
              stroke="#717A8C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.72949 21L6.72949 3"
              stroke="#717A8C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5498 17.28L17.2698 21L20.9898 17.28"
              stroke="#717A8C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.2695 3V21"
              stroke="#717A8C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <SwapSection
        selectedOption={selectedToOption}
        onOptionChange={setSelectedToOption}
        options={options}
        defaultValue={options[0]}
        placeholder="0.00"
        readOnly
        amount={toAmount}
        onAmountChange={handleToAmountChange}
      />
    </div>

  );
};

export default CryptoSwap;

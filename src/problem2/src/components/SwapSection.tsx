import React from 'react'
import SelectCustom, { OptionProps } from './SelectCustom';

interface SwapSectionProps {
  options: OptionProps[]
  defaultValue?: OptionProps;
  onOptionChange: (option: OptionProps) => void;
  selectedOption: OptionProps;
  amount: string;
  onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  readOnly?: boolean;
}

const SwapSection: React.FC<SwapSectionProps> = ({
  options,
  defaultValue,
  onOptionChange,
  selectedOption,
  amount,
  onAmountChange,
  placeholder,
  readOnly
}) => {
  return (
    <div className="relative mb-6 bg-themeSection shadow-lg p-6 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SelectCustom
            options={options}
            value={selectedOption}
            onChange={onOptionChange}
            placeholder="Choose an option"
            defaultValue={defaultValue} />
        </div>
        <input
          type="number"
          lang="en"
          value={amount}
          onChange={onAmountChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className='font-mono text-xl bg-transparent outline-none placeholder-gray-400 text-right'
        />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="font-mono text-textTheme">
          Balance: <span className="text-base text-textTheme">{selectedOption.price}</span>
        </h3>
        <h3 className="font-mono text-textTheme text-base ">≈$ {selectedOption?.price?.toFixed(2) || 0.0}</h3>
      </div>
    </div>

  )
};
export default SwapSection;


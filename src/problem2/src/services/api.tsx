import axios from "axios";
import { OptionProps } from "../components/SelectCustom";

interface CurrencyData {
  currency: string;
  price: number;
}

export const fetchCryptoPrice = async (): Promise<OptionProps[]> => {
  try {
    const response = await axios.get<CurrencyData[]>(
      "https://interview.switcheo.com/prices.json"
    );
    return response.data.filter(token => token?.currency != "BUSD").map((token) => ({
      value: token.currency,
      label: token.currency.toUpperCase(),
      price: token.price,
    }));
  } catch (error) {
    throw new Error("Get prices wrong !");
  }
};
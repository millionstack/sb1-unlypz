import React, { createContext, useContext, useState } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

interface CurrencyContextType {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertToUSD: (amount: number) => number;
  convertFromUSD: (amount: number) => number;
}

const defaultCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 3.75 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 4.73 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 279.50 },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrencies[0]);

  const convertToUSD = (amount: number) => amount / selectedCurrency.rate;
  const convertFromUSD = (amount: number) => amount * selectedCurrency.rate;

  return (
    <CurrencyContext.Provider value={{
      currencies: defaultCurrencies,
      selectedCurrency,
      setSelectedCurrency,
      convertToUSD,
      convertFromUSD,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Globe } from 'lucide-react';

export function CurrencySelector() {
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-gray-400" />
      <select
        value={selectedCurrency.code}
        onChange={(e) => {
          const currency = currencies.find(c => c.code === e.target.value);
          if (currency) setSelectedCurrency(currency);
        }}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
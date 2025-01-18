import { useState, useEffect } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [currencyBefore, setCurrencyBefore] = useState("");

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [multiplier, setMultiplier] = useState("");

  useEffect(() => {
    const getMultiplier = async () => {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${currencyBefore}&from=${currencyFrom}&to=${currencyTo}`);
      const data = await res.json();
      setMultiplier(data.rates[currencyFrom]);
    }
    getMultiplier();
  }, [currencyBefore, currencyFrom, currencyTo])

  return (
    <div>
      <input
        type="number"
        value={currencyBefore}
        onChange={(e) => setCurrencyBefore(e.target.value)}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{multiplier}</p>
    </div>
  );
}
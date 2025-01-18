import { useState, useEffect } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [currencyBefore, setCurrencyBefore] = useState(100);
  const [currencyAfter, setCurrencyAfter] = useState(null);

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getMultiplier = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currencyBefore}&from=${currencyFrom}&to=${currencyTo}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setCurrencyAfter(Number(data.rates[currencyTo]).toFixed(2));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (currencyBefore > 0) {
      getMultiplier();
    } else {
      setCurrencyAfter(0);
    }

    return () => {
      controller.abort();
    }
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
      <p>
        {isLoading && "loading"}  {/* loading */}
        {error}   {/* error */}
        {!isLoading && !error && currencyAfter}   {/* success */}
      </p>
    </div>
  );
}
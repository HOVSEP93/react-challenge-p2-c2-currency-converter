import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("TRY");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState("true");

  useEffect(
    function () {
      async function fetchCurr() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
          );

          if (!res.ok) {
            throw new Error(`Can't fetch data currency 😕 💰`);
          }
          const data = await res.json();

          setConverted(data.rates[toCurr]);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
        }
      }

      if (fromCurr === toCurr) return setConverted(amount);

      fetchCurr();
    },
    [amount, fromCurr, toCurr]
  );

  /**
   * The function `handleAmountChange` updates the `amount` state variable with the value from an input
   * field, as long as the value is not zero.
   * By implementing this function, users are prevented from entering zero as the amount, ensuring that valid non-zero values are set and used in the currency conversion calculations.
   */
  const handleAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value !== 0) {
      setAmount(value);
    }
  };

  return (
    <>
      <div className=" prose my-10  flex flex-col items-center">
        <h1 className="text-4xl mb-6">Currency Converted</h1>
        <input
          type="text"
          className="input input-bordered input-info  max-w-xs"
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="flex flex-row space-x-4 my-4">
          <select
            className="select select-success  max-w-xs"
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
            <option value="TRY">TRY</option>
          </select>
          <select
            className="select select-secondary max-w-xs"
            value={toCurr}
            onChange={(e) => setToCurr(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        {isLoading ? (
          <span className="loading loading-spinner text-error"></span>
        ) : (
          <p className="text-3xl mt-4">
            {converted} {toCurr}
          </p>
        )}
      </div>
    </>
  );
}

import {  useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState("");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState("");
    const [search, setSearch] = useState("");

    useEffect(()=>{
      fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
    },[])

    const handleCoinSelect = (event) => {
        setSelectedCoin(event.target.value);
        setResult("");
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        setResult("");
    };

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const calculateCoins = () => {
        if (selectedCoin && amount) {
            const selected = coins.find((coin) => coin.id === selectedCoin);
            if (selected) {
                const coinCount = amount / selected.quotes.USD.price;
                setResult(`You can buy ${coinCount.toFixed(6)} ${selected.symbol}`);
            }
        }
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Search coins..."
                        value={search}
                        onChange={handleSearch}
                    />
                    <br />
                    <select onChange={handleCoinSelect} value={selectedCoin}>
                        <option value="">Select a coin</option>
                        {filteredCoins.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                    <br />
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter USD amount"
                    />
                    <button onClick={calculateCoins}>Calculate</button>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default App;

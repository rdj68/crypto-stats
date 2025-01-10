import axios from 'axios';

// Fetch crypto prices from CoinGecko API
const fetchCryptoPrices = async (coins) => {
  const apiUrl = process.env.COIN_GECKO_API_URL || 'https://api.coingecko.com/api/v3/simple/price';

  try {
    const { data } = await axios.get(apiUrl, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error fetching data from CoinGecko: ' + error.message);
  }
};

// Map the fetched crypto data into a format { coin, price, marketCap, change24h }
const mapCryptoData = (coins, data) => {
  return coins.map(coin => ({
    coin,
    price: data[coin]?.usd || 0,
    marketCap: data[coin]?.usd_market_cap || 0,
    change24h: data[coin]?.usd_24h_change || 0,
  }));
};

export { fetchCryptoPrices, mapCryptoData };

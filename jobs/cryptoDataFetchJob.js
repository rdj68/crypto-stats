import axios from 'axios';
import CryptoData from '../models/cryptoData.js';

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

// Map the fetched crypto data into a suitable format for saving
const mapCryptoData = (coins, data) => {
  return coins.map(coin => ({
    coin,
    price: data[coin]?.usd || 0,
    marketCap: data[coin]?.usd_market_cap || 0,
    change24h: data[coin]?.usd_24h_change || 0,
  }));
};

// Function to save the mapped crypto data to the database
const saveCryptoData = async (cryptoData) => {
  try {
    for (const record of cryptoData) {
      const cryptoRecord = new CryptoData(record);
      await cryptoRecord.save();
    }
    console.log('Crypto data updated successfully.');
  } catch (error) {
    console.error('Error saving crypto data:', error.message);
    throw new Error('Error saving crypto data');
  }
};

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    const data = await fetchCryptoPrices(coins);
    const mappedData = mapCryptoData(coins, data);
    await saveCryptoData(mappedData);
  } catch (error) {
    console.error('Error fetching and saving crypto data:', error.message);
  }
};

export default fetchCryptoData;

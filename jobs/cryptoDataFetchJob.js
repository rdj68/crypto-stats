'use strict'
import CryptoData from '../models/cryptoData.js';
import { fetchCryptoPrices, mapCryptoData } from '../utils/cryptoUtils.js';

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

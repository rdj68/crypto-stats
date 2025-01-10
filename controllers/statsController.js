import { fetchCryptoPrices, mapCryptoData } from '../utils/cryptoUtils.js';

export const getCryptoStats = async (req, reply) => {
  const { coin } = req.query;

  if (!coin) {
    return reply.status(400).send({ error: 'Coin parameter is required' });
  }

  try {
    // Fetch data from CoinGecko API instead of the database
    const cryptoData = await fetchCryptoPrices([coin]);

    if (!cryptoData || !cryptoData[coin]) {
      return reply.status(404).send({ error: `No data found for ${coin}` });
    }

    const {  price, marketCap, change24h } = mapCryptoData([coin], cryptoData)[0];
    console.log({ price, marketCap, change24h})

    reply.send({
      price: price,
      marketCap: marketCap,
      '24hChange': change24h,
    });
  } catch (error) {
    reply.status(500).send({ error: 'Server error', details: error.message });
  }
};

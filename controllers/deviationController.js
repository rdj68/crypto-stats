import CryptoData from '../models/cryptoData.js';
import { calculateStandardDeviation } from '../utils/mathUtils.js';

export const getCryptoDeviation = async (req, reply) => {
  const { coin } = req.query;

  if (!coin) {
    return reply.status(400).send({ error: 'Coin parameter is required' });
  }

  try {
    const records = await CryptoData.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (!records.length) {
      return reply.status(404).send({ error: `No data found for ${coin}` });
    }

    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    reply.send({ deviation: deviation.toFixed(2) });
  } catch (error) {
    reply.status(500).send({ error: 'Server error', details: error.message });
  }
};

import cron from 'node-cron';
import fetchCryptoData from './cryptoDataFetchJob.js'

const registerJobs = () => {
  // Job to fetch crypto data every 2 hours
  cron.schedule('0 */2 * * *', async () => {
    console.log('Running crypto data fetch job...');
    await fetchCryptoData();
  });

  console.log('All background jobs registered successfully.');
};

export default registerJobs;

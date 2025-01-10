import { configDotenv } from 'dotenv';
import Fastify from 'fastify';
import connectDB from './config/db.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import hello from './routes/hello.js';
import logger from './plugin/logger.js';
import registerJobs from './jobs/index.js';

const fastify = Fastify({
  logger: true,
});

// Load environment variables
configDotenv();

// Connect to database
connectDB();

// Register jobs
registerJobs()

// Register plugins
fastify.register(logger)

// Register routes
fastify.register(hello)
fastify.register(cryptoRoutes)

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});

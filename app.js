import { configDotenv } from 'dotenv';
import Fastify from 'fastify';
import connectDB from './config/db.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import hello from './routes/hello.js';
import logger from './plugin/logger.js';
import registerJobs from './jobs/index.js';
import fastifyCors from '@fastify/cors'; // Import the CORS plugin

const fastify = Fastify({
  logger: true,
});

// Load environment variables
configDotenv();

// Get the port from environment variables or default to 8080
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Register jobs
registerJobs();

// Register plugins
fastify.register(logger);
fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST'],
});

// Register routes
fastify.register(hello);
fastify.register(cryptoRoutes);

// Start the server
fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});

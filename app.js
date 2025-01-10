import Fastify from 'fastify';
import hello from './routes/hello.js';
import logger from './plugin/logger.js';
import { configDotenv } from 'dotenv';

const fastify = Fastify({
  logger: true,
});

// Load environment variables
configDotenv();

// Register plugins
fastify.register(logger)

// Register routes
fastify.register(hello)

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});

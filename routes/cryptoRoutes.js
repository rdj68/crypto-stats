import { getCryptoStats } from '../controllers/statsController.js';
import { getCryptoDeviation } from '../controllers/deviationController.js';

/**
 * Defines routes related to cryptocurrency operations.
 * @param {FastifyInstance} fastify - Fastify instance for route registration.
 * @param {Object} options - Options passed during route registration.
 */
async function cryptoRoutes(fastify, options) {
  // Route to fetch the latest cryptocurrency stats
  fastify.route({
    method: 'GET',
    url: '/stats',
    schema: {
      querystring: {
        type: 'object',
        required: ['coin'],
        properties: {
          coin: { type: 'string', enum: ['bitcoin', 'matic-network', 'ethereum'] },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            price: { type: 'number' },
            marketCap: { type: 'number' },
            '24hChange': { type: 'number' },
          },
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: getCryptoStats,
  });

  // Route to calculate the standard deviation of cryptocurrency prices
  fastify.route({
    method: 'GET',
    url: '/deviation',
    schema: {
      querystring: {
        type: 'object',
        required: ['coin'],
        properties: {
          coin: { type: 'string', enum: ['bitcoin', 'matic-network', 'ethereum'] },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            deviation: { type: 'number' },
          },
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: getCryptoDeviation,
  });
}

export default cryptoRoutes;

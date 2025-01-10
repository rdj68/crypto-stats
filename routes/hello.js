'use strict'
export default async function (fastify, options) {
  fastify.get('/hello', async (request, reply) => {
    return { message: 'Hello from the crypto-stats team i.e. a single person' };
  });
}

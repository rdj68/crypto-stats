import { join } from 'path';

export default async function indexRoute(fastify, options) {
  fastify.get('/', async (request, reply) => {
    // Serve the HTML file as the response for the root route
    return reply.sendFile('index.html'); // Ensure this file exists in the 'public' folder
  });
}

'use strict'
export default async function (fastify, options) {
  fastify.addHook('onRequest', (request, reply, done) => {
    console.log('Incoming request:', request.url);
    done();
  });
}

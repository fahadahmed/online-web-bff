import fastify from 'fastify';
import apolloServer from './server';
import mockDownstreamServer from './mocks/server';

const app = fastify();

if (process.env.NODE_ENV !== 'production') {
  // This should only run on local server
  console.log('Mock Service Worker (MSW) Started.');
  mockDownstreamServer.listen();
}

apolloServer
  .start()
  .then(async () => {
    app.register(apolloServer.createHandler({ cors: { origin: '*' } }));
    await app.listen(process.env.PORT || 3001, '0.0.0.0');
    console.log('Server Started:', app.server.address());
  })
  .catch((e) => {
    console.error(e);
  });

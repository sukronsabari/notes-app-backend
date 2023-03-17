const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  // membuat server
  const server = Hapi.server({
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    port: 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // routing
  server.route(routes);

  // listen server (menjalankan server)
  await server.start();
  console.log(`Server listen on ${server.info.uri}`);
};

init();

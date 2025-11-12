const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce REST API',
    description: 'Auto-generated Swagger documentation'
  },
  host: 'localhost:4000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer token authentication'
    }
  },
  security: [{ bearerAuth: [] }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; // 👈 main file that loads routes

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js'); // run your app after generating swagger-output.json
});

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts project — CRUD API for a contacts collection.'
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: ['http', 'https'],
  basePath: ''
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

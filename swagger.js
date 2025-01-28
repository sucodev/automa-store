import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Automa Store API',
      version: '1.0.0',
      description: 'API documentation for Automa Store application',
    },
    contact: {
      name: 'Marcos Del Valle',
      url: 'https://github.com/sucodev',
      email: 'mdvconsul@gmail.com',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

import * as swaggerJsdoc from "swagger-jsdoc";

const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Minha API TypeScript",
         version: "1.0.0",
         description: "Documentação da API TypeScript com Swagger",
      },
   },
   apis: ["./src/routes/*.ts"], // Aqui você pode incluir todos os arquivos de rotas necessários
};

export default swaggerJsdoc(options);

import express, { NextFunction, Request, Response } from "express";
import AppError from "./shared/errors/AppErrors";
import { isCelebrateError } from "celebrate";
import routes from "./routes/index.routes";
import { serve, setup } from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", serve, setup(swaggerDocs));

app.use(routes);

app.use(
   (error: Error, request: Request, response: Response, _: NextFunction) => {
      console.log(error);

      if (error instanceof AppError) {
         return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
         });
      }

      if (isCelebrateError(error)) {
         console.log("entrou");
         const labelErrors: String[] = [];

         error.details.forEach((detail) => {
            detail.details.forEach((errors) => {
               errors.context?.label && labelErrors.push(errors.context.label);
            });
         });

         return response.status(400).json({
            status: "error",
            message: `Incorrect parameters: ${labelErrors.join(", ")}`,
         });
      }

      return response.status(500).json({
         status: "error",
         message: "Internal Server Error",
      });
   }
);

export default app;

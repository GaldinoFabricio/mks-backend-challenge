import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { UserController } from "../database/controller/UserController";
import { MovieController } from "../database/controller/MovieController";

const authenticateRoutes = Router();
const userController = new UserController();
const movieController = new MovieController();

authenticateRoutes.post(
   "/login",
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.number().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   userController.authenticate
);

authenticateRoutes.post(
   "/create",
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.number().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   userController.create
);

authenticateRoutes.get(
   "/movie/:movie_id",
   celebrate(
      {
         [Segments.PARAMS]: Joi.object().keys({
            movie_id: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   movieController.findById
);

authenticateRoutes.get("/movie/", movieController.findAll);

export { authenticateRoutes };

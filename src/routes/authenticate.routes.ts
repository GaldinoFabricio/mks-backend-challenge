import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { UserController } from "../controller/UserController";
import { MovieController } from "../controller/MovieController";

const authenticateRoutes = Router();
const userController = new UserController();
const movieController = new MovieController();

authenticateRoutes.post(
   "/login",
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
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
            password: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   userController.create
);

export { authenticateRoutes };

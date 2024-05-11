import { Router } from "express";
import { UserController } from "../controller/UserController";
import { Joi, Segments, celebrate } from "celebrate";
import { ensureAuthenticate } from "../shared/middleware/ensureAuthenticate";

const userRoutes = Router();

const userController = new UserController();

userRoutes.use(ensureAuthenticate);

userRoutes.get(
   "/:user_id",
   celebrate(
      {
         [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   userController.findById
);

userRoutes.get("/", userController.find);

userRoutes.put(
   "/",
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
   userController.update
);

userRoutes.delete(
   "/:id",
   celebrate(
      {
         [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   userController.delete
);

export { userRoutes };

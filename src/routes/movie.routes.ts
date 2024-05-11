import { Router } from "express";
import { MovieController } from "../database/controller/MovieController";
import { Joi, Segments, celebrate } from "celebrate";
import { ensureAuthenticate } from "../shared/middleware/ensureAuthenticate";

const movieRoutes = Router();

const movieController = new MovieController();

movieRoutes.use(ensureAuthenticate);

movieRoutes.post(
   "/movie",
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            type: Joi.string()
               .valid("ACAO", "COMEDIA", "LUTA", "DRAMA", "TERROR", "SUSPENSE")
               .required(),
            descriprion: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   movieController.create
);

movieRoutes.put(
   "/",
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string()
               .valid("ACAO", "COMEDIA", "LUTA", "DRAMA", "TERROR", "SUSPENSE")
               .required(),
            descriprion: Joi.string().required(),
         }),
      },
      {
         allowUnknown: false,
      }
   ),
   movieController.update
);

movieRoutes.delete(
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
   movieController.delete
);

export { movieRoutes };

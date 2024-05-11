import { Router } from "express";
import { MovieController } from "../controller/MovieController";
import { Joi, Segments, celebrate } from "celebrate";
import { ensureAuthenticate } from "../shared/middleware/ensureAuthenticate";

const movieRoutes = Router();

const movieController = new MovieController();

movieRoutes.post(
   "/create",
   ensureAuthenticate,
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            movie_type: Joi.string()
               .valid("SERIES", "MOVIE", "DOCUMENTARY")
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

movieRoutes.get(
   "/:movie_id",
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

movieRoutes.get("/", movieController.findAll);

movieRoutes.put(
   "/update",
   ensureAuthenticate,
   celebrate(
      {
         [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required(),
            title: Joi.string().required(),
            movie_type: Joi.string()
               .valid("SERIES", "MOVIE", "DOCUMENTARY")
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

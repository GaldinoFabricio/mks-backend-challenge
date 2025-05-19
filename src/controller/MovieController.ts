import { Request, Response } from "express";
import MovieService from "../service/MovieService";
import redisClient from "../shared/redisClient";

class MovieController {
   async create(
      request: Request<
         any,
         any,
         {
            title: string;
            description: string;
            movie_type: "SERIES" | "MOVIE" | "DOCUMENTARY";
         }
      >,
      response: Response
   ): Promise<Response> {
      const { title, movie_type, description } = request.body;

      const createMovie = new MovieService();

      const movie = await createMovie.create({
         title,
         description,
         movie_type,
      });

      return response.status(201).json(movie);
   }

   async findAll(request: Request, response: Response): Promise<Response> {
      const cacheKey = "movies:all";
      const cachedMovies = await redisClient.get(cacheKey);

      if (cachedMovies) {
         return response.json(JSON.parse(cachedMovies));
      }

      const listMovies = new MovieService();

      const movies = await listMovies.findAll();
      await redisClient.set(cacheKey, JSON.stringify(movies), { EX: 60 });

      return response.status(200).json(movies);
   }

   async findById(
      request: Request<{ id: string }>,
      response: Response
   ): Promise<Response> {
      const { id } = request.params;

      const findMovie = new MovieService();

      const movie = await findMovie.findById(id);

      return response.status(200).json(movie);
   }

   async update(
      request: Request<
         any,
         any,
         {
            id: string;
            title: string;
            description: string;
            movie_type: "SERIES" | "MOVIE" | "DOCUMENTARY";
         }
      >,
      response: Response
   ): Promise<Response> {
      const { id, movie_type, title, description } = request.body;

      const updateMovie = new MovieService();

      const movie = await updateMovie.update({
         id,
         movie_type,
         title,
         description,
      });

      return response.status(200).json(movie);
   }

   async delete(
      request: Request<{ id: string }>,
      response: Response
   ): Promise<Response> {
      const { id } = request.params;

      const deleteMovie = new MovieService();

      await deleteMovie.delete(id);

      return response.status(204).send();
   }
}

export { MovieController };

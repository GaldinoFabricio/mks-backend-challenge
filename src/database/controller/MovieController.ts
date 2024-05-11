import { Request, Response } from "express";
import MovieService from "../service/MovieService";

class MovieController {
   async create(
      request: Request<
         any,
         any,
         {
            name: string;
            description: string;
            type: "ACAO" | "COMEDIA" | "LUTA" | "DRAMA" | "TERROR" | "SUSPENSE";
         }
      >,
      response: Response
   ): Promise<Response> {
      const { name, type, description } = request.body;

      const createMovie = new MovieService();

      const movie = await createMovie.create({
         name,
         description,
         type,
      });

      return response.status(201).json(movie);
   }

   async findAll(request: Request, response: Response): Promise<Response> {
      const listMovies = new MovieService();

      const movies = await listMovies.findAll();

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
            name: string;
            description: string;
            type: "ACAO" | "COMEDIA" | "LUTA" | "DRAMA" | "TERROR" | "SUSPENSE";
         }
      >,
      response: Response
   ): Promise<Response> {
      const { id } = request.params;
      const { name, type, description } = request.body;

      const updateMovie = new MovieService();

      const movie = await updateMovie.update({
         id,
         name,
         type,
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

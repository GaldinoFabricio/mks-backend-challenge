import { Movie, MovieType } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

class MovieService {
   async create(movie: {
      title: string;
      description: string;
      movie_type: "SERIES" | "MOVIE" | "DOCUMENTARY";
   }): Promise<Movie> {
      return prismaClient.movie.create({
         data: {
            title: movie.title,
            description: movie.description,
            movie_type: movie.movie_type,
         },
      });
   }

   async findAll(): Promise<
      {
         id: string;
         title: string;
         description: string;
         movie_type: MovieType;
      }[]
   > {
      return await prismaClient.movie.findMany({
         select: {
            id: true,
            title: true,
            description: true,
            movie_type: true,
         },
         where: {
            deleted_at: null,
         },
      });
   }

   async findById(id: string): Promise<Movie | null> {
      return await prismaClient.movie.findFirst({
         where: {
            id,
         },
      });
   }

   update({
      id,
      movie_type,
      title,
      description,
   }: {
      id: string;
      title: string;
      description: string;
      movie_type: "SERIES" | "MOVIE" | "DOCUMENTARY";
   }): Promise<Movie> {
      return prismaClient.movie.update({
         where: {
            id,
         },
         data: {
            title,
            description,
            movie_type,
         },
      });
   }

   async delete(id: string): Promise<void> {
      await prismaClient.movie.update({
         where: {
            id,
         },
         data: {
            deleted_at: new Date(),
         },
      });
   }
}

export default MovieService;

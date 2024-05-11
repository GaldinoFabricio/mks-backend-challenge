import { Movie } from "../database/entity/Movie";

class MovieService {
   private movies: Movie[];

   constructor() {
      this.movies = [];
   }

   public findAll(): Movie[] {
      return this.movies;
   }

   public findById(id: string): Movie | undefined {
      return this.movies.find((movie) => movie.id === id);
   }

   public create(movie: {
      name: string;
      description: string;
      type: "ACAO" | "COMEDIA" | "LUTA" | "DRAMA" | "TERROR" | "SUSPENSE";
   }): void {
      this.movies.push({ ...movie, id: String(this.movies.length + 1) });
   }

   public update({
      id,
      name,
      type,
      description,
   }: {
      id: string;
      name: string;
      type: "ACAO" | "COMEDIA" | "LUTA" | "DRAMA" | "TERROR" | "SUSPENSE";
      description: string;
   }): void {
      const index = this.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
         this.movies[index] = { id, name, type, description };
      }
   }

   public delete(id: string): void {
      this.movies = this.movies.filter((movie) => movie.id !== id);
   }
}

export default MovieService;

import { Router } from "express";
import { userRoutes } from "./user.routes";
import { movieRoutes } from "./movie.routes";
import { authenticateRoutes } from "./authenticate.routes";

const routes = Router();

routes.use("/movie", movieRoutes);
routes.use("/users", userRoutes);
routes.use("/", authenticateRoutes);

export default routes;

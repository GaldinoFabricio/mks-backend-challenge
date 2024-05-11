import { Router } from "express";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/", userRoutes);

export default routes;

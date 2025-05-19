import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppErrors";
import { UserService } from "../../service/UserService";
import redisClient from "../redisClient";

export interface IPayload {
   sub: string;
}

export async function ensureAuthenticate(
   request: Request,
   response: Response,
   next: NextFunction
) {
   const authToken = request.headers.authorization;

   if (!authToken) {
      throw new AppError("Token is missing", 401);
   }

   const [, token] = authToken.split(" ");

   const isBlacklisted = await redisClient.get(`blacklist:${token}`);
   if (isBlacklisted)
      return response.status(403).json({ message: "Token inválido (logout)" });

   try {
      const { sub: user_id } = verify(
         token,
         `${process.env.KEY_TOKEN}`
      ) as IPayload;
      console.log(user_id);
      if (!user_id) {
         throw new AppError("Token is missing", 401);
      }

      const userService = new UserService();

      const usersVerify = await userService.findById(user_id);

      if (!usersVerify) {
         throw new AppError("User not exist", 400);
      }

      request.user_id = usersVerify.id;

      next();
   } catch {
      throw new AppError("token invalid", 401);
   }
}

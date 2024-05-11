import { Request, Response } from "express";
import { GenerateTokenProvider } from "../shared/provider/GenerateTokenProvider";
import { UserService } from "../service/UserService";

class UserController {
   async authenticate(
      request: Request<any, any, { email: string; password: string }>,
      response: Response
   ): Promise<Response> {
      const { email, password } = request.body;

      const userService = new UserService();

      const user = await userService.findEmail(email);

      const generateTokenProvider = new GenerateTokenProvider();
      const token = await generateTokenProvider.execute("");

      const tokenReturn = {
         token,
         user: { name: user },
      };

      return response.status(200).json(tokenReturn);
   }

   async create(
      request: Request<
         any,
         any,
         { name: string; email: string; password: string }
      >,
      response: Response
   ): Promise<Response> {
      const { name, email, password } = request.body;

      const createUser = new UserService();

      const user = await createUser.create({
         name,
         email,
         password,
      });

      return response.status(201).json(user);
   }

   async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const deleteUser = new UserService();

      const user = await deleteUser.delete({ id });

      return response.status(201).json(user);
   }

   async findById(request: Request, response: Response): Promise<Response> {
      const { user_id } = request.params;

      const findId = new UserService();

      const user = await findId.findById(user_id);

      return response.status(200).json(user);
   }

   async find(request: Request, response: Response): Promise<Response> {
      const { id } = request.user;

      const findId = new UserService();

      const user = await findId.findById(id);

      return response.status(200).json(user);
   }

   async update(
      request: Request<
         any,
         any,
         { name: string; email: string; password: string }
      >,
      response: Response
   ): Promise<Response> {
      const { name, email, password } = request.body;
      const { id } = request.user;

      const updateUser = new UserService();

      const user = await updateUser.update({
         name,
         email,
         password,
      });

      return response.status(201).json(user);
   }
}

export { UserController };

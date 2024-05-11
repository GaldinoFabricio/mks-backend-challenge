import { Request, Response } from "express";
import { GenerateTokenProvider } from "../shared/provider/GenerateTokenProvider";
import PasswordValidator from "password-validator";
import { UserService } from "../service/UserService";
import { hash, compare } from "bcrypt";
import AppError from "../shared/errors/AppErrors";

class UserController {
   async authenticate(
      request: Request<any, any, { email: string; password: string }>,
      response: Response
   ): Promise<Response> {
      const { email, password } = request.body;

      const schema = new PasswordValidator();
      schema
         .is()
         .min(8)
         .is()
         .max(100)
         .has()
         .uppercase()
         .has()
         .lowercase()
         .has()
         .digits(2)
         .has()
         .not()
         .spaces()
         .is()
         .not()
         .oneOf(["Passw0rd", "Password123", "1234568"]);
      if (schema.validate(password)) {
         throw new AppError("Email or password incorrect", 401);
      }

      const userService = new UserService();

      const user = await userService.findEmail(email);

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
         throw new AppError("Email or password incorrect", 401);
      }

      const generateTokenProvider = new GenerateTokenProvider();
      const token = await generateTokenProvider.execute("");

      const tokenReturn = {
         token,
         user: { name: user.name },
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

      const schema = new PasswordValidator();
      schema
         .is()
         .min(8)
         .is()
         .max(100)
         .has()
         .uppercase()
         .has()
         .lowercase()
         .has()
         .digits(2)
         .has()
         .not()
         .spaces()
         .is()
         .not()
         .oneOf(["Passw0rd", "Password123", "1234568"]);
      if (schema.validate(password)) {
         throw new AppError("Email or password incorrect", 401);
      }

      const createUser = new UserService();

      const verifyEmail = await createUser.findEmail(email);
      if (verifyEmail) {
         throw new AppError("Email already exists", 401);
      }

      const passwordHash = await hash(password, 8);

      const user = await createUser.create({
         name,
         email,
         password: passwordHash,
      });

      return response.status(201).json(user);
   }

   async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const deleteUser = new UserService();

      const userExists = await deleteUser.findById(id);
      if (!userExists) {
         throw new AppError("User not found", 401);
      }

      const user = await deleteUser.delete({ id });

      return response.status(201).json(user);
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
         id,
         name,
         email,
         password,
      });

      return response.status(201).json(user);
   }

   async updatePassword(
      request: Request<any, any, { password: string }>,
      response: Response
   ): Promise<Response> {
      const { password } = request.body;
      const { id } = request.user;

      const schema = new PasswordValidator();
      schema
         .is()
         .min(8)
         .is()
         .max(100)
         .has()
         .uppercase()
         .has()
         .lowercase()
         .has()
         .digits(2)
         .has()
         .not()
         .spaces()
         .is()
         .not()
         .oneOf(["Passw0rd", "Password123", "1234568"]);
      if (schema.validate(password)) {
         throw new AppError("Email or password incorrect", 401);
      }

      const updatePassword = new UserService();

      const passwordHash = await hash(password, 8);

      const user = await updatePassword.updatePassword({
         id,
         password: passwordHash,
      });

      return response.status(201).json(user);
   }
}

export { UserController };

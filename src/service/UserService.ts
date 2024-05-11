import { User } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

class UserService {
   async create({
      name,
      email,
      password,
   }: {
      name: string;
      email: string;
      password: string;
   }): Promise<{ id: string; name: string; email: string }> {
      return await prismaClient.user.create({
         data: {
            name,
            email,
            password,
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }

   async delete({
      id,
   }: {
      id: string;
   }): Promise<{ id: string; name: string; email: string }> {
      return await prismaClient.user.update({
         where: {
            id,
         },
         data: {
            deleted_at: new Date(),
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }

   async findEmail(email: string): Promise<User | null> {
      return prismaClient.user.findFirst({
         where: {
            email,
         },
      });
   }

   async findById(
      id: string
   ): Promise<{ id: string; name: string; email: string } | null> {
      return await prismaClient.user.findUnique({
         where: {
            id,
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });
   }

   async update({
      id,
      name,
      email,
      password,
   }: {
      id: string;
      name: string;
      email: string;
      password: string;
   }): Promise<{ id: string; name: string; email: string }> {
      return await prismaClient.user.update({
         where: {
            id,
         },
         data: {
            name,
            email,
            password,
         },
      });
   }

   async updatePassword({
      id,
      password,
   }: {
      id: string;
      password: string;
   }): Promise<void> {
      await prismaClient.user.update({
         where: {
            id,
         },
         data: {
            password,
         },
      });
   }
}

export { UserService };

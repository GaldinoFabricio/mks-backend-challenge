class UserService {
   async create({
      name,
      email,
      password,
   }: {
      name: string;
      email: string;
      password: string;
   }) {
      return { name, email, password };
   }

   async delete({ id }: { id: string }) {
      return { id };
   }

   async findEmail(email: string) {
      return email;
   }

   async findById(id: string) {
      return id;
   }

   async update({
      name,
      email,
      password,
   }: {
      name: string;
      email: string;
      password: string;
   }) {
      return { name, email, password };
   }
}

export { UserService };

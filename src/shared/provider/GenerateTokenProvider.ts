import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
   async execute(user_id: string) {
      const token = sign({}, `${process.env.KEY_TOKEN}`, {
         subject: user_id,
         expiresIn: "20d",
      });

      return token;
   }
}

export { GenerateTokenProvider };

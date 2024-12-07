import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { User, UserCreation, UserLogin } from "../types/user";
import { comparePassword, getHashPassword } from "../utils/password";
import { checkAuthorization, tokenCreate } from "../utils/token";
import { doesEmailExist, doesUsernameExist } from "../utils/check";
import club_tortue from "../databases/db";
import { getUser } from "../controllers/users";

export async function users(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.post("/register", async (request, reply) => {
    const { email, password, name } = request.body as UserCreation;
    try {
      if (email === undefined || password === undefined || name === undefined) {
        return reply.status(400).send({ message: "Missing required fields" });
      }

      if (await doesEmailExist(email)) {
        return reply.status(400).send({ message: "Email already used" });
      }

      if (await doesUsernameExist(name)) {
        return reply.status(400).send({ message: "Username already used" });
      }

      await club_tortue.query(
        "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
        [email, getHashPassword(password), name]
      );

      return reply.send({ success: true });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as UserLogin;

    if (email === undefined || password === undefined) {
      return reply
        .status(401)
        .send({ message: "email and password should be defined" });
    }

    try {
      const { rows } = await club_tortue.query(
        "SELECT id, password FROM users WHERE email = $1",
        [email]
      );
      const users = rows as User[];

      if (users.length === 0) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      const user = users[0];

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      return reply.send({ token: tokenCreate(user.id) });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  });

  fastify.get("/verify", async (request, reply) => {
    const fineoToken = await checkAuthorization(request.headers.authorization);

    if (fineoToken === null) {
      return reply.status(401).send({ success: false });
    }

    const user = await getUser(fineoToken.id);

    if (user !== null) {
      return {
        success: true,
      };
    }

    return reply.status(404).send({ success: false });
  });
}

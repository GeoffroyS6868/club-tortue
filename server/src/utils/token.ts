import jwt from "jsonwebtoken";
import { UserToken } from "../types/token";
import club_tortue from "../databases/db";

export function tokenCreate(id: number): string {
  const token = jwt.sign({ id: id.toString() }, process.env.COOKIE_SECRET!, {
    expiresIn: "7 days",
  });
  return token;
}

export function tokenVerify(token: string): UserToken {
  const tokendecoded = jwt.verify(token, process.env.COOKIE_SECRET!);
  if (typeof tokendecoded === "object") {
    return tokendecoded as UserToken;
  }
  return { id: -1 } as UserToken;
}

export function getUserTokenFromBearerToken(
  authorization: string | undefined
): UserToken {
  if (authorization === undefined || authorization === null)
    throw new Error("Unauthorized: Authorization undefined");
  let token = "";
  if (authorization.startsWith("Bearer ")) token = authorization.split(" ")[1];
  else token = authorization;
  try {
    const UserToken = tokenVerify(token);
    if (UserToken.id === -1)
      throw new Error("Unauthorized: Unable to verify token");
    return UserToken;
  } catch (e) {
    throw new Error("Unauthorized: Other error: " + e);
  }
}

export async function checkAuthorization(
  authorization: string | undefined
): Promise<UserToken | null> {
  try {
    const UserToken = getUserTokenFromBearerToken(authorization);

    const { rows } = await club_tortue.query(
      "SELECT email FROM users WHERE id = $1",
      [UserToken.id]
    );
    const users = rows as [];

    if (users.length == 0) {
      return null;
    }
    return UserToken;
  } catch (e) {
    return null;
  }
}

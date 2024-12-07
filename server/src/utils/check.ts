import club_tortue from "../databases/db";
import { User } from "../types/user";

export async function doesEmailExist(email: string): Promise<boolean> {
  try {
    const { rows } = await club_tortue.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    const users = rows as User[];

    return users.length !== 0;
  } catch (error) {
    return true;
  }
}

export async function doesUsernameExist(username: string): Promise<boolean> {
  try {
    const { rows } = await club_tortue.query(
      "SELECT id FROM users WHERE name = $1",
      [username]
    );
    const users = rows as User[];

    return users.length !== 0;
  } catch (error) {
    return true;
  }
}

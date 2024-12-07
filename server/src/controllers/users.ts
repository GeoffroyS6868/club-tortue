import club_tortue from "../databases/db";
import { User } from "../types/user";

export async function getUser(id: number): Promise<User | null> {
  const userResult = await club_tortue.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  const users = userResult.rows as User[];

  if (users.length > 0) {
    return users[0];
  }
  return null;
}

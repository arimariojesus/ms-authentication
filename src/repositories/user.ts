import db from '../db';
import User from '../models/user';

class UserRepository {
  
  async findAll(): Promise<User[]> {
    const query = `
      SELECT uuid, username
      FROM application_user
    `;

    const { rows: users } = await db.query<User>(query);

    return users ?? [];
  }

  async findById(uuid: string): Promise<User> {
    const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
    `;

    const values = [uuid];

    const { rows } = await db.query<User>(query, values);
    const [ user ] = rows;

    return user;
  }
}

export default new UserRepository();

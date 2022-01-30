import db from '../db';
import User from '../models/user';

class UserRepository {
  async findAll(): Promise<User[]> {
    const query = `
      SELECT uuid, username
      FROM application_user
    `;

    const results = await db.query<User>(query);
    const users = results.rows;

    return users ?? [];
  }
}

export default new UserRepository();

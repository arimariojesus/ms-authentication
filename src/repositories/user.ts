import db from '../db';
import DatabaseError from '../models/errors/database';
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
    try {
      const query = `
        SELECT uuid, username
        FROM application_user
        WHERE uuid = $1
      `;

      const values = [uuid];

      const { rows } = await db.query<User>(query, values);
      const [ user ] = rows;

      return user;
    } catch (error) {
      throw new DatabaseError('Error finding user', error);
    }
  }

  async create(user: User): Promise<string> {
    const script = `
      INSERT INTO application_user (
        username,
        password,
      )
      VALUES ($1, crypt($2, 'my_salt'))
      RETRNING uuid
    `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [ newUser ] = rows;
    
    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const script = `
      UPDATE INTO application_user 
      SET 
        username = $1,
        password = crypt($2, 'my_salt')
      WHERE uuid = $3
    `;

    const values = [user.username, user.password];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
      DELETE
      FROM application_user
      WHERE uuid = $1
    `;

    await db.query(script, [uuid]);
  }
}

export default new UserRepository();

import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@server/db/schemas';
import { NewUser, User } from '@server/db/schemas/user';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  constructor(@Inject('db') private db: NodePgDatabase<typeof schema>) {}

  async findById(id: number): Promise<User | undefined> {
    const users = await this.db.query.users.findMany({
      where(fields) {
        return eq(fields.id, id);
      },
    });

    return users[0] as User;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.db.query.users.findMany({
      where(fields) {
        return eq(fields.email, email);
      },
    });

    return users[0] as User;
  }

  async create(user: NewUser) {
    return this.db
      .insert(schema.users)
      .values({ ...user })
      .returning();
  }
}

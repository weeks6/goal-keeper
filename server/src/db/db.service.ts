import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import { DbConfig } from './db.interface';

@Injectable()
export class DBService {
  private client: Client;

  public async getDrizzle(options: DbConfig) {
    if (options.pg.connection === 'client') {
      this.client = new Client(options.pg.config);
      await this.client.connect();
      return drizzle(this.client, options?.config);
    }
    const pool = new Pool(options.pg.config);
    return drizzle(pool, options?.config);
  }

  public async endClient() {
    this.client.end();
  }
}

import { DBService } from './db.service';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import drizzleConfig from './db.config';

async function executeMigration() {
  const dbService = new DBService();
  const drizzleInstance = await dbService.getDrizzle(drizzleConfig);
  await migrate(drizzleInstance, { migrationsFolder: './drizzle' });

  return dbService;
}

// Call the function to execute the migration
executeMigration()
  .then((dbService: DBService) => {
    console.log('Migration has been executed successfully');
    dbService.endClient();
  })
  .catch((error) => {
    console.error('Error executing migration:', error);
  });

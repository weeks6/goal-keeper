import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './db.definition';
import { DBService } from './db.service';
import { DbConfig } from './db.interface';

@Global()
export class DbModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DBService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DBService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DBService],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DBService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DBService, config: DbConfig) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DBService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}

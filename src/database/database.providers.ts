import { Verification } from 'src/auth/entities/verification.entity';
import { DATA_SOURCE } from 'src/common/constants/constants';
import { Token } from 'src/token/entities/token.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Verification, Token],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

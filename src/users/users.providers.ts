import { DATA_SOURCE, USER_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entities';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (datasource: DataSource) => datasource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];

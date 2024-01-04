import { DATA_SOURCE, TOKEN_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Token } from './entities/token.entity';

export const tokenProvider = [
  {
    provide: TOKEN_REPOSITORY,
    useFactory: (datasource: DataSource) => datasource.getRepository(Token),
    inject: [DATA_SOURCE],
  },
];

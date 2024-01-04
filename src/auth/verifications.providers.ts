import {
  DATA_SOURCE,
  VERIFICATION_REPOSITORY,
} from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Verification } from './entities/verification.entity';

export const verficiationProviders = [
  {
    provide: VERIFICATION_REPOSITORY,
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(Verification),
    inject: [DATA_SOURCE],
  },
];

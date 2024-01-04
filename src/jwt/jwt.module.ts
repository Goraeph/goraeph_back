import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWT_OPTIONS } from 'src/common/constants/constants';
import { JwtOptions } from './jwt.options.interface';

@Module({
  providers: [JwtService],
  exports: [JWT_OPTIONS],
})
export class JwtModule {
  static forRoot(options: JwtOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: JWT_OPTIONS,
          useValue: options,
        },
      ],
      global: true,
      exports: [JwtModule],
    };
  }
}

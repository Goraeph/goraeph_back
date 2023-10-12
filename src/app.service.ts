import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello this is Goraeph🐳. Let's make something interesting together.";
  }
}

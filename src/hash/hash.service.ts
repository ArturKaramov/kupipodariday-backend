import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async hash(password: string) {
    return await hash(password, 10);
  }

  async compare(password: string, hash: string) {
    return await compare(password, hash);
  }
}

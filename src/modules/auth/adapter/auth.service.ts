import { Injectable } from '@nestjs/common';
import { RegisterAgencyDto } from '../presentation/auth.dto';

@Injectable()
export class AuthService {
  constructor() {}
  async register(body: RegisterAgencyDto) {
    return body;
  }
}

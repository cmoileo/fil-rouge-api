import { Injectable } from '@nestjs/common';
import { RegisterAgencyDto } from './dto/authAgency.dto';

@Injectable()
export class AuthService {
  constructor() {}
  async register(body: RegisterAgencyDto) {
    return body;
  }
}

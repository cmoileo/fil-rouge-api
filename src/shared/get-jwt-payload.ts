import * as jwt from 'jsonwebtoken';
export default class GetJwtPayload {
  constructor(private readonly token: string) {}

  getPayload() {
    return jwt.verify(this.token, process.env.JWT_SECRET_KEY);
  }
}

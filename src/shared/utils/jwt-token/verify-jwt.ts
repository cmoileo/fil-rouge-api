import * as jwt from 'jsonwebtoken';

export default class VerifyJwt {
  private readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
  async verify() {
    try {
      const decoded = await jwt.verify(this.token, process.env.JWT_SECRET);
      return {
        valid: true,
        decoded: decoded,
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}

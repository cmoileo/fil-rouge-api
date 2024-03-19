import * as jwt from 'jsonwebtoken';

export default class GenerateJwt {
  constructor(
    private readonly payload: any,
    private readonly expiresIn: string,
  ) {}
  generate() {
    console.log(this.expiresIn);
    return jwt.sign(this.payload, process.env.JWT_SECRET, {
      expiresIn: this.expiresIn,
    });
  }
}

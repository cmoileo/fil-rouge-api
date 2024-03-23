import * as bcrypt from 'bcrypt';

export default class HashPassword {
  constructor(private readonly password: string) {}
  async hash() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  }

  async compare(password: string) {
    const match = await bcrypt.compare(this.password, password);
    return match;
  }
}

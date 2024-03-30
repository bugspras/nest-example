/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      userId: user.id,
      username: user.username,
      access_token: await this.jwtService.sign(payload),
    };
  }

  async refresh(user: any) {
    const payload = { username: 'baguspras', sub: '58999879' };
    return {
      userId: '58999879',
      username: 'baguspras',
      access_token: await this.jwtService.sign(payload, { expiresIn: '3s' }),
    };
  }
}

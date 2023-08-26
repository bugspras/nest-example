import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      userid: user.userId,
      username: username,
      password: pass,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async verify(access_token) {
    console.log(access_token);
    // return await this.jwtService.verify(access_token);
  }
  // async destroy(access_token) {
  // return await this.jwtService.(access_token);
  // }
}

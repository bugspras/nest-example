import { Injectable } from '@nestjs/common';
import { tb_users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { usersDto } from './users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(tb_users)
    private readonly repository: Repository<tb_users>,
  ) {}

  async findOne(username: string) {
    try {
      return await this.repository.findOne({
        select: [`id`, 'email', 'username', 'photo', 'fullname', 'password'],
        where: { username: username },
      });
    } catch (error) {}
  }
}

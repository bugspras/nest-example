import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { tb_users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([tb_users])],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}

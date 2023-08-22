import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  async findAll() {
    return `hello`;
  }
  async findOne(id: string) {
    return `hello ${id}`;
  }
  async create() {
    return `hello create`;
  }
  async update() {
    return `hello update`;
  }
  async delete(id: string) {
    return `hello delete ${id}`;
  }
}

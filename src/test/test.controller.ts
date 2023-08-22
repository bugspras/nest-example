import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { TestService } from './test.service';
import { EntityNotFoundErrorFilter } from '../EntityNotFoundError.filter';

@Controller('test')
@UseFilters(new EntityNotFoundErrorFilter())
export class TestController {
  constructor(private readonly TestSerive: TestService) {}

  @Get()
  async findAll() {
    return await this.TestSerive.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.TestSerive.findOne(id);
  }

  @Post()
  async create() {
    return await this.TestSerive.create();
  }

  @Put(':id')
  async update() {
    return this.TestSerive.update();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.TestSerive.delete(id);
  }
}

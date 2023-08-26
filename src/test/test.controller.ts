import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  Headers,
} from '@nestjs/common';
import { TestService } from './test.service';
import { testDto } from './test.dto';
import { EntityNotFoundErrorFilter } from '../EntityNotFoundError.filter';

@Controller('test')
@UseFilters(new EntityNotFoundErrorFilter())
export class TestController {
  constructor(private readonly TestSerive: TestService) {}

  @Get()
  async findAll(@Headers('Authorization') auth: string): Promise<any> {
    console.log(auth.split(' ')[1]);
    return await this.TestSerive.findAll();
  }

  @Get(':nik')
  async findOne(@Param('nik') nik: string) {
    return await this.TestSerive.findOne(nik);
  }

  @Post()
  async create(@Body() data: testDto) {
    return await this.TestSerive.create(data);
  }

  @Put(':nik')
  async update(@Body() data: testDto, @Param('nik') nik: string) {
    return await this.TestSerive.update(data, nik);
  }

  @Delete(':nik')
  async remove(@Param('nik') nik: string) {
    return await this.TestSerive.delete(nik);
  }
}

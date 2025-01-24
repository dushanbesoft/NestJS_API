import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller('app') // Это декоратор контроллер /api:port/app
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test') // Это метод декоратор, так принимает каких то параметра /app/test
  getHello(): string {
    return this.appService.getHello();
  }

  //Так мы обозначаем параметр
  @Get('get/:id')
  getData(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      // throw new Error('Error');
      throw new BadRequestException('Id должен быть больше 0');
    }
    return id;
  }

  @Post('create')
  //DTO - Data transform to object
  create(@Body() dto: CreateDto) {
    return dto;
  }
}

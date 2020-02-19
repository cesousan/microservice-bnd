import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers(): any {
    console.log('YOLO!!!!!!!!!!!!!!!');
    return [{ username: 'JOHN', id: 1, password: 'mqlskdqmlsdk' }];
  }
}

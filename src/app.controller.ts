import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getLandingPage(): string {
    return this.appService.getLandingPage();
  }

  @Get('health')
  getHealth(): { status: string; version: string } {
    return { status: 'ok', version: '1.0.0' };
  }
}

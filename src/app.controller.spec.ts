import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('landing page', () => {
    it('debe retornar HTML con titulo Movies API', () => {
      const html = appController.getLandingPage();
      expect(html).toContain('<title>Movies API</title>');
    });

    it('debe incluir un enlace a /api (Swagger)', () => {
      const html = appController.getLandingPage();
      expect(html).toContain('href="/api"');
    });
  });
});

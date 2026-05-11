import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Landing page', () => {
    it('/ (GET) debe retornar HTML con titulo Movies API', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect((res: request.Response) => {
          expect(res.text).toContain('<title>Movies API</title>');
          expect(res.text).toContain('href="/api"');
        });
    });
  });

  describe('Movies CRUD', () => {
    it('POST /movies crea una pelicula', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Inception', year: 2010 })
        .expect(201)
        .expect((res: request.Response) => {
          expect(res.body).toMatchObject({
            id: 1,
            title: 'Inception',
            year: 2010,
          });
        });
    });

    it('POST /movies rechaza payload invalido', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: '', year: 'no-es-numero' })
        .expect(400);
    });

    it('flujo completo: create, list, get, update, delete', async () => {
      const created = await request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Matrix', year: 1999 })
        .expect(201);

      const id = (created.body as { id: number }).id;

      await request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect((res: request.Response) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect((res.body as unknown[]).length).toBe(1);
        });

      await request(app.getHttpServer())
        .get(`/movies/${id}`)
        .expect(200)
        .expect((res: request.Response) => {
          expect((res.body as { title: string }).title).toBe('Matrix');
        });

      await request(app.getHttpServer())
        .patch(`/movies/${id}`)
        .send({ year: 2003 })
        .expect(200)
        .expect((res: request.Response) => {
          expect((res.body as { year: number }).year).toBe(2003);
        });

      await request(app.getHttpServer()).delete(`/movies/${id}`).expect(204);

      await request(app.getHttpServer()).get(`/movies/${id}`).expect(404);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('POST /movies debe crear y retornar la pelicula', () => {
    const movie = controller.create({ title: 'Inception', year: 2010 });
    expect(movie.id).toBe(1);
    expect(movie.title).toBe('Inception');
  });

  it('GET /movies debe listar las peliculas creadas', () => {
    controller.create({ title: 'A', year: 2000 });
    controller.create({ title: 'B', year: 2001 });
    expect(controller.findAll()).toHaveLength(2);
  });

  it('GET /movies/:id debe retornar la pelicula por id', () => {
    const created = controller.create({ title: 'A', year: 2000 });
    const found = controller.findOne(created.id);
    expect(found.title).toBe('A');
  });

  it('PATCH /movies/:id debe actualizar la pelicula', () => {
    const created = controller.create({ title: 'A', year: 2000 });
    const updated = controller.update(created.id, { year: 2025 });
    expect(updated.year).toBe(2025);
  });

  it('DELETE /movies/:id debe eliminar la pelicula', () => {
    const created = controller.create({ title: 'A', year: 2000 });
    controller.remove(created.id);
    expect(controller.findAll()).toHaveLength(0);
  });
});

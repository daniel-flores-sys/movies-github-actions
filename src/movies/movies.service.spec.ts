import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear una pelicula con id autoincremental', () => {
      const m1 = service.create({ title: 'Inception', year: 2010 });
      const m2 = service.create({ title: 'Matrix', year: 1999 });
      expect(m1.id).toBe(1);
      expect(m2.id).toBe(2);
      expect(m1.title).toBe('Inception');
      expect(m2.year).toBe(1999);
    });
  });

  describe('findAll', () => {
    it('debe retornar arreglo vacio inicialmente', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('debe retornar todas las peliculas creadas', () => {
      service.create({ title: 'A', year: 2000 });
      service.create({ title: 'B', year: 2001 });
      expect(service.findAll()).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('debe retornar la pelicula buscada por id', () => {
      const created = service.create({ title: 'Inception', year: 2010 });
      const found = service.findOne(created.id);
      expect(found).toEqual(created);
    });

    it('debe lanzar NotFoundException si el id no existe', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar los campos provistos', () => {
      const created = service.create({ title: 'A', year: 2000 });
      const updated = service.update(created.id, { title: 'B' });
      expect(updated.title).toBe('B');
      expect(updated.year).toBe(2000);
    });

    it('debe lanzar NotFoundException si el id no existe', () => {
      expect(() => service.update(999, { title: 'X' })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar la pelicula', () => {
      const created = service.create({ title: 'A', year: 2000 });
      service.remove(created.id);
      expect(service.findAll()).toHaveLength(0);
    });

    it('debe lanzar NotFoundException si el id no existe', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private nextId = 1;

  create(dto: CreateMovieDto): Movie {
    const movie: Movie = {
      id: this.nextId++,
      title: dto.title,
      year: dto.year,
    };
    this.movies.push(movie);
    return movie;
  }

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) {
      throw new NotFoundException(`Pelicula con id ${id} no encontrada`);
    }
    return movie;
  }

  update(id: number, dto: UpdateMovieDto): Movie {
    const movie = this.findOne(id);
    if (dto.title !== undefined) movie.title = dto.title;
    if (dto.year !== undefined) movie.year = dto.year;
    return movie;
  }

  remove(id: number): void {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new NotFoundException(`Pelicula con id ${id} no encontrada`);
    }
    this.movies.splice(index, 1);
  }
}

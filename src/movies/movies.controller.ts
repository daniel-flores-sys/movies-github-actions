import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una pelicula' })
  @ApiResponse({ status: 201, description: 'Pelicula creada', type: Movie })
  create(@Body() dto: CreateMovieDto): Movie {
    return this.moviesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las peliculas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de peliculas',
    type: [Movie],
  })
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una pelicula por id' })
  @ApiResponse({ status: 200, description: 'Pelicula encontrada', type: Movie })
  @ApiResponse({ status: 404, description: 'Pelicula no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number): Movie {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una pelicula' })
  @ApiResponse({
    status: 200,
    description: 'Pelicula actualizada',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Pelicula no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Movie {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar una pelicula' })
  @ApiResponse({ status: 204, description: 'Pelicula eliminada' })
  @ApiResponse({ status: 404, description: 'Pelicula no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.moviesService.remove(id);
  }
}

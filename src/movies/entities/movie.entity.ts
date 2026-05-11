import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty({
    example: 1,
    description: 'Identificador unico de la pelicula',
  })
  id: number;

  @ApiProperty({ example: 'Inception', description: 'Titulo de la pelicula' })
  title: string;

  @ApiProperty({ example: 2010, description: 'Anio de estreno' })
  year: number;
}

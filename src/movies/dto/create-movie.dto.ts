import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Titulo de la pelicula' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 2010, description: 'Anio de estreno' })
  @IsInt()
  @Min(1888)
  @Max(2100)
  year: number;
}

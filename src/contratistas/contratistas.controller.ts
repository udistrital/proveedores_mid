import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ContratistasService } from './contratistas.service';
import { PersonaNaturalDto } from './dto/persona-natural.dto';
import { PersonaJuridicaDto } from './dto/persona-juridica.dto';

@Controller('contratistas')
export class ContratistasController {
  constructor(private readonly contratistasService: ContratistasService) {}

  @Get()
  findAll() {
    try {
      return this.contratistasService.obtenerListado();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('tipo') tipo: string,
  ): PersonaNaturalDto | PersonaJuridicaDto {
    if (!id || !tipo) {
      throw new HttpException(
        'Parámetro faltante. Id o Tipo',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (tipo == 'persona_natural') {
      return this.contratistasService.obtenerPersonaNatural(id);
    }

    if (tipo == 'persona_juridica') {
      return this.contratistasService.obtenerPersonaJuridica(id);
    }
  }
}

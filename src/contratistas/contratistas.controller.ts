import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ContratistasService } from './contratistas.service';

@Controller('contratista')
export class ContratistasController {
  constructor(private readonly contratistasService: ContratistasService) {}

  @Get('')
  findOne(@Query('id') id: string) {
    if (!id) {
      throw new HttpException('Parámetro faltante.', HttpStatus.BAD_REQUEST);
    }
    return this.contratistasService.obtenerProveedor(id);
  }
}

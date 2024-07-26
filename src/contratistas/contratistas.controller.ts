import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ContratistasService } from './contratistas.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('contratista')
export class ContratistasController {
  constructor(private readonly contratistasService: ContratistasService) {}

  @Get('')
  @ApiOperation({ summary: 'Consulta proveedor' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    required: true,
    example: '1234567890',
  })
  encontrarContratista(@Query('id') id: string): Promise<StandardResponse<any>> {
    if (!id) {
      return Promise.resolve({
        Success: false,
        Status: HttpStatus.BAD_REQUEST,
        Message: 'El id es requerido',
      });
    }
    return this.contratistasService.obtenerProveedor(id);
  }
}

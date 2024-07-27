import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ContratistasService } from './contratistas.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({
    status: 200,
    description: 'Proveedor encontrado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async encontrarContratista(
    @Query('id') id: string,
  ): Promise<StandardResponse<any>> {
    if (!id) {
      return Promise.resolve({
        Success: false,
        Status: HttpStatus.BAD_REQUEST,
        Message: 'El id es requerido',
      });
    }
    const result = await this.contratistasService.obtenerProveedor(id);

    if (!result.Success) {
      throw new HttpException(
        {
          Success: false,
          Status: result.Status,
          Message: result.Message,
        },
        result.Status,
      );
    }

    return result;
  }
}

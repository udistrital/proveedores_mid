import { ApiProperty } from '@nestjs/swagger';

export class ContratoPersonaDto {
  @ApiProperty()
  vigencia: string;

  @ApiProperty()
  numero_contrato: string;

  @ApiProperty()
  tipo_contrato: {
    id: string;
    nombre: string;
  };

  @ApiProperty()
  estado_contrato: {
    id: string;
    nombre: string;
  };
}
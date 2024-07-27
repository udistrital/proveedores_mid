import { ApiProperty } from '@nestjs/swagger';

export class DetalleProveedorDto {
  @ApiProperty()
  segundo_apellido: string;

  @ApiProperty()
  tipo_documento: string;

  @ApiProperty()
  ciudad_expedicion_documento: string;

  @ApiProperty()
  genero: string;

  @ApiProperty()
  numero_documento: string;

  @ApiProperty()
  primer_apellido: string;

  @ApiProperty()
  segundo_nombre: string;

  @ApiProperty()
  digito_verificacion: string;

  @ApiProperty()
  id_tipo_documento: string;

  @ApiProperty()
  id_ciudad_expedicion_documento: string;

  @ApiProperty()
  primer_nombre: string;

  @ApiProperty()
  id_proveedor_juridico: string;
}

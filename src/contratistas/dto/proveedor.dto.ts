import { ApiProperty } from '@nestjs/swagger';

export class ProveedorDto {
  @ApiProperty()
  id_proveedor: string;

  @ApiProperty()
  ciudad_expedicion_documento: string;

  @ApiProperty()
  id_ciudad_contacto: string;

  @ApiProperty()
  direccion: string;

  @ApiProperty()
  numero_documento: string;

  @ApiProperty()
  nombre_estado: string;

  @ApiProperty()
  numero_cuenta_bancaria: string;

  @ApiProperty()
  id_estado: string;

  @ApiProperty()
  nombre_completo_proveedor: string;

  @ApiProperty()
  ciudad_contacto: string;

  @ApiProperty()
  web: string;

  @ApiProperty()
  fecha_registro: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  id_entidad_bancaria: string;

  @ApiProperty()
  tipo_persona: string;

  @ApiProperty()
  tipo_cuenta_bancaria: string;

  @ApiProperty()
  fecha_ultima_modificacion: string;
}

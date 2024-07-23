import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ProveedorDto } from './dto/proveedor.dto';
import { DetalleProveedorDto } from './dto/detalle-proveedor.dto';

interface responseData {
  proveedores: {
    proveedor: ProveedorDto[];
  };
}

interface responseDetalleData {
  personas_naturales: {
    proveedor: DetalleProveedorDto[];
  };
}

@Injectable()
export class ContratistasService {
  constructor(private configService: ConfigService) {}

  async obtenerProveedor(id: string): Promise<StandardResponse<any>> {
    try {
      const endpoint: string =
        this.configService.get<string>('ENDP_PROVEEDORES');
      const url = `${endpoint}/${id}`;
      const { data } = await axios.get<responseData>(url);

      if (
        data.proveedores == undefined ||
        data.proveedores.proveedor == undefined
      ) {
        return {
          Success: false,
          Status: HttpStatus.NOT_FOUND,
          Message: 'Proveedor no encontrado',
        };
      }

      const infoProveedor = data.proveedores.proveedor[0];
      let detalles: DetalleProveedorDto;

      if (infoProveedor.tipo_persona == 'JURIDICA') {
        detalles = await this.obtenerDetalleProveedor(
          infoProveedor.id_proveedor,
        );
      }

      const combinedData = {
        proveedor: infoProveedor,
        representante: detalles,
      };

      return {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Proveedor Encontrado',
        Data: combinedData,
      };
    } catch (error) {
      return {
        Success: false,
        Status: error.response?.status || 500,
        Message: error.message || 'Error al consultar el proveedor',
      };
    }
  }

  async obtenerDetalleProveedor(id: string): Promise<DetalleProveedorDto> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_PERSONA_NATURAL_PROVEEDOR',
      );
      const url = `${endpoint}/${id}`;
      const { data } = await axios.get<responseDetalleData>(url);

      if (
        data.personas_naturales == undefined ||
        data.personas_naturales.proveedor == undefined
      ) {
        return null;
      }

      return data.personas_naturales.proveedor[0];
    } catch (error) {
      return null;
    }
  }
}

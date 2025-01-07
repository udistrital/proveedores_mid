import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ProveedorDto } from './dto/proveedor.dto';
import { DetalleProveedorDto } from './dto/detalle-proveedor.dto';
import { ContratoPersonaDto } from './dto/contrato-persona.dto';
import { TipoPersonaDto } from './dto/tipo-persona.dto';

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

interface responseContratoData {
  contratos_personas: {
    contrato_persona: ContratoPersonaDto[];
  };
}

interface responseTipoPersonaData {
  Data: TipoPersonaDto[];
  Message: string;
  Status: string;
  Success: boolean;
}

@Injectable()
export class ContratistasService {
  constructor(private configService: ConfigService) { }

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
      const contratos = await this.obtenerContratoProveedor(infoProveedor.numero_documento);

      const tipoPersonaId = await this.obtenerTipoPersonaId(infoProveedor.tipo_persona);
      if (tipoPersonaId) {
        infoProveedor.tipo_persona_id = tipoPersonaId;
      }

      if (infoProveedor.tipo_persona == 'JURIDICA') {
        detalles = await this.obtenerDetalleProveedor(
          infoProveedor.id_proveedor,
        );
      }

      const combinedData = {
        proveedor: infoProveedor,
        representante: detalles,
        contratos: contratos,
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

  async obtenerContratoProveedor(id: string): Promise<ContratoPersonaDto[]> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_CONTRATOS_PERSONA',
      );
      const url = `${endpoint}/${id}`;
      const { data } = await axios.get<responseContratoData>(url);

      if (
        data.contratos_personas == undefined ||
        data.contratos_personas.contrato_persona == undefined
      ) {
        return null;
      }

      return [data.contratos_personas.contrato_persona[0]];

    } catch (error) {
      return null;
    }
  }

  async obtenerTipoPersonaId(tipo: string): Promise<number | null> {
    try {
      const endpoint: string = this.configService.get<string>(
        'ENDP_PARAMETROS_CRUD',
      );
      const TipoParametroId: string = this.configService.get<string>(
        'TIPO_PARAMETRO_ID',
      );

      const tipoFormat = this.formatText(tipo);
      const url = `${endpoint}/parametro?query=TipoParametroId:${TipoParametroId},Nombre:${tipoFormat}&limit=0`;

      const { data } = await axios.get<responseTipoPersonaData>(url);

      return data.Data[0].Id;
    } catch (error) {
      return null;
    }
  }

  formatText(text) {
    if (!text) return '';
    text = text.trim().toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

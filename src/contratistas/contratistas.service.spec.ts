import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ContratistasService } from './contratistas.service';
import { ProveedorDto } from './dto/proveedor.dto';
import { DetalleProveedorDto } from './dto/detalle-proveedor.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ContratistasService', () => {
  let service: ContratistasService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratistasService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'ENDP_PROVEEDORES') return 'http://proveedores-api';
              if (key === 'ENDP_PERSONA_NATURAL_PROVEEDOR')
                return 'http://persona-natural-api';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ContratistasService>(ContratistasService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('Debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('obtenerProveedor', () => {
    it('debería retornar datos de proveedor', async () => {
      const mockProveedorData: ProveedorDto = {
        id_proveedor: '123',
        ciudad_expedicion_documento: 'Bogotá D.C.',
        id_ciudad_contacto: '123',
        direccion: 'ABC',
        numero_documento: '123',
        nombre_estado: 'ACTIVO',
        numero_cuenta_bancaria: '123',
        id_estado: '1',
        nombre_completo_proveedor: 'CORPORACIÓN',
        ciudad_contacto: 'Bogotá',
        web: '',
        fecha_registro: '2027-01-12 - 11:17:00 AM',
        correo: 'abc@mail.com',
        id_entidad_bancaria: '123',
        tipo_persona: 'JURIDICA',
        tipo_cuenta_bancaria: 'CORRIENTE',
        fecha_ultima_modificacion: '2027-01-12 - 11:17:00 AM',
      };

      const mockDetalleData: DetalleProveedorDto = {
        segundo_apellido: 'RODRIGUEZ',
        tipo_documento: 'CÉDULA DE CIUDADANÍA',
        ciudad_expedicion_documento: 'Bogotá D.C.',
        genero: 'FEMENINO',
        numero_documento: '52706379',
        primer_apellido: 'RODRIGUEZ',
        segundo_nombre: 'JOSE',
        digito_verificacion: '1',
        id_tipo_documento: '1',
        id_ciudad_expedicion_documento: '123',
        primer_nombre: 'MARIA',
        id_proveedor_juridico: '123',
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: { proveedores: { proveedor: [mockProveedorData] } },
      });
      jest
        .spyOn(service, 'obtenerDetalleProveedor')
        .mockResolvedValueOnce(mockDetalleData);

      const result = await service.obtenerProveedor('123');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Proveedor Encontrado',
        Data: {
          proveedor: mockProveedorData,
          representante: mockDetalleData,
        },
      });
    });

    it('Debería retornar Not Found', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: {} });

      const result = await service.obtenerProveedor('1234');

      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.NOT_FOUND,
        Message: 'Proveedor no encontrado',
      });
    });

    it('Debería retornar errores', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.obtenerProveedor('123');

      expect(result).toEqual({
        Success: false,
        Status: 500,
        Message: 'Network error',
      });
    });
  });

  describe('obtenerDetalleProveedor', () => {
    it('Debería retornar datos detallados del proveedor', async () => {
      const mockDetalleData: DetalleProveedorDto = {
        segundo_apellido: 'RODRIGUEZ',
        tipo_documento: 'CÉDULA DE CIUDADANÍA',
        ciudad_expedicion_documento: 'Bogotá D.C.',
        genero: 'FEMENINO',
        numero_documento: '52706379',
        primer_apellido: 'RODRIGUEZ',
        segundo_nombre: 'JOSE',
        digito_verificacion: '1',
        id_tipo_documento: '1',
        id_ciudad_expedicion_documento: '123',
        primer_nombre: 'MARIA',
        id_proveedor_juridico: '123',
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: { personas_naturales: { proveedor: [mockDetalleData] } },
      });

      const result = await service.obtenerDetalleProveedor('123');

      expect(result).toEqual(mockDetalleData);
    });

    it('Debería retornar un null con un id incorrecto', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: {} });

      const result = await service.obtenerDetalleProveedor('invalid_id');

      expect(result).toBeNull();
    });

    it('Debería manejar errores y retornar null', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.obtenerDetalleProveedor('123');

      expect(result).toBeNull();
    });
  });
});

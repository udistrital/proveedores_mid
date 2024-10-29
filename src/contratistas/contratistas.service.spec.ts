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
              if (key === 'ENDP_CONTRATOS_PERSONA')
                return 'http://contratos-persona-api';
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
    const mockProveedorData: ProveedorDto = {
      id_proveedor: '123',
      ciudad_expedicion_documento: 'Bogotá D.C.',
      id_ciudad_contacto: '123',
      direccion: 'Calle 123 # 45-67',
      numero_documento: '123456789',
      nombre_estado: 'ACTIVO',
      numero_cuenta_bancaria: '123456789',
      id_estado: '1',
      nombre_completo_proveedor: 'EMPRESA EJEMPLO S.A.S',
      ciudad_contacto: 'Bogotá',
      web: 'www.ejemplo.com',
      fecha_registro: '2024-01-12 11:17:00',
      correo: 'contacto@ejemplo.com',
      id_entidad_bancaria: '1',
      tipo_persona: 'JURIDICA',
      tipo_cuenta_bancaria: 'CORRIENTE',
      fecha_ultima_modificacion: '2024-01-12 11:17:00'
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
      id_proveedor_juridico: '123'
    };

    const mockContratoData = {
      numero_contrato: 'CONT-2024-123',
      fecha_inicio: '2024-01-01',
      fecha_fin: '2024-12-31',
      valor_total: '100000000',
      estado: 'ACTIVO'
    };

    it('debería retornar datos de proveedor jurídico completos', async () => {
      mockedAxios.get.mockImplementation((url: string) => {
        if (url.includes('proveedores-api')) {
          return Promise.resolve({
            data: { proveedores: { proveedor: [mockProveedorData] } },
          });
        }
        if (url.includes('persona-natural-api')) {
          return Promise.resolve({
            data: { personas_naturales: { proveedor: [mockDetalleData] } },
          });
        }
        if (url.includes('contratos-persona-api')) {
          return Promise.resolve({
            data: { contratos_personas: { contrato_persona: [mockContratoData] } },
          });
        }
      });

      const result = await service.obtenerProveedor('123');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Proveedor Encontrado',
        Data: {
          proveedor: mockProveedorData,
          representante: mockDetalleData,
          contratos: [mockContratoData],
        },
      });
    });

    it('debería retornar datos de proveedor natural sin representante', async () => {
      const proveedorNatural: ProveedorDto = {
        ...mockProveedorData,
        tipo_persona: 'NATURAL',
        nombre_completo_proveedor: 'JUAN PEREZ',
      };
      
      mockedAxios.get.mockImplementation((url: string) => {
        if (url.includes('proveedores-api')) {
          return Promise.resolve({
            data: { proveedores: { proveedor: [proveedorNatural] } },
          });
        }
        if (url.includes('contratos-persona-api')) {
          return Promise.resolve({
            data: { contratos_personas: { contrato_persona: [mockContratoData] } },
          });
        }
      });

      const result = await service.obtenerProveedor('123');

      expect(result).toEqual({
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Proveedor Encontrado',
        Data: {
          proveedor: proveedorNatural,
          representante: undefined,
          contratos: [mockContratoData],
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
        id_proveedor_juridico: '123'
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

  describe('obtenerContratoProveedor', () => {
    const mockContratoData = {
      numero_contrato: 'CONT-2024-123',
      fecha_inicio: '2024-01-01',
      fecha_fin: '2024-12-31',
      valor_total: '100000000',
      estado: 'ACTIVO'
    };

    it('Debería retornar datos del contrato del proveedor', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { contratos_personas: { contrato_persona: [mockContratoData] } },
      });

      const result = await service.obtenerContratoProveedor('123');

      expect(result).toEqual([mockContratoData]);
    });

    it('Debería retornar null cuando no hay contratos', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: {} });

      const result = await service.obtenerContratoProveedor('invalid_id');

      expect(result).toBeNull();
    });

    it('Debería manejar errores y retornar null', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await service.obtenerContratoProveedor('123');

      expect(result).toBeNull();
    });
  });
});
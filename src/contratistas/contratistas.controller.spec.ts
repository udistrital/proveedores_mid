import { Test, TestingModule } from '@nestjs/testing';
import { ContratistasController } from './contratistas.controller';
import { ContratistasService } from './contratistas.service';
import { HttpStatus } from '@nestjs/common';

describe('ContratistasController', () => {
  let controller: ContratistasController;
  let service: ContratistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratistasController],
      providers: [
        {
          provide: ContratistasService,
          useValue: {
            obtenerProveedor: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ContratistasController>(ContratistasController);
    service = module.get<ContratistasService>(ContratistasService);
  });

  it('Deberia estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('encontrarContratista', () => {
    it('Deberia retornar Bad Request cuando no se entregue un Id valido', async () => {
      const result = await controller.encontrarContratista('');
      expect(result).toEqual({
        Success: false,
        Status: HttpStatus.BAD_REQUEST,
        Message: 'El id es requerido',
      });
    });

    it('Deberia llamar al metodo obtenerProveedor en el servicio con el id', async () => {
      const mockId = '1234567890';
      const mockResponse = {
        Success: true,
        Status: HttpStatus.OK,
        Message: 'Proveedor Encontrado',
      };
      jest.spyOn(service, 'obtenerProveedor').mockResolvedValue(mockResponse);

      const result = await controller.encontrarContratista(mockId);

      expect(service.obtenerProveedor).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockResponse);
    });
  });
});

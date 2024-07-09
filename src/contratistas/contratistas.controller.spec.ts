import { Test, TestingModule } from '@nestjs/testing';
import { ContratistasController } from './contratistas.controller';
import { ContratistasService } from './contratistas.service';

describe('ContratistasController', () => {
  let controller: ContratistasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratistasController],
      providers: [ContratistasService],
    }).compile();

    controller = module.get<ContratistasController>(ContratistasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

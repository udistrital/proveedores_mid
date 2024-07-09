import { Test, TestingModule } from '@nestjs/testing';
import { ContratistasService } from './contratistas.service';

describe('ContratistasService', () => {
  let service: ContratistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratistasService],
    }).compile();

    service = module.get<ContratistasService>(ContratistasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

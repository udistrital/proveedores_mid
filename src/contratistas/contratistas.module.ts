import { Module } from '@nestjs/common';
import { ContratistasService } from './contratistas.service';
import { ContratistasController } from './contratistas.controller';

@Module({
  controllers: [ContratistasController],
  providers: [ContratistasService],
})
export class ContratistasModule {}

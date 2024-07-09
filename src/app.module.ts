import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratistasModule } from './contratistas/contratistas.module';

@Module({
  imports: [ContratistasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

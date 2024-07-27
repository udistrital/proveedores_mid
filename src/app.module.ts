import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContratistasModule } from './contratistas/contratistas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ContratistasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

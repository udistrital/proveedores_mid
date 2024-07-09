import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContratistasService } from './contratistas.service';
import { CreateContratistaDto } from './dto/create-contratista.dto';
import { UpdateContratistaDto } from './dto/update-contratista.dto';

@Controller('contratistas')
export class ContratistasController {
  constructor(private readonly contratistasService: ContratistasService) {}

  @Post()
  create(@Body() createContratistaDto: CreateContratistaDto) {
    return this.contratistasService.create(createContratistaDto);
  }

  @Get()
  findAll() {
    return this.contratistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contratistasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContratistaDto: UpdateContratistaDto) {
    return this.contratistasService.update(+id, updateContratistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contratistasService.remove(+id);
  }
}

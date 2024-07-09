import { Injectable } from '@nestjs/common';
import { CreateContratistaDto } from './dto/create-contratista.dto';
import { UpdateContratistaDto } from './dto/update-contratista.dto';

@Injectable()
export class ContratistasService {
  create(createContratistaDto: CreateContratistaDto) {
    return 'This action adds a new contratista';
  }

  findAll() {
    return `This action returns all contratistas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contratista`;
  }

  update(id: number, updateContratistaDto: UpdateContratistaDto) {
    return `This action updates a #${id} contratista`;
  }

  remove(id: number) {
    return `This action removes a #${id} contratista`;
  }
}

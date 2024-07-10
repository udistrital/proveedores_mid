import { Injectable } from '@nestjs/common';
import { ListaContratistasDto } from './dto/lista-contratistas.dto';
import { PersonaNaturalDto } from './dto/persona-natural.dto';
import { PersonaJuridicaDto } from './dto/persona-juridica.dto';
import { informacionPersonaJuridica, informacionPersonaNatural } from './mocks';

@Injectable()
export class ContratistasService {
  obtenerListado() {
    //Llamar al endpoint de persona_natural
    //Llamar al endpoint de persona_juridica

    //Combinar los resultados
    return this.combinarResultados(
      informacionPersonaNatural,
      informacionPersonaJuridica,
    );
  }

  obtenerPersonaNatural(id: string) {
    //Llamar al endpoint de persona_natural
    return informacionPersonaNatural.find(
      (personaNatural) => `${personaNatural.Id}` === id,
    );
  }

  obtenerPersonaJuridica(id: string) {
    //Llamar al endpoint de persona_juridica
    return informacionPersonaJuridica.find(
      (personaJuridica) => `${personaJuridica.Id}` === id,
    );
  }

  combinarResultados(
    listaPersonaNatural: PersonaNaturalDto[],
    listaPersonaJuridica: PersonaJuridicaDto[],
  ): ListaContratistasDto[] {
    const ids = new Set<string>();

    return [
      ...listaPersonaNatural.map((personaNatural) => {
        if (ids.has(`${personaNatural.Id}`)) {
          throw new Error(`El id ${personaNatural.Id} ya existe en la lista`);
        }
        ids.add(`${personaNatural.Id}`);
        return {
          id: `${personaNatural.Id}`,
          nombre: `${personaNatural.PrimerNombre} ${personaNatural.SegundoNombre} ${personaNatural.PrimerApellido} ${personaNatural.SegundoApellido}`,
          tipo: 'persona_natural',
        };
      }),
      ...listaPersonaJuridica.map((personaJuridica) => {
        if (ids.has(`${personaJuridica.Id}`)) {
          throw new Error(`El id ${personaJuridica.Id} ya existe en la lista`);
        }

        ids.add(`${personaJuridica.Id}`);
        return {
          id: `${personaJuridica.Id}`,
          nombre: `${personaJuridica.NomProveedor}`,
          tipo: 'persona_juridica',
        };
      }),
    ];
  }
}

export interface PersonaNaturalDto {
  TipoDocumento: TipoDocumento;
  Id: string;
  DigitoVerificacion: number;
  PrimerApellido: string;
  SegundoApellido: string;
  PrimerNombre: string;
  SegundoNombre: string;
  Cargo: string;
  IdPaisNacimiento: number;
  Perfil: Perfil;
  Profesion: string;
  Especialidad: string;
  MontoCapitalAutorizado: number;
  Genero: string;
  GrupoEtnico: string;
  ComunidadLgbt: boolean;
  CabezaFamilia: boolean;
  PersonasACargo: boolean;
  NumeroPersonasACargo: number;
  EstadoCivil: string;
  Discapacitado: boolean;
  TipoDiscapacidad: string;
  DeclaranteRenta: boolean;
  MedicinaPrepagada: boolean;
  ValorUvtPrepagada: number;
  CuentaAhorroAfc: boolean;
  NumCuentaBancariaAfc: string;
  IdEntidadBancariaAfc: number;
  InteresViviendaAfc: number;
  DependienteHijoMenorEdad: boolean;
  DependienteHijoMenos23Estudiando: boolean;
  DependienteHijoMas23Discapacitado: boolean;
  DependienteConyuge: boolean;
  DependientePadreOHermano: boolean;
  IdNucleoBasico: number;
  IdArl: number;
  IdEps: number;
  IdFondoPension: number;
  IdCajaCompensacion: number;
  FechaExpedicionDocumento: string;
  IdCiudadExpedicionDocumento: number;
}

export interface TipoDocumento {
  Id: number;
  ClaseParametro: string;
  ValorParametro: string;
  DescripcionParametro: string;
  Abreviatura: string;
}

export interface Perfil {
  Id: number;
  ClaseParametro: string;
  ValorParametro: string;
  DescripcionParametro: string;
  Abreviatura: string;
}

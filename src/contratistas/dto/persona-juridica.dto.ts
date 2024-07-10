export interface PersonaJuridicaDto {
  Id: string;
  DigitoVerificacion: number;
  ProcedenciaEmpresa: string;
  IdCiudadOrigen: number;
  CodigoPaisDian: number;
  CodigoPostal: number;
  TipoIdentificacionExtranjera: string;
  NumCedulaExtranjeria: number;
  NumPasaporte: number;
  IdTipoConformacion: IdTipoConformacion;
  MontoCapitalAutorizado: number;
  ExclusividadProducto: boolean;
  RegimenContributivo: string;
  Pyme: boolean;
  RegistroMercantil: boolean;
  SujetoRetencion: boolean;
  AgenteRetenedor: boolean;
  ResponsableICA: boolean;
  ResponsableIVA: boolean;
  Genero: string;
  NomProveedor: string;
}

export interface IdTipoConformacion {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Estado: string;
}

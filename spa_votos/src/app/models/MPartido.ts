export class MPartido {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  imagenPartido: MImagenPartido | undefined;
  activo: boolean = false;
  nombreCandidato: string = '';
  apellidoCandidato: string = '';
  urlImg : string = '';
  propuestas: MPropuesta[] = [];
}

export class MPropuesta {
  id: number = 0;
  nombreCorto: string = '';
  descripcion: string = '';
  idPartido: number = 0;
  activo: boolean = true;
}

export class MImagenPartido {
  id: number = 0;
  data: string = '';
  fileName: string = '';
  contentType: string = '';
  idPartido: number = 0;
}

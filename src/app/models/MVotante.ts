export class MVotante{
    id: number = 0;
    curp: string = '';
    claveLector: string = '';
    seccion: string = '';
    activo: boolean = false;

    casilla: MCasilla | undefined;
}

export class MCasilla{
    id: number = 0;
    seccion: string = '';
    fechaInicio: Date | undefined;
    fechaFin: Date | undefined;
    activo: boolean = false;
    idUsuario: number = 0;
}

export class MVoto{
    id: number = 0;
    idVotante: number = 0;
    idPartido: number = 0;
    fechaRegistro: Date | undefined;

    seccion: string = '';
}
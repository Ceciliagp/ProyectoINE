export class MUsuario {
    id: number = 0;
    nombre: string = '';
    apellido: string = '';
    nombreUsuario: string = '';
    contrasenia: string = '';
    activo: boolean = true;
    idRol: number = 0;
    rol: MRol | undefined;
}

export class MRol {
    id: number = 0;
    rol: string = ''
    activo: boolean = true;
}
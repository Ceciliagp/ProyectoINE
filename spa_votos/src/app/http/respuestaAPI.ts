export class RespuestaApi<T> {
  exitoso: boolean;
  contenido: T | undefined;
  respuesta: string | undefined;

  constructor(content?: T, message?: string) {
    this.exitoso = content !== undefined;
    this.contenido = content;
    this.respuesta = message;
  }

  error(message: string): RespuestaApi<T> {
    return new RespuestaApi<T>(undefined, message);
  }
  error404(message: string): RespuestaApi<T> {
    return new RespuestaApi<T>(undefined, message);
  }
}


export class Respuesta{
  mensaje: string | undefined;
  esExito = false;
  esError = false;
}
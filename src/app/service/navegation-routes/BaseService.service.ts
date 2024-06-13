import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespuestaApi } from '../../http/respuestaAPI';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  public handleError<T>(error: HttpErrorResponse): Observable<RespuestaApi<T>> {
    let response: RespuestaApi<T>;

    if (error.status === 404) {
      response = new RespuestaApi<T>().error404('Error [404]: Servicio no encontrado.');
    } else if(error.status === 401){
      response = new RespuestaApi<T>().error('Error [401]: Autenticación');
    }else if(error.status === 0){
      response = new RespuestaApi<T>().error('Servicio No Disponible, intente más tarde.');
    }else {
      response = new RespuestaApi<T>().error(error.message);
    }

    return of(response);
  }
}

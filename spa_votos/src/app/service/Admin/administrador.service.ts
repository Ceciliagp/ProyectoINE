import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { MUsuario } from '../../models/MUsuario';
import { Observable, catchError } from 'rxjs';
import { Respuesta, RespuestaApi } from '../../http/respuestaAPI';
import { EndpointCasilla, EndpointUsuario } from '../shared/constans';
import { API } from '../../appConfig';
import { MCasilla } from '../../models/MVotante';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(
    private http: HttpClient,
    private serviceBase : BaseService
  ) { }

  getValidationUser(model: MUsuario): Observable<RespuestaApi<MUsuario>>{
    return this.http.post<RespuestaApi<MUsuario>>(`${API.get_url(EndpointUsuario.VERIFICACION_LOGIN)}`, model)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<MUsuario>(err))
    );
  }

  postCasilla(modelo: MCasilla): Observable<RespuestaApi<Respuesta>>{
    return this.http.post<RespuestaApi<Respuesta>>(`${API.get_url(EndpointCasilla.BASE)}`, modelo)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Respuesta>(err))
    );
  }

  getCasillas(): Observable<RespuestaApi<Array<MCasilla>>>{
    return this.http.get<RespuestaApi<Array<MCasilla>>>(`${API.get_url(EndpointCasilla.BASE)}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Array<MCasilla>>(err))
    );
  }

  postFuncionario(modelo: MUsuario): Observable<RespuestaApi<Respuesta>>{
    return this.http.post<RespuestaApi<Respuesta>>(`${API.get_url(EndpointUsuario.BASE)}`, modelo)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Respuesta>(err))
    );
  }

  getFuncionarios(): Observable<RespuestaApi<Array<MUsuario>>>{
    return this.http.get<RespuestaApi<Array<MUsuario>>>(`${API.get_url(EndpointUsuario.GET_FUNCIONARRIOS)}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Array<MUsuario>>(err))
    );
  }

  deleteUsuario(id: number): Observable<RespuestaApi<Respuesta>> {
    return this.http
      .delete<RespuestaApi<Respuesta>>(
        `${API.get_url(EndpointUsuario.BASE)}?id=${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.serviceBase.handleError<Respuesta>(err)
        )
      );
  }

  deleteCasilla(id: number): Observable<RespuestaApi<Respuesta>> {
    return this.http
      .delete<RespuestaApi<Respuesta>>(
        `${API.get_url(EndpointCasilla.BASE)}?id=${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.serviceBase.handleError<Respuesta>(err)
        )
      );
  }

  setUsuarioStorage(usuario: MUsuario | undefined) {
    const user = JSON.stringify(usuario);
    localStorage.setItem('userVerification', user);
  }

  getUsuarioFromStorage(): MUsuario | undefined {
    const user = localStorage.getItem('userVerification');
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  }

  removeUser() {
    localStorage.removeItem('userVerification');
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { MUsuario } from '../../models/MUsuario';
import { Observable, catchError } from 'rxjs';
import { RespuestaApi } from '../../http/respuestaAPI';
import { EndpointUsuario } from '../shared/constans';
import { API } from '../../appConfig';

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

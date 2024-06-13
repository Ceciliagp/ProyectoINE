import { Injectable } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MVerificacionVotante } from '../../models/MVerificacionVotante';
import { Observable, catchError } from 'rxjs';
import { API } from '../../appConfig';
import { Respuesta, RespuestaApi } from '../../http/respuestaAPI';
import { MVotante, MVoto } from '../../models/MVotante';
import { EndpointPartidos, EndpointVotante } from '../shared/constans';
import { MPartido } from '../../models/MPartido';

@Injectable({
  providedIn: 'root'
})
export class VotanteService {

  constructor(
    private http: HttpClient,
    private serviceBase : BaseService
  ) { }

  getValidationUser(curp: string, seccion: string): Observable<RespuestaApi<MVotante>>{
    return this.http.get<RespuestaApi<MVotante>>(`${API.get_url(EndpointVotante.VALIDAR_VOTANTE)}?curp=${curp}&seccion=${seccion}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<MVotante>(err))
    );
  }

  getPartidos(): Observable<RespuestaApi<Array<MPartido>>>{
    return this.http.get<RespuestaApi<Array<MPartido>>>(`${API.get_url(EndpointPartidos.BASE)}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Array<MPartido>>(err))
    );
  }

  postEjercerVoto(modelo: MVoto): Observable<RespuestaApi<Respuesta>>{
    return this.http.post<RespuestaApi<Respuesta>>(`${API.get_url(EndpointVotante.BASE)}`, modelo)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Respuesta>(err))
    );
  }

  setVotanteStorage(usuario: MVotante | undefined) {
    const user = JSON.stringify(usuario);
    localStorage.setItem('votanteVerification', user);
  }

  getVotanteFromStorage(): MVotante | undefined {
    const user = localStorage.getItem('votanteVerification');
    if (user) {
      return JSON.parse(user);
    } else {
      return undefined;
    }
  }

  removeVotante() {
    localStorage.removeItem('votanteVerification');
  }
}

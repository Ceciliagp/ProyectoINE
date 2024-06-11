import { Injectable } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MVerificacionVotante } from '../../models/MVerificacionVotante';
import { Observable, catchError } from 'rxjs';
import { API } from '../../appConfig';
import { RespuestaApi } from '../../http/respuestaAPI';
import { MVotante } from '../../models/MVotante';
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

  getValidationUser(model: MVerificacionVotante): Observable<RespuestaApi<MVotante>>{
    return this.http.post<RespuestaApi<MVotante>>(`${API.get_url(EndpointVotante.VALIDAR_VOTANTE)}`, model)
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
}

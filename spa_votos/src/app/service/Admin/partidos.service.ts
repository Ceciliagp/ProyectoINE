import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { MPartido } from '../../models/MPartido';
import { Respuesta, RespuestaApi } from '../../http/respuestaAPI';
import { Observable, catchError } from 'rxjs';
import { API } from '../../appConfig';
import { EndpointPartidos } from '../shared/constans';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
 
  constructor(
    private http: HttpClient,
    private serviceBase : BaseService
  ) { }

  getPartidos(): Observable<RespuestaApi<Array<MPartido>>>{
    return this.http.get<RespuestaApi<Array<MPartido>>>(`${API.get_url(EndpointPartidos.BASE)}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Array<MPartido>>(err))
    );
  }

  deletePartido(id: number): Observable<RespuestaApi<Respuesta>>{
    return this.http.delete<RespuestaApi<Respuesta>>(`${API.get_url(EndpointPartidos.BASE)}?id=${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => this.serviceBase.handleError<Respuesta>(err))
    );
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../navegation-routes/BaseService.service';
import { MPartido } from '../../models/MPartido';
import { Respuesta, RespuestaApi } from '../../http/respuestaAPI';
import { Observable, catchError } from 'rxjs';
import { API } from '../../appConfig';
import { EndpointPartidos } from '../shared/constans';

@Injectable({
  providedIn: 'root',
})
export class PartidosService {
  constructor(private http: HttpClient, private serviceBase: BaseService) {}

  getPartidos(): Observable<RespuestaApi<Array<MPartido>>> {
    return this.http
      .get<RespuestaApi<Array<MPartido>>>(
        `${API.get_url(EndpointPartidos.BASE)}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.serviceBase.handleError<Array<MPartido>>(err)
        )
      );
  }

  deletePartido(id: number): Observable<RespuestaApi<Respuesta>> {
    return this.http
      .delete<RespuestaApi<Respuesta>>(
        `${API.get_url(EndpointPartidos.BASE)}?id=${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.serviceBase.handleError<Respuesta>(err)
        )
      );
  }

  crearPartido(
    partido: MPartido,
    file: File
  ): Observable<RespuestaApi<Respuesta>> {
    const headers = new HttpHeaders();

    const formData = new FormData();
    formData.append('nombre', partido.nombre);
    formData.append('descripcion', partido.descripcion);
    formData.append('nombreCandidato', partido.nombreCandidato);
    formData.append('apellidoCandidato', partido.apellidoCandidato);
    partido.propuestas.forEach((propuesta, index) => {
      formData.append(`propuestas[${index}].nombreCorto`, propuesta.nombreCorto);
      formData.append(`propuestas[${index}].descripcion`, propuesta.descripcion);
      formData.append(`propuestas[${index}].activo`, 'true');
    });
    formData.append('file', file);

    return this.http
      .post<RespuestaApi<Respuesta>>(
        `${API.get_url(EndpointPartidos.BASE)}`,
        formData
      )
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.serviceBase.handleError<Respuesta>(err)
        )
      );
  }
}

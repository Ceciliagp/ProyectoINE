import { Component, OnInit } from '@angular/core';
import { MImagenPartido, MPartido } from '../../../models/MPartido';
import { VotanteService } from '../../../service/Votante/votante.service';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';
import { MVotante, MVoto } from '../../../models/MVotante';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  listaPartidos: Array<MPartido> = [];
  mostrarSpiner = false;
  colorSpiner: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  errorMsj: string | undefined;
  goodMsj: string | undefined;
  mVotante : MVotante | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _votanteService: VotanteService,
    private _snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    const votante = this._votanteService.getVotanteFromStorage();

    if (votante === undefined) {
      this.GoToBack();
      return;
    }

    this.VerificarVotante(votante.curp, votante.seccion);
  }

  GoToBack() {
    window.history.back();
  }

  VerificarVotante(curp: string, seccion: string) {
    this._votanteService.getValidationUser(curp, seccion).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this.mVotante = data.contenido;
          this.getPartidos();
        } else {
          this.errorMsj =
            data.respuesta ?? 'Ha ocurrido un error con el servicio.';
          this._snackBar.mostrarSnackBar(this.errorMsj, 'Aceptar', 5000);
        }
      } else {
        this.errorMsj = 'Ha ocurrido un error inesperado, intente nuevamente.';
        this._snackBar.mostrarSnackBar(this.errorMsj);
      }
    });
  }

  getPartidos() {
    this.mostrarSpiner = true;
    this._votanteService.getPartidos().subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this.listaPartidos = data?.contenido ?? [];
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante de la consulta de los Partidos, intente nuevamente.'
          );
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
      }
      this.mostrarSpiner = false;
    });
  }

  onClickEjercerVoto(idPartido: number) {
    const modelo = new MVoto();
    modelo.idPartido = idPartido;
    modelo.idVotante = this.mVotante?.id ?? 0;
    modelo.seccion = this.mVotante?.seccion ?? '';
    this._votanteService.postEjercerVoto(modelo).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this.goodMsj = 'Se ha registrado su Voto correctamente.'
          this._snackBar.mostrarSnackBar(this.goodMsj, 'Aceptar', 5000);
          this.listaPartidos = [];
        } else {
          this.errorMsj =
            data.respuesta ?? 'Ha ocurrido un error con el servicio.';
          this._snackBar.mostrarSnackBar(this.errorMsj, 'Aceptar', 5000);
        }
      } else {
        this.errorMsj = 'Ha ocurrido un error inesperado, intente nuevamente.';
        this._snackBar.mostrarSnackBar(this.errorMsj);
      }
    });
  }

  getImagenUrl(imagenPartido: MImagenPartido): string {
    return `https://cede.izt.uam.mx/wp-content/uploads/2023/01/PAN.png`;
  }
}

import { Component, OnInit } from '@angular/core';
import { MImagenPartido, MPartido } from '../../../models/MPartido';
import { VotanteService } from '../../../service/Votante/votante.service';
import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  listaPartidos: Array<MPartido> = [];
  mostrarSpiner = false;
  colorSpiner: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(
    private _route: ActivatedRoute,
    private _votanteService: VotanteService,
    private _snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.getPartidos();
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

  getImagenUrl(imagenPartido: MImagenPartido): string {
    return `https://cede.izt.uam.mx/wp-content/uploads/2023/01/PAN.png`;
  }
}

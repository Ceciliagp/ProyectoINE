import { Component, OnInit, ViewChild } from '@angular/core';
import { MRol, MUsuario } from '../../../models/MUsuario';
import { AdministradorService } from '../../../service/Admin/administrador.service';
import { PartidosService } from '../../../service/Admin/partidos.service';
import { MPartido } from '../../../models/MPartido';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  mUsuario: MUsuario | undefined;
  mRol: MRol | undefined;
  esPartidos = false;
  esDashBoard = true;
  esFuncionario = false;
  esCrearFuncionario = false;
  mostrarSpiner = false;
  listaPartidos: Array<MPartido> = [];
  tituloSideNavPartidos = '';
  formEdicion: any;
  selectedFile: File | null = null;

  @ViewChild('sidenavEdicion', { static: true }) sidenav: MatSidenav | undefined;

  constructor(
    private _adminService: AdministradorService,
    private _partidoService: PartidosService,
    private _snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.mUsuario = this._adminService.getUsuarioFromStorage();

    if (this.mUsuario === undefined) {
      this.GoToBack();
      return;
    }

    this.mRol = this.mUsuario.rol;
    this.esFuncionario = this.mRol?.rol === 'FUNCIONARIO';
    this.getPartidos();
  }

  GoToBack() {
    window.history.back();
  }

  onClicListPartidos() {
    this.esPartidos = true;
    this.esDashBoard = false;
    this.esCrearFuncionario = false;
  }

  onClicListFuncionarioCasilla() {
    this.esPartidos = false;
    this.esDashBoard = false;
    this.esCrearFuncionario = true;
  }

  onClicListDashBoard() {
    this.esPartidos = false;
    this.esDashBoard = true;
    this.esCrearFuncionario = false;
  }

  getPartidos() {
    this.mostrarSpiner = true;
    this._partidoService.getPartidos().subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this.listaPartidos = data?.contenido ?? [];
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante de la consulta del Carrito de Compra, intente nuevamente.'
          );
          this.mostrarSpiner = false;
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
        this.mostrarSpiner = false;
      }
    });
  }

  onClickEliminarPartido(id: number) {
    this._partidoService.deletePartido(id).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha eliminado Correctamente el Partido'
          );
          this.getPartidos();
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante la Eliminación del Partido, intente nuevamente.'
          );
          this.mostrarSpiner = false;
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
        this.mostrarSpiner = false;
      }
    });
  }
  
  onClickBtnNuevoPartido(): void {

    if (!this.sidenav?.opened) {
      this.tituloSideNavPartidos = 'Nuevo Partido';
      this.sidenav?.open();
    } else {
      // this.formEdicion.reset();
      // this.autoridadEmisoraEdicion = undefined;
      this.tituloSideNavPartidos = 'Nuevo Partido';
    }
  }

  onClickBtnCerrarSidenavPartido(){
    this.sidenav?.close()
      .then(() => {
        // this.formEdicion.reset();
        // this.autoridadEmisoraEdicion = undefined;
        this.tituloSideNavPartidos = 'Nuevo Partido';
      });
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.processFiles(files);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.processFiles(files);
  }

  processFiles(files: FileList) {
    if (files.length > 1) {
      this._snackBar.mostrarSnackBar('Solo se puede seleccionar 1 archivo.');
      return;
    }

    const archivo = files[0];
    if (archivo.type.startsWith('image/')) {
      const tamanioEnMb = 10;
      const tamanioArc = archivo.size / 1000000;
      let ext = archivo.name.split('.').pop();

      if (tamanioArc > tamanioEnMb) {
        this._snackBar.mostrarSnackBar(
          'El tamaño máximo permitido es de ' + tamanioEnMb + 'MB'
        );
        return;
      }

      this.selectedFile = archivo;
      this.formEdicion.controls['fileName'].setValue(archivo.name);
      this._snackBar.mostrarSnackBar('Se ha cargado correctamente el archivo.');
    } else {
      this._snackBar.mostrarSnackBar(
        'Por favor, seleccione una imagen.'
      );
    }
  }
}

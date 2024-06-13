import { Component, OnInit, ViewChild } from '@angular/core';
import { MRol, MUsuario } from '../../../models/MUsuario';
import { AdministradorService } from '../../../service/Admin/administrador.service';
import { PartidosService } from '../../../service/Admin/partidos.service';
import { MImagenPartido, MPartido, MPropuesta } from '../../../models/MPartido';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MCasilla } from '../../../models/MVotante';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  mUsuario: MUsuario | undefined;
  mRol: MRol | undefined;
  imagenPartido: MImagenPartido | undefined;
  esPartidos = false;
  esDashBoard = true;
  esFuncionario = false;
  esCrearFuncionario = false;
  mostrarSpiner = false;
  listaPartidos: Array<MPartido> = [];
  tituloSideNavPartidos = '';
  formEdicion: any;
  formEdicionFuncionario: any;
  formCasilla: any;
  formPropuesta: any;
  selectedFile: File | null = null;
  submitted = false;
  propuestas: Array<MPropuesta> = [];
  listaFuncionarios: Array<MUsuario> = [];
  tituloSideNavFuncionario = '';
  casillas: Array<MCasilla> = [];
  tituloSideNavCasilla = '';

  @ViewChild('sidenavEdicion', { static: true }) sidenav:
    | MatSidenav
    | undefined;
  @ViewChild('sidenavEdicionFuncionario', { static: true }) sidenavFuncionario:
    | MatSidenav
    | undefined;
    @ViewChild('sidenavEdicionCasilla', { static: true }) sidenavCasilla:
    | MatSidenav
    | undefined;

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
    this.iniciarFormEdicion();
    this.iniciarFormEdicionFuncionario();
    this.iniciarFormEdicionProp();
    this.iniciarFormEdicionCasilla();
    this.getPartidos();
    this.getFuncionarios();
    this.getCasillas();
  }

  private iniciarFormEdicionCasilla() {
    this.formCasilla = new FormGroup({
      seccion: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl('', [Validators.required]),
    });
  }

  private iniciarFormEdicion() {
    this.formEdicion = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
      candidato: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fileName: new FormControl('', [Validators.required]),
    });
  }

  private iniciarFormEdicionFuncionario() {
    this.formEdicionFuncionario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl(''),
      usuarioFun: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required]),
      idRol: new FormControl(1),
    });
  }

  private iniciarFormEdicionProp() {
    this.formPropuesta = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
    });
  }

  get seccionFunControl(): FormControl {
    return this.formCasilla.get('seccion') as FormControl;
  }

  get fechaFinControl(): FormControl {
    return this.formCasilla.get('fechaFin') as FormControl;
  }

  get fechaInicioControl(): FormControl {
    return this.formCasilla.get('fechaInicio') as FormControl;
  }

  get usuarioFunControl(): FormControl {
    return this.formEdicionFuncionario.get('usuarioFun') as FormControl;
  }

  get contraseniaControl(): FormControl {
    return this.formEdicionFuncionario.get('contrasenia') as FormControl;
  }

  get nomFunControl(): FormControl {
    return this.formEdicionFuncionario.get('nombre') as FormControl;
  }

  get apeFunControl(): FormControl {
    return this.formEdicionFuncionario.get('apellido') as FormControl;
  }

  get nombreControl(): FormControl {
    return this.formEdicion.get('nombre') as FormControl;
  }

  get descripcionControl(): FormControl {
    return this.formEdicion.get('descripcion') as FormControl;
  }

  get candidatoControl(): FormControl {
    return this.formEdicion.get('candidato') as FormControl;
  }

  get apellidoControl(): FormControl {
    return this.formEdicion.get('apellido') as FormControl;
  }

  get fileNameControl(): FormControl {
    return this.formEdicion.get('fileName') as FormControl;
  }

  get nomPropControl(): FormControl {
    return this.formPropuesta.get('nombre') as FormControl;
  }

  get descPropControl(): FormControl {
    return this.formPropuesta.get('descripcion') as FormControl;
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
          // this.listaPartidos.forEach(e => {
          //   e.urlImg = e.imagenPartido?.data
          // });
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante de la consulta de los Partidos, intente nuevamente.'
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

  getFuncionarios() {
    this.mostrarSpiner = true;
    this._adminService.getFuncionarios().subscribe((data) => {
      //CORREGIS ESTA PARTE DEL CÓDIGO
      if (data) {
        if (data.exitoso) {
          this.listaFuncionarios = data?.contenido ?? [];
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante de la consulta de los Funcionarios, intente nuevamente.'
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
      this.formEdicion.reset();
      this.selectedFile = null;
      this.tituloSideNavPartidos = 'Nuevo Partido';
      this.sidenav?.open();
    } else {
      this.formEdicion.reset();
      this.selectedFile = null;
      // this.autoridadEmisoraEdicion = undefined;
      this.tituloSideNavPartidos = 'Nuevo Partido';
    }
  }

  onClickBtnCerrarSidenavPartido() {
    this.sidenav?.close().then(() => {
      this.formEdicion.reset();
      this.selectedFile = null;
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
      this._snackBar.mostrarSnackBar('Por favor, seleccione una imagen.');
    }
  }

  onClickGuardarPartido() {
    this.submitted = true;
    this.formEdicion.markAllAsTouched();
    if (this.formEdicion.valid && this.formEdicion.dirty) {
      const mPartido = new MPartido();
      mPartido.nombre = this.nombreControl.value;
      mPartido.descripcion = this.descripcionControl.value;
      mPartido.nombreCandidato = this.candidatoControl.value;
      mPartido.apellidoCandidato = this.apellidoControl.value;

      if (this.selectedFile === null) {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error en la obtención de la imagen'
        );
        return;
      }
      mPartido.propuestas = this.propuestas;
      this.CrearPartido(mPartido, this.selectedFile);
    } else {
      this._snackBar.mostrarSnackBar('Verifique los datos solicitados.');
    }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.imagenPartido = {
        id: 0,
        data: base64String,
        fileName: file.name,
        contentType: file.type,
        idPartido: 0,
      };
    };
    reader.readAsDataURL(file);
  }

  CrearPartido(modelo: MPartido, file: File) {
    this._partidoService.crearPartido(modelo, file).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha Ingresado Correctamente el Partido'
          );
          this.onClickBtnCerrarSidenavPartido();
          this.getPartidos();
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante la Creación del Partido, intente nuevamente.'
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

  onClickAgregarPropuesta() {
    this.formPropuesta.markAllAsTouched();
    if (this.formPropuesta.valid && this.formPropuesta.dirty) {
      const nombre = this.nomPropControl.value;
      const descripcion = this.descPropControl.value;

      const propuesta = new MPropuesta();
      propuesta.descripcion = descripcion;
      propuesta.nombreCorto = nombre;

      if (this.propuestas.length === 0) {
        this.propuestas.push(propuesta);
        this.formPropuesta.reset();
        return;
      }

      const repetido = this.propuestas.find(
        (e) =>
          e.nombreCorto.trim().toLowerCase() === nombre.trim().toLowerCase()
      );

      if (repetido) {
        this._snackBar.mostrarSnackBar('Ya se encuentra en el listado.');
        return;
      }

      this.formPropuesta.reset();
      this.propuestas.push(propuesta);
    } else {
      this._snackBar.mostrarSnackBar(
        'Verifique los datos solicitados de la Propuesta.'
      );
    }
  }

  onClickBtnNuevoFuncionario() {
    if (!this.sidenavFuncionario?.opened) {
      this.formEdicionFuncionario.reset();
      this.tituloSideNavFuncionario = 'Nuevo Funcionario';
      this.sidenavFuncionario?.open();
    } else {
      this.formEdicionFuncionario.reset();
      this.tituloSideNavFuncionario = 'Nuevo Funcionario';
    }
  }

  onClickEliminarFuncionario(id: number) {
    this._adminService.deleteUsuario(id).subscribe((data) => {
      //CORREGIR ESTA PARTE DEL CÓDIGO
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha eliminado Correctamente el Usuario'
          );
          this.getFuncionarios();
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante la Eliminación del Usuarrio, intente nuevamente.'
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

  onClickBtnCerrarSidenavFuncionario() {
    this.sidenavFuncionario?.close().then(() => {
      this.formEdicionFuncionario.reset();
      this.tituloSideNavFuncionario = 'Nuevo Funcionario';
    });
  }

  onClickGuardarFuncionario() {
    this.formEdicionFuncionario.markAllAsTouched();
    if (
      this.formEdicionFuncionario.valid &&
      this.formEdicionFuncionario.dirty
    ) {
      const mUsuario = new MUsuario();
      mUsuario.nombre = this.nomFunControl.value;
      mUsuario.apellido = this.apeFunControl.value;
      mUsuario.nombreUsuario = this.usuarioFunControl.value;
      mUsuario.contrasenia = this.contraseniaControl.value;
      mUsuario.idRol = 2;
      this.crearFuncionario(mUsuario);
    } else {
      this._snackBar.mostrarSnackBar('Verifique los datos solicitados.');
    }
  }

  crearFuncionario(mUsuario: MUsuario) {
    this._adminService.postFuncionario(mUsuario).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha registrado al Funcionarrio correctamente.',
            'Aceptar',
            5000
          );
          this.onClickBtnCerrarSidenavFuncionario();
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ?? 'Ha ocurrido un error con el servicio.',
            'Aceptar',
            5000
          );
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
      }

      this.getFuncionarios();
    });
  }

  cerrarSesion() {
    this._adminService.removeUser();
    this.GoToBack();
  }

  onClickEliminarCasiila(id: number) {
    this._adminService.deleteCasilla(id).subscribe((data) => {
      //CORREGIR ESTA PARTE DEL CÓDIGO
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha eliminado Correctamente la Casilla'
          );
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante la Eliminación de la Casilla, intente nuevamente.'
          );
          this.mostrarSpiner = false;
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
        this.mostrarSpiner = false;
      }
      this.getCasillas();
    });
  }

  onClickBtnCerrarSidenavCasilla() {
    this.sidenavCasilla?.close().then(() => {
      this.formCasilla.reset();
      this.tituloSideNavFuncionario = 'Nuevo Funcionario';
    });
  }

  onClickBtnNuevoCasilla(){
    if (!this.sidenavCasilla?.opened) {
      this.formCasilla.reset();
      this.tituloSideNavCasilla = 'Nueva Casilla';
      this.sidenavCasilla?.open();
    } else {
      this.formCasilla.reset();
      this.tituloSideNavCasilla = 'Nuevo Casilla';
    }
  }

  onClickGuardarCasilla() {
    this.formCasilla.markAllAsTouched();
    if (
      this.formCasilla.valid &&
      this.formCasilla.dirty
    ) {
      const mcasilla = new MCasilla();
      mcasilla.seccion = this.seccionFunControl.value;
      mcasilla.activo = true;
      mcasilla.fechaInicio = this.fechaInicioControl.value;
      mcasilla.fechaFin = this.fechaFinControl.value;
      mcasilla.idUsuario = this.mUsuario?.id ?? 0;
      this.crearCasilla(mcasilla);
    } else {
      this._snackBar.mostrarSnackBar('Verifique los datos solicitados.');
    }
  }

  crearCasilla(modelo: MCasilla){
    this._adminService.postCasilla(modelo).subscribe((data) => {
      if (data) {
        if (data.exitoso) {
          this._snackBar.mostrarSnackBar(
            'Se ha registrado la Casilla correctamente.',
            'Aceptar',
            5000
          );
          this.onClickBtnCerrarSidenavCasilla();
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ?? 'Ha ocurrido un error con el servicio.',
            'Aceptar',
            5000
          );
        }
      } else {
        this._snackBar.mostrarSnackBar(
          'Ha ocurrido un error inesperado, intente nuevamente.'
        );
      }

      this.getCasillas();
    });
  }

  getCasillas() {
    this.mostrarSpiner = true;
    this._adminService.getCasillas().subscribe((data) => {
      //CORREGIS ESTA PARTE DEL CÓDIGO
      if (data) {
        if (data.exitoso) {
          this.casillas = data?.contenido ?? [];
        } else {
          this._snackBar.mostrarSnackBar(
            data.respuesta ??
              'Ha ocurrido un error durante de la consulta de las Casillas, intente nuevamente.'
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
}

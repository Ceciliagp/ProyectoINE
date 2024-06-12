import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavegationRoutesService } from '../../../service/navegation-routes/navegation-routes.service';
import { appRutesModule } from '../../../app.routes-names-module';
import { PanelAdminRoutesNames } from '../panelAdmin-routing.module';
import { AdministradorService } from '../../../service/Admin/administrador.service';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';
import { MUsuario } from '../../../models/MUsuario';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent implements OnInit {
  formEdicion: any;

  constructor(
    private navegatioRoute: NavegationRoutesService,
    private _adminService: AdministradorService,
    private _snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.iniciarFormEdicion();
  }

  private iniciarFormEdicion() {
    this.formEdicion = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required]),
    });
  }

  get usuarioControl(): FormControl {
    return this.formEdicion.get('usuario') as FormControl;
  }

  get contraseñaControl(): FormControl {
    return this.formEdicion.get('contrasenia') as FormControl;
  }

  OnClickBtnIngresar() {
    this.formEdicion.markAllAsTouched();
    if (this.formEdicion.valid && this.formEdicion.dirty) {

      const mUsuario = new MUsuario();
      mUsuario.nombreUsuario = this.usuarioControl.value;
      mUsuario.contrasenia = this.contraseñaControl.value;

      this._adminService
      .getValidationUser(mUsuario)
      .subscribe((data) => {
        if (data) {
          if (data.exitoso) {
            this._adminService.setUsuarioStorage(data.contenido);
            this.onGoDashboard();
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
      });
    } else {
      this._snackBar.mostrarSnackBar('Verifique los datos solicitados.');
    }
  }

  onGoDashboard() {
    this.navegatioRoute.navigateTo([
      appRutesModule.admin,
      PanelAdminRoutesNames.dashboard,
    ]);
  }
}

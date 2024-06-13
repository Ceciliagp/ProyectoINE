import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavegationRoutesService } from '../../../service/navegation-routes/navegation-routes.service';
import { appRutesModule } from '../../../app.routes-names-module';
import { PanelVotanteRoutesNames } from '../panelVotante-routing.module';
import { VotanteService } from '../../../service/Votante/votante.service';
import { SnackBarService } from '../../../../utils/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formEdicion: any;
  errorMsj: string | undefined;

  constructor(
    private navegatioRoute: NavegationRoutesService,
    private _votanteService: VotanteService,
    private _snackBar: SnackBarService,
  ){}

  ngOnInit(): void {
    this.iniciarFormEdicion();
  }

  private iniciarFormEdicion() {
    this.formEdicion = new FormGroup({
      curp: new FormControl('', [Validators.required, Validators.minLength(18),
        Validators.maxLength(18),
        this.curpValidator]),
      seccion: new FormControl('', [Validators.required, Validators.maxLength(25),
        this.seccionValidator]),
    });
  }

  curpValidator(control: FormControl): { [key: string]: boolean } | null {
    const curpPattern = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    if (control.value && !curpPattern.test(control.value)) {
      return { 'curpInvalido': true };
    }
    return null;
  }

  seccionValidator(control: FormControl): { [key: string]: boolean } | null {
    const seccionPattern = /^[0-9]+$/;
    if (control.value && !seccionPattern.test(control.value)) {
      return { 'seccionInvalida': true };
    }
    return null;
  }

  get curpControl(): FormControl {
    return this.formEdicion.get('curp') as FormControl;
  }

  get seccionControl(): FormControl {
    return this.formEdicion.get('seccion') as FormControl;
  }

  onClickVerificar(){
    const curp = this.curpControl.value;
    const seccion = this.seccionControl.value;
    this.formEdicion.markAllAsTouched();
    if(this.formEdicion.valid && this.formEdicion.dirty){
      this._votanteService
      .getValidationUser(curp, seccion)
      .subscribe((data) => {
        if (data) {
          if (data.exitoso) {
            this._votanteService.setVotanteStorage(data.contenido);
            this.onGoDashboard();
          } else {
            this.errorMsj = data.respuesta ?? 'Ha ocurrido un error con el servicio.'
            this._snackBar.mostrarSnackBar(this.errorMsj, 'Aceptar', 5000);
          }
        } else {
          this.errorMsj = 'Ha ocurrido un error inesperado, intente nuevamente.';
          this._snackBar.mostrarSnackBar(
            this.errorMsj
          );
        }
      });
    }else {
      this._snackBar.mostrarSnackBar('Verifique los datos solicitados.');
    }
  }

  onGoDashboard() {
    this.navegatioRoute.navigateTo([appRutesModule.ciudadano, PanelVotanteRoutesNames.dashboard]);
  }
}

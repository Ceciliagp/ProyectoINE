import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavegationRoutesService } from '../../../service/navegation-routes/navegation-routes.service';
import { appRutesModule } from '../../../app.routes-names-module';
import { PanelAdminRoutesNames } from '../panelAdmin-routing.module';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
loginForms=this.formBuilder.group({})


constructor(private formBuilder:FormBuilder,
  private navegatioRoute: NavegationRoutesService,
){}


onGoDashboard() {
  this.navegatioRoute.navigateTo([appRutesModule.admin, PanelAdminRoutesNames.dashboard]);
}
}

import { NgModule } from "@angular/core";
import { LoginAdminComponent } from "./login-admin.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { loginRoutes } from "./login.routes";

@NgModule({
    declarations: [
        LoginAdminComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      MatSidenavModule, 
      RouterModule.forChild(loginRoutes)
    ]
  })
  export class LoginModule { }
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { loginRoutes } from "./login.routes";
import { LoginComponent } from "./login.component";
import { MaterialModule } from "../../../../utils/material.module";

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      MatSidenavModule, 
      MaterialModule,
      RouterModule.forChild(loginRoutes)
    ]
  })
  export class LoginModule { }
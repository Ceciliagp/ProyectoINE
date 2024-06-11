import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../../../utils/material.module";
import { dashboardRoutes } from "./dashboard.routes";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    declarations: [
      DashboardComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      MatSidenavModule, 
      MaterialModule,
      RouterModule.forChild(dashboardRoutes)
    ]
  })
  export class DashboardModule { }
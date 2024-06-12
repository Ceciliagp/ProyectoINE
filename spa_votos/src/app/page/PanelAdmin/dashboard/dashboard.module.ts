import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../../../utils/material.module";
import { dashboardRoutes } from "./dashboard.routes";
import { DashboardComponent } from "./dashboard.component";
import { MatIconModule } from "@angular/material/icon";

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
      MatIconModule,
      RouterModule.forChild(dashboardRoutes)
    ]
  })
  export class DashboardModule { }
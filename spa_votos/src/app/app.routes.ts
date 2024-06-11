import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRutesModule } from './app.routes-names-module';

export const routes: Routes = [
    // {
    //   path: appRutesModule.main,
    //   loadChildren: () =>
    //     import('./page/dashboard/dashboard.module').then(
    //       (m) => m.DashboradModule
    //     ),
    // },
    {
      path: appRutesModule.admin,
      loadChildren: () =>
        import(
          './page/PanelAdmin/panelAdmin.module'
        ).then((m) => m.PanelAdminModule),
    },
    { path: '**', redirectTo: appRutesModule.main }, // Ruta por defecto
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRutesModule } from './app.routes-names-module';

export const routes: Routes = [
    {
      path: appRutesModule.ciudadano,
      loadChildren: () =>
        import('./page/PanelVotante/panelVotante.module').then(
          (m) => m.PanelVotanteModule
        ),
    },
    {
      path: appRutesModule.admin,
      loadChildren: () =>
        import(
          './page/PanelAdmin/panelAdmin.module'
        ).then((m) => m.PanelAdminModule),
    },
    { path: '**', redirectTo: appRutesModule.ciudadano }, // Ruta por defecto
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

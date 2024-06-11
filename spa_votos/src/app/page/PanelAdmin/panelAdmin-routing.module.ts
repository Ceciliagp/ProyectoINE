import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const PanelAdminRoutesNames = {
  login: 'login',
};

const routes: Routes = [
  {
    path: '',
    children: [
      {path: PanelAdminRoutesNames.login,
        loadChildren: () => import('./login-admin/login.module').then(m => m.LoginModule)
      },
      // {
      //   path: `${EspecificacionesRoutesNames.consultar}/:modelo`,
      //   loadChildren: () =>
      //     import('./especificaciones/especificaciones.module').then(
      //       (m) => m.EspecificacionesModule
      //     ),
      // },
      { path: '**', redirectTo: PanelAdminRoutesNames.login },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class panelAdminRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const PanelVotanteRoutesNames = {
  login: 'login',
  dashboard: 'dashboard'
};

const routes: Routes = [
  {
    path: '',
    children: [
      {path: PanelVotanteRoutesNames.login,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: PanelVotanteRoutesNames.dashboard,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: '**', redirectTo: PanelVotanteRoutesNames.login },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class panelVotanteRoutingModule {}
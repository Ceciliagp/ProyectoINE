import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const PanelAdminRoutesNames = {
  login: 'login',
  dashboard: 'dashboard',
};

const routes: Routes = [
  {
    path: '',
    children: [
      {path: PanelAdminRoutesNames.login,
        loadChildren: () => import('./login-admin/login.module').then(m => m.LoginModule)
      },
      {
        path: PanelAdminRoutesNames.dashboard,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: '**', redirectTo: PanelAdminRoutesNames.login },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class panelAdminRoutingModule {}
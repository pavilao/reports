import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () => import('./Components/reports/reports.component').then((m) => m.ReportsComponent),
  },
  {
    path: 'add-report',
    loadComponent: () => import('./Components/add-report/add-report.component').then((m) => m.AddReportComponent),
  },
  {
    path: 'detail-view/:id',  // Si `detail-view` usa un parámetro dinámico
    loadComponent: () => import('./Components/detail-view/detail-view.component').then((m) => m.DetailViewComponent),
  },
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
];
``

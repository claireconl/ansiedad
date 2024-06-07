import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index', loadComponent: () => import('./index/index.page').then((m) => m.IndexPage),
  },
  {
    path: 'desahogarme',
    loadComponent: () => import('./desahogarme/desahogarme.page').then( m => m.DesahogarmePage)
  },
  {
    path: 'centrar',
    loadComponent: () => import('./centrar/centrar.page').then( m => m.CentrarPage)
  },
  {
    path: 'entender',
    loadComponent: () => import('./entender/entender.page').then( m => m.EntenderPage)
  }
];

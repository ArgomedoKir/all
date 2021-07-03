import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: 
    [
      { path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)},
      { path: 'mapa', loadChildren: () => import('./mapa/mapa.module').then(m => m.MapaModule)},
      { path: 'imagenes', loadChildren: () => import('./imagenes/imagenes.module').then(m => m.ImagenesModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

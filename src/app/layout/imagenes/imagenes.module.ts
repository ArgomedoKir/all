import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { ImagenesComponent } from './imagenes.component';
import { MapaComponent } from './mapa.component';


@NgModule({
  declarations: [ImagenesComponent, MapaComponent],
  imports: [
    CommonModule,
    ImagenesRoutingModule
  ]
})
export class ImagenesModule { }

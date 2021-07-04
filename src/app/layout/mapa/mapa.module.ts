import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapaComponent } from './mapa.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapaComponent],
  imports: [
    CommonModule,GoogleMapsModule,
    MapaRoutingModule, AgmCoreModule,
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyA_K1FjOhUYpeHKq8PWY8QnmuMuWy1fNTU',
        libraries: ['places']
      }
    )
  ]
})
export class MapaModule { }

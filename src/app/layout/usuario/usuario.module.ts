import { NgModule } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule, UsuarioRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe]
})
export class UsuarioModule { }

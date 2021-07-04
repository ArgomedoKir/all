import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from '../layout/usuario/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioForm: any;

  alias: string;
  contrasena: string;

  // Alerta
  tipoAlerta: string;
  mostrarAlerta: boolean;
  mensajeAlerta: string;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
    this.usuarioForm =  this.formBuilder.group({
      usuAlias: ['', [Validators.required, Validators.maxLength(15)]],
      usuContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  iniciarSesion(){
    this.guardarValores();
    this.usuarioService.login(this.alias, this.contrasena).subscribe(() => {
      this.goToCuenta();
    }, error =>{ 
      this.mostrarAlerta = true;
      this.tipoAlerta = "danger";
      this.mensajeAlerta = "El usuario o la contraseña no son correctos";
    });
  }

  goToCuenta(){
    this.router.navigate(['/cuenta']);
  }

  goToRegistro(ruta){
    this.router.navigate([ruta]);
  }

  guardarValores() {
    this.alias = this.usuAlias.value;
    this.contrasena = this.usuContrasenia.value;
  }

  get usuAlias() {
    return this.usuarioForm.get('usuAlias');
  }

  get usuContrasenia() {
    return this.usuarioForm.get('usuContrasenia');
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import {UsuarioClass} from './usuario.class';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild('cerrarAlerta') cerrarAlerta: NgbAlert; 

  SEXO_USUARIO = [{'clave': 'M', 'nombre': 'Masculino'}, {'clave': 'F', 'nombre': 'Femenino'}];
  usuario: any;

  usuarioForm: any;
  maxFecha: string;

  // Alerta
  tipoAlerta: string = 'danger';
  mostrarAlerta: boolean = false;
  mensajeAlerta: string = 'dasdas ';

  //carga
  cargando: boolean = true;

  usuarioModel: UsuarioClass = new UsuarioClass();

  constructor(
    private formBuilder: FormBuilder, 
    private usuarioServicio: UsuarioService,
    private router: Router,
    private datePipe: DatePipe
  ) { 

  }

  ngOnInit(): void {
    this.inicializarForm();
    this.obtenerFechaMaxima();
  }

  inicializarForm(){
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    this.usuarioForm =  this.formBuilder.group({
      usuNombres: ['', [Validators.required, Validators.pattern('([a-zA-ZñÑáéíóúÁÉÍÓÚ\s][ ]*)+'), Validators.maxLength(50)]],
      usuApellidos: ['', [Validators.required, Validators.pattern('([a-zA-ZñÑáéíóúÁÉÍÓÚ\s][ ]*)+'), Validators.maxLength(30)]],
      usuSexo: [null, Validators.required],
      usuFechNacimiento: ['', Validators.required],
      usuDni: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(8), Validators.maxLength(8)]],
      usuEmail: ['', [Validators.required, Validators.pattern(emailFormat), Validators.maxLength(60)]],
      usuAlias: ['', [Validators.required, Validators.maxLength(15)]],
      usuContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      usuDireccion: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  obtenerFechaMaxima() {
    const fechaActual = this.datePipe.transform(new Date(), "yyyy-MM-dd").split('-')
    const dia = fechaActual[2]
    const mes = fechaActual[1];
    const anio = Number(fechaActual[0]) - 18;

    this.maxFecha = anio + '-' + mes + '-' + dia;
  }

  guardarUsuario(){
    
    if(this.usuarioForm.invalid) {
      this.mostrarAlerta = true;
      this.tipoAlerta = "danger";
      this.mensajeAlerta = "Uno o más campos no fueron completados o su contenido no es válido.";
    }else{
      this.guardarDatosForm();
      if(this.esFechaInvalida()) {
        setTimeout(()=> {
          this.mostrarAlerta = true;
          this.tipoAlerta = 'danger';
          this.mensajeAlerta = 'La fecha es inválida.';
        },4000);
      } else{
        this.usuarioServicio.registro(this.usuarioModel).subscribe(
          (mensaje) => {

            setTimeout(()=> {
              this.mostrarAlerta = true;
              this.tipoAlerta = "success";
              this.mensajeAlerta = "Usuario registrado con éxito.";
            },4000);
            
            setTimeout(() => 
            {
              this.router.navigate(['/home']);
              this.usuarioForm.reset();
            }, 2000);
          },
          (error) => {
            setTimeout(() => 
            {
              this.mostrarAlerta = true;
              this.tipoAlerta = "danger";
              this.mensajeAlerta = "Ocurrió un problema al registrarse. Por favor intentelo más tarde.";
            }, 2000);
            
          }
        );
      }
    }
  }

  esFechaInvalida() {
    let fechaInvalida = false;
    const fechaActual = new Date();

    if (this.usuarioModel.USU_FECH_NAC >= this.datePipe.transform(fechaActual.toDateString(), 'yyyy-MM-dd')) {
      this.mensajeAlerta = 'La fecha de nacimiento no es válida';
      fechaInvalida = true;
    }
    else if (this.maxFecha < this.usuarioModel.USU_FECH_NAC) {
      this.mensajeAlerta = 'Debe ser mayor de edad para que la fecha sea válida';
      fechaInvalida = true;
    }

    return fechaInvalida;
  }

  guardarDatosForm(){
    this.usuarioModel.USU_NOMBRES = this.usuNombres.value;
    this.usuarioModel.USU_APELLIDOS = this.usuApellidos.value;
    this.usuarioModel.USU_SEXO = this.usuSexo.value;
    this.usuarioModel.USU_FECH_NAC = this.usuFechNacimiento.value;
    this.usuarioModel.USU_DNI = this.usuDni.value;
    this.usuarioModel.USU_EMAIL = this.usuEmail.value;
    this.usuarioModel.USU_ALIAS = this.usuAlias.value;
    this.usuarioModel.USU_CONTRASENIA = this.usuContrasenia.value;
    this.usuarioModel.USU_DIRECCION = this.usuDireccion.value;
  }

  get usuNombres() {
    return this.usuarioForm.get('usuNombres');
  }

  get usuApellidos() {
    return this.usuarioForm.get('usuApellidos');
  }

  get usuSexo() {
    return this.usuarioForm.get('usuSexo');
  }

  get usuFechNacimiento() {
    return this.usuarioForm.get('usuFechNacimiento');
  }

  get usuDni() {
    return this.usuarioForm.get('usuDni');
  }

  get usuEmail() {
    return this.usuarioForm.get('usuEmail');
  }

  get usuAlias() {
    return this.usuarioForm.get('usuAlias');
  }

  get usuContrasenia() {
    return this.usuarioForm.get('usuContrasenia');
  }

  get usuDireccion() {
    return this.usuarioForm.get('usuDireccion');
  }

}

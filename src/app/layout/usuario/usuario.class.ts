export class UsuarioClass {
    USU_NOMBRES?: string;
    USU_APELLIDOS?: string;
    USU_SEXO?:string;
    USU_FECH_NAC?: string;
    USU_DNI?: string;
    USU_DIRECCION?: string;
    USU_EMAIL?: string;
    USU_ALIAS?: string;
    USU_CONTRASENIA?: string;

    constructor(nombre?: string, apellidos?: string, sexo?:string, fechaDeNacimiento?: string,dni?: string, direccion?: string, email?: string, alias?: string, contrasenia?: string){
        this.USU_NOMBRES = nombre;
        this.USU_APELLIDOS = apellidos;
        this.USU_SEXO =  sexo;
        this.USU_FECH_NAC = fechaDeNacimiento;
        this.USU_DNI = dni;
        this.USU_DIRECCION = direccion;
        this.USU_EMAIL = email;
        this.USU_ALIAS = alias;
        this.USU_CONTRASENIA = contrasenia;
    }
}

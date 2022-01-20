import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public data_model: any = {};

  constructor(public auth: HttpService, public spinner: SpinnerService, public dialogRef: MatDialogRef<CreateAccountComponent>) { }

  ngOnInit(): void {
  }
  //**********************************************************************//
  //FUNCION PARA VER U OCULTAR LA CONTRASEÑA//
  public type: any = 'password';
  public show_eye: boolean = false;
  public visibility(n: any) {
    if (n == 1) {
      this.type = 'text';
      this.show_eye = true;
    } else {
      this.type = 'password';
      this.show_eye = false;
    }
  }

  public type_: any = 'password';
  public show_eye_: boolean = false;
  public visibilityConfirmar(n: any) {
    if (n == 1) {
      this.type_ = 'text';
      this.show_eye_ = true;
    } else {
      this.type_ = 'password';
      this.show_eye_ = false;
    }
  }

  public pass_invalido: boolean = false;

  public validatepass() {
    if (this.data_model.pass != this.data_model.confirmapass) {
      this.pass_invalido = true;
    }
    else
      this.pass_invalido = false;
  }

  //**********************************************************************//
  //FUNCION PARA VALIDAR EMAIL//
  public correo_incorrecto: boolean = false;
  public correo_diferente_confirmacion: boolean = false;
  validateEmail() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   // if (emailRegex.test(this.data_model.correo)) {
    if (this.validarEmail(this.data_model.correo)) {
      this.correo_incorrecto = false;
    } else {
      this.correo_incorrecto = true;
    }
    if (this.data_model.confirmacorreo != this.data_model.correo) {
      this.correo_diferente_confirmacion = true;
    }
    else {
      this.correo_diferente_confirmacion = false;
    }
  }


  public validarEmail(valor): any {
    var valida = false;
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      // alert("La dirección de email " + valor + " es correcta!.");
      valida = true;
    } else {
      //  alert("La dirección de email es incorrecta!.");
      valida = false;
    }

    return valida
  }

  public correo_incorrecto_confirmacion: boolean = false;
  validateEmailConfirmacion() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   // if (emailRegex.test(this.data_model.confirmacorreo)) {
    if (this.validarEmail(this.data_model.correo)) {
      //  console.log("FORMATO DE CORREO CORRECTO");
      this.correo_incorrecto_confirmacion = false;
    } else {
      this.correo_incorrecto_confirmacion = true;
      // console.log("FORMATO DE CORREO INCORRECTO");
    }
    if (this.data_model.confirmacorreo != this.data_model.correo) {
      this.correo_diferente_confirmacion = true;
    }
    else {
      this.correo_diferente_confirmacion = false;
    }
  }
  //**********************************************************************//
  public nombre: boolean = false;
  public apellidos: boolean = false;
  public telefono: boolean = false;
  public correo: boolean = false;
  public confirmacorreo: boolean = false;
  public pass: boolean = false;
  public confirmapass: boolean = false;

  public guardar() {
    let contador = 0;
    if (this.data_model.nombres == '' || this.data_model.nombres == null || this.data_model.nombres == undefined) {
      this.nombre = true;
      contador++;
    }
    if (this.data_model.apellidos == '' || this.data_model.apellidos == null || this.data_model.apellidos == undefined) {
      this.apellidos = true;
      contador++;
    }
    if (this.data_model.telefono == '' || this.data_model.telefono == null || this.data_model.telefono == undefined) {
      this.telefono = true;
      contador++;
    }
    if (this.data_model.correo == '' || this.data_model.correo == null || this.data_model.correo == undefined) {
      this.correo = true;
      contador++;
    }
    if (this.data_model.confirmacorreo == '' || this.data_model.confirmacorreo == null || this.data_model.confirmacorreo == undefined) {
      this.confirmacorreo = true;
      contador++;
    }
    if (this.data_model.pass == '' || this.data_model.pass == null || this.data_model.pass == undefined) {
      this.pass = true;
      contador++;
    }
    if (this.data_model.confirmapass == '' || this.data_model.confirmapass == null || this.data_model.confirmapass == undefined) {
      this.confirmapass = true;
      contador++;
    }
    if (this.correo_diferente_confirmacion || this.pass_invalido) {
      contador++;
    }

    if (contador == 0) {
      this.save();
    }
  }


  public save(): void {
    this.spinner.show();
    setTimeout(() => {
      this.data_model.fecha_creacion = new Date();
      this.data_model.fecha_edicion = new Date();
      this.auth.service_general_post_with_url('User/AddUser', this.data_model).subscribe(r => {
        if (r.success) {
          debugger;
         //console.log("respuesta exitosa: ", r);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Haz recibido un correo con tu Registro',
            showConfirmButton: false,
            timer: 2300
          })
          this.dialogRef.close();
          this.spinner.hide();
        }
        else{ //Message
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Ups! '+ r.message,
            showConfirmButton: false,
            timer: 2300
          })
        }
      }, (err) => {
        debugger;
        console.log("Error al guardar información: ", err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ups! ' + err.error.message,
          showConfirmButton: false,
          timer: 3800
        })
        this.dialogRef.close();
        this.spinner.hide();
      })
    }, 3000);

  }

}

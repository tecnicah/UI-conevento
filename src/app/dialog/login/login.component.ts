import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public spinner:SpinnerService,public _dialog: MatDialog, public dialogREF: MatDialogRef<LoginComponent>, public auth:HttpService) { }

  ngOnInit(): void {
  }

  //*******************************************************************//
  //FUNCION PARA VER U OCULTAR LA CONTRASEÑA//
  public type:any = 'password';
  public show_eye : boolean = false;
  public visibility(n:any){
      if(n == 1){
         this.type = 'text';
         this.show_eye = true;
      }else{
         this.type = 'password';
         this.show_eye = false;
      }
  }
  //*******************************************************************//
  //MUESTRA EL FORMULARIO DE FORGOT PASSWORD//
  public show_box_credentials:boolean = true;
  public forgotPassword(){
     this.show_box_credentials = false;
  }
  //*******************************************************************//
  //MUESTRA EL FORMULARIO DE INICIO DE SESION//
  public startSession(){
    this.show_box_credentials = true;
  }
  //*******************************************************************//
  //FUNCION PARA REGREAR AL LOGIN//
  public backLogin(){
    this.show_box_credentials = true;
    this.show_formulario = false;
  }
  //*******************************************************************//
  //FUNCION PARA MOSTRAR EL FORMULARIO DE CREAR CUENTA//
  public show_formulario = false;
  public createAccount(type:any){
    this.dialogREF.close();
    let widthModal:any;
    if(type == 1){ widthModal = '70%' }else{ widthModal = '100%' }
    console.log("MOBILE");
    const dialogRef = this._dialog.open(CreateAccountComponent, {
      width: widthModal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }
  //*******************************************************************//
  //RESET PASSWORD//
  public data_model_reset:any = {};
  public email_reset:boolean = false;
  public restablecer(){
    let contador = 0;
    if(this.data_model_reset.email == '' || this.data_model_reset.email == null || this.data_model_reset.email == undefined){
      this.email_reset = true;
      contador++;
    }
    if(contador == 0){
       this.resetPassword();
    }
  }

  public resetPassword(){
    this.spinner.show();
    setTimeout(() => {
      this.auth.service_general_post_with_url('User/ResetPass?email='+this.data_model_reset.email,'').subscribe(r => {
        if(r.success){
         console.log("respuesta exitosa: ", r);
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha enviado tu nueva contraseña a tu correo.',
          showConfirmButton: false,
          timer: 1500
        })
         this.spinner.hide();
        }
      },(err)=>{
        console.log("Error al guardar información (Reset password): ", err);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha enviado tu nueva contraseña a tu correo.',
          showConfirmButton: false,
          timer: 1500
        })
        this.spinner.hide();
      })
    }, 3000);
  }
  //*******************************************************************//
  //LOGIN//
  public data_model_login:any = {};
  public email:boolean = false;
  public password:boolean = false;
  public error_credenciales:boolean = false;
  public login(){
    let contador = 0;
    this.error_credenciales = false;
    if(this.data_model_login.email == '' || this.data_model_login.email == null || this.data_model_login.email == undefined){
      this.email = true;
      contador++;
    }
    if(this.data_model_login.password == '' || this.data_model_login.password == null || this.data_model_login.password == undefined){
      this.password = true;
      contador++;
    }
    
    if(contador == 0){
       this.startSessionlogin();
    }
  }

  public startSessionlogin(){
    this.spinner.show();
    setTimeout(() => {
      this.auth.service_general_post_with_url('User/Login?email='+this.data_model_login.email+'&password='+this.data_model_login.password,'').subscribe(r => {
        if(r.success){
         console.log("respuesta exitosa: ", r);
         localStorage.setItem('userData', JSON.stringify(r.result));
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        })
         this.dialogREF.close();
         this.spinner.hide();
        }else{
          console.log("respuesta negativa: ", r);
          this.error_credenciales = true;
          this.spinner.hide();
        }
      },(err)=>{
        console.log("Error al guardar información: Login", err);
        this.spinner.hide();
      })
    }, 3000); 
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public type:any;
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

  public show_box_credentials:boolean = true;
  public forgotPassword(){
     this.show_box_credentials = false;
  }

  public startSession(){
    this.show_box_credentials = true;
  }

  public backLogin(){
    this.show_box_credentials = true;
    this.show_formulario = false;
  }

  public show_formulario = false;
  public createAccount(){
    this.show_formulario = true;
  }

}

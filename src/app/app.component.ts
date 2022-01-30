import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conevento';
  total = 0;

  constructor(public router:Router){
    
  }

  public rutaHome : boolean = false;
  public data_user_model_app: any;

  public  get_sesion()
 {
   if(localStorage.getItem('userData'))
   {
    this.data_user_model_app = JSON.parse(localStorage.getItem('userData') || '{}');
   // console.log("================== Sesión cargada coorectamnete : ", this.data_user_model_app);
   }
   else
   {
   // console.log("=================== NO hay sesión ============================");
     this.data_user_model_app = null;
   }
 }

  public detectaRuta(){
    //debugger;
    if(this.router.url == '/'){
      this.rutaHome = true;
    //  console.log('home');
    }else{
      this.rutaHome = false;
    //  console.log('no es el home');
    }
  }

  public getTotal(){
    return this.total;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conevento';


  constructor(public router:Router){
    
  }

  public rutaHome : boolean = false;
  public detectaRuta(){
    if(this.router.url == '/'){
      this.rutaHome = true;
      console.log('home');
    }else{
      this.rutaHome = false;
      console.log('no es el home');
    }
  }
}

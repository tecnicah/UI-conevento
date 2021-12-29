import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { ProfileComponent } from 'src/app/dialog/profile/profile.component';
import { Autoplay } from 'swiper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = true;
  
  constructor(public _dialog: MatDialog, public router:Router, public appComponent:AppComponent) { 

  }

  ngOnInit(): void {
    console.log("header =====>" ,this.router.url);
  }


  public login(type:any){
    //Si no existe un usuario logueado//
    if(!localStorage.getItem('userData')){
      let ancho = '';
      if(type==1){
        ancho = '50%';
      }else{
        ancho = '100%';
      }
      const dialogRef = this._dialog.open(LoginComponent, {
        width: ancho,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
  
        }
      })
    }else{
       //Si existe ya un usuario logueado//
       this.profile(type)
    }
  }


  public profile(type:any){
    let widthModal:any;
    if(type == 1){ widthModal = '70%' }else{ widthModal = '100%' }
    console.log("MOBILE");
    const dialogRef = this._dialog.open(ProfileComponent, {
      width: widthModal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

  public wizard() {
      this.router.navigateByUrl('/Wizard');
   } 

   @HostListener('click') c_onEnterrr() {
    this.appComponent.detectaRuta();
   }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { FaqsComponent } from 'src/app/dialog/faqs/faqs.component';
import { ProfileComponent } from 'src/app/dialog/profile/profile.component';
import { Autoplay } from 'swiper';
import { VERSION } from "@angular/core";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = true;
  
  constructor(private scroller: ViewportScroller,public _dialog: MatDialog, public router:Router, public appComponent:AppComponent) { 

  }


  goDown1() {
    this.scroller.scrollToAnchor("targetRed");
  }

  goDown2(section: any) {
    //this.scroller.scrollToAnchor("targetGreen");
    let m = document.getElementById("nuestrosservicios");
    if (m === null) {
      //this.router.navigate([''],{ fragment: "nuestrosservicios" });
      this.router.navigate(['']);
    }
    else
    {
      
      document.getElementById(section)!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    
  }

  goDown3() {
    this.router.navigate(['/'], { fragment: "nuestrosservicios" });
  }


  ngOnInit(): void {
    //console.log("header =====>" ,this.router.url);
   // this.router.navigate(["/"]);
  }

  public redirect(page: any) {
    debugger;
    this.router.navigateByUrl('/');
    this.appComponent.detectaRuta();
    //alert();
 } 

 public nuestrosservicios: string = "nuestrosservicios";

  public login(type:any){
    //Si no existe un usuario logueado//
    if(!localStorage.getItem('userData')){
      let ancho = '';
      let alto = "457px";
      if (type == 1) {
        ancho = '50%';
        
      } else {
        ancho = '100%';
        alto = "600px";
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

  public faqs(type:any){
    //Si no existe un usuario logueado//
    //debugger;
    this.isCollapsed = !this.isCollapsed;
      let ancho = '100%';
      let alto = "80%";
      let pos = "200px";
      
      const dialogRef = this._dialog.open(FaqsComponent, {
        width: ancho,
        height: alto
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
  
        }
      })
   
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

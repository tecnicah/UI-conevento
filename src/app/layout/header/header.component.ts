import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { ProfileComponent } from 'src/app/dialog/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = true;
  
  constructor(public _dialog: MatDialog) { }

  ngOnInit(): void {
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
        width: ancho
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

}

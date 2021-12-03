import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { LoginComponent } from 'src/app/dialog/login/login.component';

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


  public loginDesktop(){
    console.log("DESKTOP");
    const dialogRef = this._dialog.open(LoginComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

  public loginMobile(){
    console.log("MOBILE");
    const dialogRef = this._dialog.open(LoginComponent, {
      width: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

}

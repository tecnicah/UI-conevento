import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { NosotrosComponent } from 'src/app/dialog/nosotros/nosotros.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _dialog:MatDialog, public appComponent: AppComponent) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.appComponent.detectaRuta();
  }

  public nosotros(type:any){
    let ancho = '';
    if(type == 1){ ancho = '70%' } else{ ancho = '100%' }
    const dialogRef = this._dialog.open(NosotrosComponent, {
      width: ancho
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    })
  }

}

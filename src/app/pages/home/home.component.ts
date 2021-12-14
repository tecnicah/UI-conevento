import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NosotrosComponent } from 'src/app/dialog/nosotros/nosotros.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _dialog:MatDialog) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
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

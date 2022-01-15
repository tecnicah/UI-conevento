import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NosotrosComponent } from 'src/app/dialog/nosotros/nosotros.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _dialog:MatDialog, public appComponent: AppComponent, private http: HttpClient
    , private router: Router) { }
  
  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  public wizard() {
    this.router.navigateByUrl('/Wizard');
    this.appComponent.detectaRuta();
    //alert();
 } 

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.appComponent.detectaRuta();
  }
  public ytid= "rRcSK1As9AY";
  
  public nosotros(type:any){
    let ancho = '';
    if(type == 1){ ancho = '70%' } else{ ancho = '100%' }
    const dialogRef = this._dialog.open(NosotrosComponent, {
      width: ancho
     // ,height: "70%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    })
  }

  @HostListener('click') c_onEnterrr() {
    this.appComponent.detectaRuta();
   }

}

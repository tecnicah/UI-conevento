import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NosotrosComponent } from 'src/app/dialog/nosotros/nosotros.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(public _dialog:MatDialog, public appComponent: AppComponent, private http: HttpClient, private activeRoute: ActivatedRoute) { }
  
  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    this.activeRoute.params.subscribe(param => {
      // alert(param.pageSec)
      if(param.pageSec){
        const section = this.container.nativeElement.querySelector('#${param.pageSec}')
        console.log(section)

        section?.scrollIntoView()
      }
    })

  }

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
      if (result) { }
    })
  }

}

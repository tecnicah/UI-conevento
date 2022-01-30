import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { isTemplateExpression } from 'typescript';
import { NgpSortModule } from "ngp-sort-pipe";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.scss']
})
export class SeleccionarServicioComponent implements OnInit {
  
  constructor(public appComponent: AppComponent, public spinner: SpinnerService, private rutaActiva: ActivatedRoute, public auth: HttpService, public _dialog: MatDialog) { }
  userFilter: any = { producto: '' };
  public productos: any = [];
  public id: any;
  public decha_inicio: any;
  public ejemplo = "";
  ngOnInit(): void {
//debugger;
    
    const tag = document.createElement('script');
    
  	tag.src = "https://www.youtube.com/iframe_api";
 
  	document.body.appendChild(tag);

   // console.log("SERVICIOS ELEGIDOS: ", this.auth.listaProductosEventos);
    this.appComponent.detectaRuta();
    this.spinner.show();
    this.id = this.rutaActiva.snapshot.params.id;
    this.decha_inicio = this.rutaActiva.snapshot.params.date;
   // console.log("id categoria: ", this.id);

  }

  setFilter(){
    //debugger;
    this.appComponent._userFilter = this.userFilter;
    debugger;
    this.appComponent.arrFilter.filter(x => x.productos == this.userFilter) ;
  }

  public back() {
    window.history.back();
  }
}

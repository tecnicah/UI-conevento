import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.scss']
})
export class SeleccionarServicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public back(){
    window.history.back();
  }
}

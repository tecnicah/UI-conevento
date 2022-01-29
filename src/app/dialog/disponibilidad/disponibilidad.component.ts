import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.scss']
})
export class DisponibilidadComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog, public dialogRef: MatDialogRef<DisponibilidadComponent>) { }

  ngOnInit(): void {
    console.log("DATA RECIBIDA DISPO==========: ", this.data);
  }

  agregarCantidad1(data:any){
    console.log(data);
    if(data){
      this.data.cantidadUnidades++;
    }else{
      if(this.data.cantidadUnidades > 0){
        this.data.cantidadUnidades--;
      }
    }
  }

  public agregarCantidad(data: any) {

     if (data) {
       if ((this.data.cantidadUnidades < this.data.maximoProductos) 
        || (this.data.maximoProductos == null)) {
         this.data.cantidadUnidades++;
       }
     } else {
       if (this.data.cantidadUnidades > 0) {
         this.data.cantidadUnidades--;

       }
     }
     ////this.guardar();
   }

  agregarhora1(data:any){
    console.log(data);
    if(data){
      this.data.cantidadHoras++;
    }else{
      if(this.data.cantidadHoras > this.data.minimoProductos){
        this.data.cantidadHoras--;
      }
    }
  }

  public agregarhora(data: any) {
     if (data) {
       this.data.cantidadHoras++;
 
     } else {
       if (this.data.cantidadHoras > this.data.minimoProductos) {
         this.data.cantidadHoras--;
       }
     }
     //this.guardar();
   }

  //DETECTA SUMA O RESTA DE CONTIDADES//
  public detectarSumaRestaCantidad1(model:any){
    console.log(model);
    if(model >= 0){
      this.data.cantidadUnidades = model;
    }else{
      this.data.cantidadUnidades = 0;
    }
    //this.guardar();
  }

  public detectarSumaRestaCantidad(model: any) {
    if (model >= 0) {
      this.data.cantidadUnidades = model;

      if ((model > this.data.maximoProductos) && (this.data.maximoProductos != null)) {
        this.data.cantidadUnidades = this.data.maximoProductos;
      }
    } else {
      this.data.cantidadUnidades = 0;
   
    }
    //this.guardar();
  }


  //DETECTA SUMA O RESTA DE HORAS//
  public detectarSumaRestaHoras(model:any){
    console.log(model);
    if(model >= this.data.minimoProductos){
      this.data.cantidadHoras = model;
    }else{
      this.data.cantidadHoras = this.data.minimoProductos;
    }
    //this.guardar();
  }

  public guardar(){
     this.data.success = true;
     this.dialogRef.close(this.data);
  }

  public cancelar(){
    this.data.success = false;
     this.dialogRef.close(this.data);
  }

}

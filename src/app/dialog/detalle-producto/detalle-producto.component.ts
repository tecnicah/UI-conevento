import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog, public dialogRef: MatDialogRef<DetalleProductoComponent>) { }

  ngOnInit(): void {
    console.log("DATA RECIBIDA: ", this.data);
  }

  agregarCantidad(data:any){
    console.log(data);
    if(data){
      this.data.cantidadUnidades++;
    }else{
      if(this.data.cantidadUnidades > 0){
        this.data.cantidadUnidades--;
      }
    }
  }

  agregarhora(data:any){
    console.log(data);
    if(data){
      this.data.cantidadHoras++;
    }else{
      if(this.data.cantidadHoras > this.data.minimoProductos){
        this.data.cantidadHoras--;
      }
    }
  }

  //DETECTA SUMA O RESTA DE CONTIDADES//
  public detectarSumaRestaCantidad(model:any){
    console.log(model);
    if(model >= 0){
      this.data.cantidadUnidades = model;
    }else{
      this.data.cantidadUnidades = 0;
    }
  }
  //DETECTA SUMA O RESTA DE HORAS//
  public detectarSumaRestaHoras(model:any){
    console.log(model);
    if(model >= this.data.minimoProductos){
      this.data.cantidadHoras = model;
    }else{
      this.data.cantidadHoras = this.data.minimoProductos;
    }
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

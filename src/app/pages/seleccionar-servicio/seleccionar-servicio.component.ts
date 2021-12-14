import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { isTemplateExpression } from 'typescript';

@Component({
  selector: 'app-seleccionar-servicio',
  templateUrl: './seleccionar-servicio.component.html',
  styleUrls: ['./seleccionar-servicio.component.scss']
})
export class SeleccionarServicioComponent implements OnInit {

  constructor(public spinner: SpinnerService,private rutaActiva: ActivatedRoute, public auth: HttpService) { }
  
  public productos : any = [];
  public id:any;
  ngOnInit(): void {
    console.log("SERVICIOS ELEGIDOS: ", this.auth.listaProductosEventos);
    this.spinner.show();
    this.id = this.rutaActiva.snapshot.params.id;
    console.log("id categoria: ", this.id);
    this.auth.service_general_get('Catalog/productos_by_Cat?id_categoria='+this.id).subscribe(observer => {
      if(observer.result){
        this.productos = observer.result;
        console.log("Catalogo: ",observer.result);
        this.productos.forEach((E:any) => {
          E.cantidadUnidades = 0;
          E.cantidadHoras = E.minimoProductos;
        });

        this.productos.forEach((E:any) => {
          for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
            if(E.id == this.auth.listaProductosEventos[i].idCatProducto && this.auth.listaProductosEventos[i].idCategoria == this.id){
              E.cantidadUnidades = this.auth.listaProductosEventos[i].cantidadUnidades;
              E.cantidadHoras = this.auth.listaProductosEventos[i].cantidadHoras;
            }
          }
        });
        console.log(this.productos);
        this.spinner.hide();
      }
    }, (err)=>{
      this.spinner.hide();
      console.log(err);
    })
  }
  //*************************************************************************//
  //FUNCION PARA AGREGAR CANTIDADES//
  agregarCantidad(data:any, i:any, ){
    console.log(data);
    if(data){
      this.productos[i].cantidadUnidades++;
    }else{
      if(this.productos[i].cantidadUnidades > 0){
        this.productos[i].cantidadUnidades--;
      }
    }
  }
  //FUNCION PARA AGREGAR HORAS//
  agregarhora(data:any, i:any, item:any){
    console.log(data);
    if(data){
      this.productos[i].cantidadHoras++;
    }else{
      if(this.productos[i].cantidadHoras > this.productos[i].minimoProductos){
        this.productos[i].cantidadHoras--;
      }
    }
  }
  //*************************************************************************//
  //FUNCION PARA REGRESAR//
  public back(){
    window.history.back();
  }
  //*************************************************************************//
  //FUNCION PARA AGREGAR//
  public agregar(){
    console.log(this.productos);
    this.productos.forEach((E:any) => {
      for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
        if(E.id ==  this.auth.listaProductosEventos[i].idCatProducto  && this.auth.listaProductosEventos[i].idCategoria == this.id){
          this.auth.listaProductosEventos.splice(i,1);
        }
      }
    })


   debugger


    this.productos.forEach((E:any) => {
      if(E.cantidadUnidades > 0){
         this.auth.listaProductosEventos.push(
           {
            "id": 0,
            "idEvento": 0,
            "idCatProducto": E.id,
            "cantidadUnidades": E.cantidadUnidades,
            "cantidadHoras": E.cantidadHoras,
            "idCategoria": Number(this.id),
            "Nombre": E.producto,
            "Precio": Number(E.precioPorUnidad)
           }
         )
      }
    });

    this.auth.listaProductosEventos.forEach((E:any) => {
      if(E.idCategoria == 1){
         this.auth.categorias.personal1 = true;
      }
      if(E.idCategoria == 3){
        this.auth.categorias.talento3 = true;
      }
      if(E.idCategoria == 5){
        this.auth.categorias.alimentos5 = true;
      }
      if(E.idCategoria == 6){
        this.auth.categorias.mobiliario6 = true;
      }
      if(E.idCategoria == 7){
        this.auth.categorias.luces7 = true;
      }
    });
    localStorage.setItem('categorias', JSON.stringify(this.auth.categorias));
    localStorage.setItem('productos', JSON.stringify(this.auth.listaProductosEventos));
    console.log("Productos a pagar: ", this.auth.listaProductosEventos);
    this.back();
  }

}

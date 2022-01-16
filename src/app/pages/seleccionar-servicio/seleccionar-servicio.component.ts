import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DetalleProductoComponent } from 'src/app/dialog/detalle-producto/detalle-producto.component';
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
debugger;
    const tag = document.createElement('script');
    
  	tag.src = "https://www.youtube.com/iframe_api";
 
  	document.body.appendChild(tag);

   // console.log("SERVICIOS ELEGIDOS: ", this.auth.listaProductosEventos);
    this.appComponent.detectaRuta();
    this.spinner.show();
    this.id = this.rutaActiva.snapshot.params.id;
    this.decha_inicio = this.rutaActiva.snapshot.params.date;
   // console.log("id categoria: ", this.id);
    this.auth.service_general_get('Catalog/productos_by_Cat?id_categoria=' + this.id).subscribe(observer => {
    //  this.auth.service_general_get('Catalog/productos_by_Cat_Date?id_categoria=' + this.id +'&fecha= ' + this.decha_inicio).subscribe(observer => {
    debugger;  
    if (observer.result) {
        this.productos = observer.result;
        this.ejemplo = "Ej. " + this.productos[0].producto;
        console.log("Catalogo: ", observer.result);
        this.productos.forEach((E: any) => {
          E.cantidadUnidades = 0;
          E.cantidadHoras = E.minimoProductos;
        });

        this.productos.forEach((E: any) => {
          for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
            if (E.id == this.auth.listaProductosEventos[i].idCatProducto 
              && this.auth.listaProductosEventos[i].idCategoria == this.id) {
              E.cantidadUnidades = this.auth.listaProductosEventos[i].cantidadUnidades;
              E.cantidadHoras = this.auth.listaProductosEventos[i].cantidadHoras;
            }
          }
        });
        this.calculosT();
        console.log(this.productos);
        this.spinner.hide();
      }
    }, (err) => {
      debugger;  
      this.spinner.hide();
      console.log(err);
    })
  }
  //*************************************************************************//
  //DETECTA SUMA O RESTA DE CONTIDADES//
  public detectarSumaRestaCantidad(model: any, item: any, i: any) {
    // console.log(model);
    // console.log(item);
    //////debugger;;
    if (model >= 0) {
      this.productos[i].cantidadUnidades = model;

      if ((model > this.productos[i].maximoProductos) && (this.productos[i].maximoProductos != null)) {
        this.productos[i].cantidadUnidades = this.productos[i].maximoProductos;
      }
      //this.calculosT();
    } else {
      this.productos[i].cantidadUnidades = 0;
     // this.calculosT();
    }
    this.calculosT();
    this.agregar();
  }
  //DETECTA SUMA O RESTA DE HORAS//
  public detectarSumaRestaHoras(model: any, item: any, i: any) {
    // console.log(model);
    // console.log(item);
    if (model >= item.minimoProductos) {
      this.productos[i].cantidadHoras = model;
    } else {
      this.productos[i].cantidadHoras = item.minimoProductos;
    }
    this.agregar();
    this.calculosT();
    
  }
  //FUNCION PARA AGREGAR CANTIDADES//
  public agregarCantidad(data: any, i: any,) {
   // console.log(data);
    //////debugger;;
    if (data) {
      //  this.productos[i].cantidadUnidades++;
      if ((this.productos[i].cantidadUnidades < this.productos[i].maximoProductos) 
       || (this.productos[i].maximoProductos == null)) {
        this.productos[i].cantidadUnidades++;
      }
     // this.calculosT();
    } else {
      if (this.productos[i].cantidadUnidades > 0) {
        this.productos[i].cantidadUnidades--;
      //  this.calculosT();
      }
    }
    this.agregar();
    this.calculosT();
  }
  //FUNCION PARA AGREGAR HORAS//
  public agregarhora(data: any, i: any, item: any) {
   // console.log(data);
    if (data) {
      this.productos[i].cantidadHoras++;

    } else {
      if (this.productos[i].cantidadHoras > this.productos[i].minimoProductos) {
        this.productos[i].cantidadHoras--;
      }
    }
    this.agregar();
    this.calculosT();
  }
  //*************************************************************************//
  //FUNCION PARA REGRESAR//
  public back() {
    window.history.back();
  }
  //*************************************************************************//
  //FUNCION PARA AGREGAR//
  public agregar() {
   // console.log(this.productos);
   //debugger;;
    this.productos.forEach((E: any) => {
      for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
        if (E.id == this.auth.listaProductosEventos[i].idCatProducto  && this.auth.listaProductosEventos[i].idCategoria == this.id) {
               this.auth.listaProductosEventos.splice(i, 1);
        }
      }
    })

    this.productos.forEach((E: any) => {
      if (E.cantidadUnidades > 0) {
        this.auth.listaProductosEventos.push(
          {
            "id": 0,
            "idEvento": 0,
            "idCatProducto": E.id,
            "cantidadUnidades": E.cantidadUnidades == null ? 1 : E.cantidadUnidades,
            "cantidadHoras": E.cantidadHoras == null ? 1 : E.cantidadHoras,
            "idCategoria": Number(this.id),
            "Nombre": E.producto,
            "Precio": Number(E.precioPorUnidad),
            "especificarTiempo": E.especificarTiempo
          }
        )
      }
    });

    this.auth.categorias.personal1 = false;
    this.auth.categorias.talento3 = false;
    this.auth.categorias.alimentos5 = false;
    this.auth.categorias.mobiliario6 = false;
    this.auth.categorias.luces7 = false;
    this.auth.listaProductosEventos.forEach((E: any) => {
      if (E.idCategoria == 1) {
        this.auth.categorias.personal1 = true;
      }
      if (E.idCategoria == 3) {
        this.auth.categorias.talento3 = true;
      }
      if (E.idCategoria == 5) {
        this.auth.categorias.alimentos5 = true;
      }
      if (E.idCategoria == 6) {
        this.auth.categorias.mobiliario6 = true;
      }
      if (E.idCategoria == 7) {
        this.auth.categorias.luces7 = true;
      }
    });
    localStorage.setItem('categorias', JSON.stringify(this.auth.categorias));
    localStorage.setItem('productos', JSON.stringify(this.auth.listaProductosEventos));
    console.log("Productos a pagar: ", this.auth.listaProductosEventos);
  //  this.back();
  }
  //*************************************************************************//
  
  public yt = "https://www.youtube.com/embed/rRcSK1As9AY";
  public ytid= "rRcSK1As9AY";
  public ytid2= "80_Cr9m-1fE";

  detalle(type: any, item: any) {
    localStorage.setItem('detalle', JSON.stringify(item))
    let ancho = '';
    let alto = '250%';
    if (type == 1) {
      ancho = '80%';
      alto = '82%';
    } else {
      ancho = '100%';
    }
    const dialogRef = this._dialog.open(DetalleProductoComponent, {
      width: ancho,
      height: alto,
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      //debugger;;
      if (result.success) {
        console.log(result);
        this.guardarServiciosElegidosDetalle(result);
      } else if (!result.success) {
        let info_respaldo = JSON.parse(localStorage.getItem('detalle') || '{}');
        for (let i = 0; i < this.productos.length; i++) {
          if (this.productos[i].id == item.id) {
            this.productos[i] = info_respaldo;
          }
        }
      }
    })
  }

  public guardarServiciosElegidosDetalle(result: any) {

    //debugger;;
    console.log(this.productos);
    for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
      if (result.idCategoriaProducto == this.auth.listaProductosEventos[i].idCategoria && this.auth.listaProductosEventos[i].idCategoria == this.id) {
        this.auth.listaProductosEventos.splice(i, 1);
      }
    }

    if (result.cantidadUnidades > 0) {
      this.auth.listaProductosEventos.push(
        {
          "id": 0,
          "idEvento": 0,
          "idCatProducto": result.id,
          "cantidadUnidades": result.cantidadUnidades == null ? 1 : result.cantidadUnidades,
          "cantidadHoras": result.cantidadHoras == null ? 1 : result.cantidadHoras,
          "idCategoria": Number(this.id),
          "Nombre": result.producto,
          "Precio": Number(result.precioPorUnidad),
          "especificarTiempo": result.especificarTiempo
        });
    }

    this.productos.forEach((E: any) => {
      for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
        if (E.id == this.auth.listaProductosEventos[i].idCatProducto && this.auth.listaProductosEventos[i].idCategoria == this.id) {
          E.cantidadUnidades = this.auth.listaProductosEventos[i].cantidadUnidades;
          E.cantidadHoras = this.auth.listaProductosEventos[i].cantidadHoras;
        }
      }
    });
    
    this.auth.categorias.personal1 = false;
    this.auth.categorias.talento3 = false;
    this.auth.categorias.alimentos5 = false;
    this.auth.categorias.mobiliario6 = false;
    this.auth.categorias.luces7 = false;
    this.auth.listaProductosEventos.forEach((E: any) => {
      if (E.idCategoria == 1) {
        this.auth.categorias.personal1 = true;
      }
      if (E.idCategoria == 3) {
        this.auth.categorias.talento3 = true;
      }
      if (E.idCategoria == 5) {
        this.auth.categorias.alimentos5 = true;
      }
      if (E.idCategoria == 6) {
        this.auth.categorias.mobiliario6 = true;
      }
      if (E.idCategoria == 7) {
        this.auth.categorias.luces7 = true;
      }
    });
    localStorage.setItem('categorias', JSON.stringify(this.auth.categorias));
    localStorage.setItem('productos', JSON.stringify(this.auth.listaProductosEventos));

    this.calculosT();
  }
  //*************************************************************************//
  //FUNCION PARA SACAR IVA, TOTAL Y SUBTOTAL//
  public Subtotal = 0;
  public IVA = 0;
  public total = 0;

  public calculosT() {
     ////debugger;;
     this.Subtotal = 0;
     this.IVA = 0;
     this.total = 0;

    this.auth.listaProductosEventos.forEach((E: any) => {
      this.total = this.total + E.Precio * E.cantidadUnidades * E.cantidadHoras;
    });
    let flete = 0;
    this.auth.listaProductosEventos.forEach((E: any) => {
      if (E.idCategoria == 6 || E.idCategoria == 7) {
        flete++;
      }
    });
    if (flete > 0) {
      this.total = this.total + 500;
    }
    ////debugger;;
    this.Subtotal = this.total / 1.16;
    this.IVA = this.total - this.Subtotal;
    //alert(this.total);
    this.Subtotal = parseFloat(this.Subtotal.toFixed(2));
    //alert(this.total);
  //  console.log("Productos listado ===============>" , this.Productos_listado)
  }

}

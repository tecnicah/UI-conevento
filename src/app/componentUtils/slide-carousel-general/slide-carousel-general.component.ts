import { Component, HostListener, ViewChild, ElementRef, OnInit, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { DetalleProductoComponent } from 'src/app/dialog/detalle-producto/detalle-producto.component';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/HttpRequest/service.filter.service'

@Component({
  selector: 'app-slide-carousel-general',
  templateUrl: './slide-carousel-general.component.html',
  styleUrls: ['./slide-carousel-general.component.scss']
})
export class SlideCarouselGeneralComponent implements OnInit {
  isOpen: string = '';

  constructor(public appComponent: AppComponent, 
    public spinner: SpinnerService, 
    private rutaActiva: ActivatedRoute, 
    public auth: HttpService, 
    public _dialog: MatDialog,
    private filterService: FilterService) { }
  @Input() idCategoria = 0;
  @Input() idSubCategoria = 0;
  @Input() titulo = "";
  @Input() filter = "";
  suscription: Subscription;
  public productos: any = [];
  public reset: any = [];
  public ejemplo = "";
  public id: any;
  userFilter: any = { producto:  this.appComponent.filter};

  //Carousel
  totalCards: number = 0;//this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number;
  totalPages: number;
  overflowWidth: string;
  cardWidth: string;
  containerWidth: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit(): void {
    console.log(this.idCategoria);
    console.log(this.idSubCategoria);
    console.log(this.filter);
    this.id = this.rutaActiva.snapshot.params.id;
    this.auth.service_general_get('Catalog/productos_by_Cat?id_categoria=' + this.id).subscribe(observer => {
      //  this.auth.service_general_get('Catalog/productos_by_Cat_Date?id_categoria=' + this.id +'&fecha= ' + this.decha_inicio).subscribe(observer => {
    //  debugger;  
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
debugger;
          if(this.idSubCategoria != 0){
            this.productos = this.productos.filter(x => x.idSubcategoriaProductos == this.idSubCategoria);
          }
          
          this.reset = this.productos;
          //debugger;
          this.calculosT();
          console.log(this.productos);
          this.totalCards = this.productos.length;
          this.cardsPerPage = this.getCardsPerPage();
          this.initializeSlider();
          this.spinner.hide();
        }
      }, (err) => {
        debugger;  
        this.spinner.hide();
        console.log(err);
    });

    this.filterService.change.subscribe(isOpen => {
      console.log(isOpen);
      console.log(this.reset);
      if(isOpen == "reset"){
        this.productos = this.reset;
      }
      else{
        this.productos = this.productos.filter(el => el.producto.toLowerCase().indexOf(isOpen.toLowerCase()) !== -1);
      }
      //console.log(this.productos.filter(el => el.producto.toLowerCase().indexOf(isOpen.toLowerCase()) !== -1));
    });
  }
  
  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    console.log(this.container.nativeElement.offsetWidth, 200);
    return Math.floor(this.container.nativeElement.offsetWidth / 250);
  }

  changePage(incrementor) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

  //*************************************************************************//
  //DETECTA SUMA O RESTA DE CONTIDADES//
  public detectarSumaRestaCantidad(model: any, item: any, _id: any) {
    debugger;
    var producto_sel = this.productos.filter(x => x.id == _id)[0];
    var i = this.productos.indexOf(producto_sel);

    if (model >= 0) {
      this.productos[i].cantidadUnidades = model;

      if ((model > this.productos[i].maximoProductos) && (this.productos[i].maximoProductos != null)) {
        this.productos[i].cantidadUnidades = this.productos[i].maximoProductos;
      }
    } else {
      this.productos[i].cantidadUnidades = 0;
    }
    
    this.agregar();
    this.calculosT();
  }
  //DETECTA SUMA O RESTA DE HORAS//
  public detectarSumaRestaHoras(model: any, item: any, _id: any) {
    var producto_sel = this.productos.filter(x => x.id == _id)[0];
    var i = this.productos.indexOf(producto_sel);

    if (model >= item.minimoProductos) {
      this.productos[i].cantidadHoras = model;
    } else {
      this.productos[i].cantidadHoras = item.minimoProductos;
    }
    this.agregar();
    this.calculosT();
    
  }
  //FUNCION PARA AGREGAR CANTIDADES//
  public agregarCantidad(data: any, _id: any,) {
    debugger;
    var producto_sel = this.productos.filter(x => x.id == _id)[0];
    var i = this.productos.indexOf(producto_sel);
    if (data) {
      if ((this.productos[i].cantidadUnidades < this.productos[i].maximoProductos) 
           || (this.productos[i].maximoProductos == null)) {
        this.productos[i].cantidadUnidades++;
      }
    } else {
      if (this.productos[i].cantidadUnidades > 0) {
        this.productos[i].cantidadUnidades--;
      }
    }
    this.agregar();
    this.calculosT();
  }
  //FUNCION PARA AGREGAR HORAS//
  public agregarhora(data: any, _id: any, item: any) {
    var producto_sel = this.productos.filter(x => x.id == _id)[0];
    var i = this.productos.indexOf(producto_sel);

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
     this.total = this.total + 850;
   }
   ////debugger;;
   this.Subtotal = this.total / 1.16;
   this.IVA = this.total - this.Subtotal;
   //alert(this.total);
   this.Subtotal = parseFloat(this.Subtotal.toFixed(2));
   //alert(this.total);
 //  console.log("Productos listado ===============>" , this.Productos_listado)
   this.appComponent.total = this.total;
   //this.appComponent.getTotal();
 }

}
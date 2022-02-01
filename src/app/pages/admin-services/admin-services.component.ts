import { NgxPaginationModule } from 'ngx-pagination';
import { Component, OnInit, ViewChild, PipeTransform, Pipe, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadedImage } from 'ngx-image-cropper/lib/interfaces';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface servicio {
   id: number;
   producto:string;
   descripcionCorta:string;
   descripcionLarga:string;
   idSubcategoriaProductos:number;
   idCategoriaProducto:number;
   precioPorUnidad:number;
   diasBloqueoAntes:number;
   diasBloqueoDespues:number;
   idCatTipoUnidad:number;
   minimoProductos:number;
   imagenSeleccion:string;
   activo:true;
   especificarTiempo:boolean;
   tipoImagenSeleccion:string;
   maximoProductos:number;
   especificacionEspecial:string;
   sku:string;
   stockInicial:number;
   image: string;
}

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None
})
export class AdminServicesComponent implements OnInit {
  action_modal: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  formModal: FormGroup;
  imageChangedEvent: any = '';
  //croppedImage: any = '';
  LoadedImage: any = '';
  constructor(pipe: DecimalPipe, private modalService: NgbModal
    , public spinner: SpinnerService, private _formBuilder: FormBuilder
    , public auth: HttpService, public router_: Router, public _dialog: MatDialog
    , public appComponent:AppComponent, private _snackBar: MatSnackBar,
    public fb: FormBuilder) {
      this.formModal = fb.group({
        id: [0],
        producto: ['', Validators.required],
        descripcionCorta: ['', Validators.required], 
        descripcionLarga: ['', Validators.required],
        idSubcategoriaProductos: [''],
        idCategoriaProducto: ['', Validators.required],
        precioPorUnidad: [''],
        diasBloqueoAntes: [''],
        diasBloqueoDespues: [''],
        idCatTipoUnidad: [1],
        minimoProductos: [''],
        imagenSeleccion: [''],
        activo: [true],
        especificarTiempo: [''],
        tipoImagenSeleccion: [''],
        maximoProductos: [''],
        especificacionEspecial: ['', Validators.required],
        sku: [''],
        stockInicial: [''],
        image: null,
      });
    }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalContentCrop', { static: true }) modalContentCrop: TemplateRef<any>;
  @ViewChild('cuentaPostulanteModal', { static: true }) cuentaPostulanteModal: NgbModal | undefined;
  modal: NgbModalRef | undefined;

  ngOnInit(): void {
    this.formModal.reset();
    this.catalogos();
 //this.get_resultados();
    this.get_resultados1();
  }
  
//*******************************************// 
  //CATALOGOS//
  public categorias: any = [];
  public subcategorias: any = [];
  public catalogos() {
    this.spinner.show();
    this.auth.service_general_get('Catalog/Cat_Categorias').subscribe(observer => {
      if (observer.result) {
        this.categorias = observer.result;
        this.categorias.forEach((E: any) => {
          if (E.id == 1) {
            E.checked = this.auth.categorias.personal1;
            E.numproductos = [];
          }
          if (E.id == 3) {
            E.checked = this.auth.categorias.talento3;
            E.numproductos = [];
          }
          if (E.id == 5) {
            E.checked = this.auth.categorias.alimentos5;
            E.numproductos = [];
          }
          if (E.id == 6) {
            E.checked = this.auth.categorias.mobiliario6;
            E.numproductos = [];
          }
          if (E.id == 7) {
            E.checked = this.auth.categorias.luces7;
            E.numproductos = [];
          }
        });
       //  console.log("categprias ===============",this.categorias);
       // this.initSettings();

      }
    }, (err) => {
      console.log(err);
    });
  }

  openSnackBar(texto) {
    this._snackBar.open(texto, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  getSubcategoria(id){
    console.log(id);
    this.auth.service_general_get('Catalog/Get_Cat_SubCategorias?id='+id).subscribe(observer => {
      if (observer.result) {
        this.subcategorias = observer.result;
      }
    }, (err) => {
      console.log(err);
    });
    this.spinner.hide();
  }

  save(){
    debugger;
    console.log(this.formModal);
    this.spinner.show();
    console.log(JSON.stringify(this.formModal.value));
    if(this.formModal.valid){
      this.auth.service_general_post_with_url('Catalog/CreateProductoServicios', this.formModal.value).subscribe(observer => {
        console.log(observer);
          if (observer.success) {
            console.log(observer);
            this.openSnackBar("Servicio creado correctamente");
            this.get_resultados1();
            this.formModal.reset();
          }
        }, (err) => {
          console.log(err);
          this.openSnackBar(err);
        });
        this.spinner.hide();
    }
    else{
      this.openSnackBar("Por favor valida los campos en rojo");
      this.spinner.hide();
    }
  }

  edit(){
    
    this.spinner.show();
    console.log(JSON.stringify(this.formModal.value));
    this.auth.service_general_put_with_url('Catalog/UpdateProductoServicios', this.formModal.value).subscribe(observer => {
    console.log(observer);
      if (observer.success) {
        console.log(observer);
        this.openSnackBar("Servicio editado correctamente");
        this.get_resultados1();
        this.formModal.reset();
      }
    }, (err) => {
      console.log(err);
      this.openSnackBar(err);
    });
    this.spinner.hide();
  }

  getdatabyEdit(id){
    //this.formModal.reset(this.formModal.value);
    this.spinner.show();
    this.auth.service_general_get('Catalog/Get_Cat_CategoriasById?id_categoria='+id).subscribe(observer => {
    console.log(observer);
      if (observer.success) {
        // this.formModal.controls.image.setValue('');
        console.log(this.formModal.controls.imagenSeleccion.value);
        this.formModal.patchValue(observer.result[0]);
        this.handleEvent("edit", '');
      }
    }, (err) => {
      console.log(err);
      this.openSnackBar(err);
    });
    this.spinner.hide();
  }
/////////////////////////////////////////////////////
//////////////////// BUSQUEDA //////////////////////

public get_resultados(){
  this.spinner.show();
  setTimeout(() => {
    debugger;

    const datepipe: DatePipe = new DatePipe('en-US')

    let formattedDate = formatDate(this.fechaInicial != "" ? this.fechaInicial : "01/01/2000" ,'MM-dd-yyyy','en-US');
    this.data_model.fechaInicial = formattedDate;

    formattedDate = formatDate(this.fechaFinal != "" ? this.fechaFinal : "01/01/2000" ,'MM-dd-yyyy','en-US');
    this.data_model.fechaFinal = formattedDate;
    this.data_model.id_municipio = this.id_municipio;
    this.auth.service_general_post_with_url('Eventos/GetServicesDetailByfilter', this.data_model).subscribe(r => {
      if (r.success) {
        this.resultados = r.result.value;
      //  console.log("respuesta exitosa: ", r.result, this.resultados);
        this.spinner.hide();
      }
    }, (err) => {
      console.log("Error al consultar información: ", err);
      this.spinner.hide();
    })
  }, 3000);
}

public get_resultados1(){
  this.spinner.show();
  setTimeout(() => {
  
debugger;
     this.auth.service_general_post_with_url('Catalog/productos_by_cateid_navigate?id_cat=' +this.id_cat, '').subscribe(r => {
       if (r.success) {
         this.resultados_p = r.result;
         console.log("respuesta service_general_post_with_url: ", this.resultados_p);
         this.spinner.hide();
       }
     }, (err) => {
       console.log("Error al consultar información service_general_post_with_url: ", err);
       this.spinner.hide();
     })
    }, 3000);
}

handleEvent(action: string, event): void {
  console.log(this.formModal.value);
  this.action_modal = action;
  //this.formModal.controls.imagenSeleccion.setValue(action);
  if(action == 'add'){
    this.formModal.reset();
  }

  this.modalService.open(this.modalContent, { size: 'lg' });
}

handleEvenCrop(action: string, event): void {

  this.modalService.open(this.modalContentCrop, { size: 'lg' });
}

fileChangeEvent(event: any): void {
  console.log(event.path[0].files[0].name);
  this.formModal.controls.imagenSeleccion.setValue(event.path[0].files[0].name);
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.formModal.controls.image.setValue(event.base64.split(',')[1]);
  console.log(event);
}
imageLoaded(image: LoadedImage) {
  // show cropper
  console.log(image);
}
cropperReady(event) {
  // cropper ready
}
loadImageFailed() {
  // show message
}

closeModal(){
  this.formModal.controls.imagenSeleccion.setValue('');
}

  public limpiarFiltros() {
    this.fechaInicial = "";
    this.fechaFinal = "";
    this.id_municipio = 0;
    this.id_cat = 0;
    this.profesion ="";
    this.get_resultados();
  }

  viewdetail(item: any){
    
    this.get_detalle_evento(item.id);
  }

  get_detalle_evento(id: number){
   
      let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
      this.spinner.show();
      this.auth.service_general_post_with_url('Catalog/productos_by_id_navigate?id='+ id, '').subscribe(r => {
        if(r.result){
          debugger;
          this.spinner.hide();
          if(r.result.length > 0)
          {
            console.log("POP UP | value servicio/producto ================== > : " ,r.result);
            this.servicio =  r.result[0];
            this.modal = this.modalService.open(this.cuentaPostulanteModal, { scrollable: true, size: 'lg' });
          }
          else
          {
            console.log("No trajo resultados el clik en el sku " ,r.result);
          }
         
        }
      },(err)=>{
        this.spinner.hide();
        console.log(err);
      })

  }


  ///////////////////VARIABLES NUEVAS //////////////////////////////////////////////
page = 1;
pageSize = 4;
public data_model: any = {};
countries$: any =  [] ;
filter = new FormControl('');
public servicio :any;
public resultados :any = [];
public resultados_p: any = [];

///////////// VARIABLES VIEJAS 
new: any;
key: string = 'name';
reverse: boolean = false;
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;

}

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  password: string = "";
  confirmapassw: string = "";
  isError: boolean = false;
  mensajevalida: string = "";
  result: any = [];
  isregister: boolean = true;
  msj: string = "";
  validaterminos: boolean = false;
  mensajeService: string = "";
  confirmar: boolean = false;
  islogued: boolean = true;
  id: any = 0;

  viewPass: any = {
    uno: 'password',
    dos: 'password'
  }

  //modal: NgbModalRef;


  public fechaInicial: string = "";
  public fechaFinal: string = "";
  public id_municipio: number = 0;
  public id_cat: number = 0;
  public profesion: string = "";
  public paisId: number = 0;
  public ofertas: number = 0;
  public ciudad = '';
  public userFilter: any = { producto: '' };
  public paisIddos: number = 0;
  public ciudaddos = '';
  //public gender: '';

  postulantes: any[] = [];

  totalespostulantes: any = {};
  dropdownSettings: any = {};

  dropdownList: any[] = [];
  dropdownList1: any[] = [];

  country: any[] = [];
  city: any[] = [];
  vacantes: any[] = [];
  public date: string = "";

  p = 1;
  _p = 1;
  filter_: any = {
    first_name: null,
    last_name: null,
    email: null,
    city: null,
    genre: '',
    profesion: ''
  };

  filtro: any = "";

}



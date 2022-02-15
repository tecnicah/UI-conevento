import { NgxPaginationModule } from 'ngx-pagination';
import { Component, OnInit, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
  providers: [DecimalPipe]
})
export class AdminEventsComponent implements OnInit {

  constructor(pipe: DecimalPipe, private modalService: NgbModal
    , public spinner: SpinnerService, private _formBuilder: FormBuilder
    , public auth: HttpService, public router_: Router, public _dialog: MatDialog
    , public appComponent: AppComponent) {
  }

  @ViewChild('cuentaPostulanteModal', { static: true }) cuentaPostulanteModal: NgbModal | undefined;

  modal: NgbModalRef | undefined;

  ngOnInit(): void {
    this.get_resultados();
  }


  /////////////////////////////////////////////////////
  //////////////////// BUSQUEDA //////////////////////

  public get_resultados() {
    this.spinner.show();
    setTimeout(() => {
      debugger;

      const datepipe: DatePipe = new DatePipe('en-US')

      let formattedDate = formatDate(this.fechaInicial != "" ? this.fechaInicial : "01/01/2000", 'MM-dd-yyyy', 'en-US');
      this.data_model.fechaInicial = formattedDate;

      formattedDate = formatDate(this.fechaFinal != "" ? this.fechaFinal : "01/01/2000", 'MM-dd-yyyy', 'en-US');
      this.data_model.fechaFinal = formattedDate;
      this.data_model.id_municipio = this.id_municipio;
      this.auth.service_general_post_with_url('Eventos/GetServicesDetailByfilter', this.data_model).subscribe(r => {
        if (r.success) {
          this.resultados = r.result.value;
          console.log("respuesta exitosa: ", r.result, this.resultados);
          this.spinner.hide();
        }
      }, (err) => {
        console.log("Error al consultar información: ", err);
        this.spinner.hide();
      })
    }, 3000);
  }

  public opencalendario(){
    
  }

  public limpiarFiltros() {
    this.fechaInicial = "";
    this.fechaFinal = "";
    this.id_municipio = 0;
    this.profesion = "";
    this.get_resultados();
  }

  viewdetail(item: any) {
    this.get_detalle_evento(item.id);
  }

  get_detalle_evento(id: number) {

    let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.spinner.show();
    this.auth.service_general_post_with_url('Eventos/GetEventDtailById?id_=' + id, '').subscribe(r => {
      if (r.result) {
        this.spinner.hide();
        // console.log(r.result);
        console.log("POP UP | value evento ================== > : ", r.result.value);
        this.eventos = r.result.value;
        this.modal = this.modalService.open(this.cuentaPostulanteModal, { scrollable: true, size: 'lg' });
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })

  }

  ///////////////////VARIABLES NUEVAS //////////////////////////////////////////////
  page = 1;
  pageSize = 4;
  public data_model: any = {};
  countries$: any = [];
  filter = new FormControl('');
  public eventos: any = [];
  public resultados: any = [];


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
  public profesion: string = "";
  public paisId: number = 0;
  public ofertas: number = 0;
  public ciudad = '';
  public userFilter: any = { nombreContratane: '' };
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



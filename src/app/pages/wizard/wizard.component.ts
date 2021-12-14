import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public firstFormGroup!: FormGroup;
  public submitted = false;
  public isLinear = false;
  public Productos_listado: any = [];
  public emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public spinner: SpinnerService, private _formBuilder: FormBuilder, public auth: HttpService, public router_: Router, public _dialog: MatDialog
  ) {

  }
  //*******************************************// 
  //CATALOGOS//
  public categorias: any = [];
  public catalogos() {
    this.auth.service_general_get('Catalog/Cat_Categorias').subscribe(observer => {
      if (observer.result) {
        this.categorias = observer.result;
        this.categorias.forEach((E:any) => {
          E.descCorta = E.descripcion;
          if(E.id == 1){
             E.checked = this.auth.categorias.personal1;
          }
          if(E.id == 3){
            E.checked = this.auth.categorias.talento3;
          }
          if(E.id == 5){
            E.checked = this.auth.categorias.alimentos5;
          }
          if(E.id == 6){
            E.checked = this.auth.categorias.mobiliario6;
          }
          if(E.id == 7){
            E.checked = this.auth.categorias.luces7;
          }
        });
        console.log(this.categorias);
      }
    }, (err) => {
      console.log(err);
    })
  }
  //*******************************************// 
  //FUNCIONES PARA VALIDACION DE FORMULARIO//
  public total = 0;
  public Subtotal = 0;
  public IVA = 0;
  ngOnInit() {
    this.catalogos();
    if(localStorage.getItem('categorias')){
       this.auth.categorias = JSON.parse(localStorage.getItem('categorias') || '{}');
    }
    if(localStorage.getItem('form')){
      this.data_model = JSON.parse(localStorage.getItem('form') || '{}');
      this.auth.data_form = JSON.parse(localStorage.getItem('form') || '{}');;
    }
    
    if (localStorage.getItem('productos')) {
      this.Productos_listado = JSON.parse(localStorage.getItem('productos') || '{}');
      this.auth.listaProductosEventos = JSON.parse(localStorage.getItem('productos') || '{}');
      if (this.Productos_listado.length != 0) {
        this.steps = {
          uno: "complete",
          dos: "selected",
          tres: "next",
          cuatro: false
        }
        this.calculos();
      }
    }
    this.firstFormGroup = this._formBuilder.group({
      fechaHoraInicio: new FormControl(null, Validators.compose([Validators.required])),
      fechaHoraFin: ['', Validators.required],
      genteEsperada: ['', Validators.required],

      ciudad: [1, Validators.required],
      idCatMunicipio: ['', Validators.required],
      cp: ['', Validators.required],
      calleNumero: ['', Validators.required],
      colonia: ['', Validators.required],

      nombreContratane: ['', Validators.required],
      nombreEvento: ['', Validators.required],
      //correo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      telefono: ['', Validators.required],
    });
    if (localStorage.getItem('form')) {
      this.fillForm();
    }
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      console.log("NO ESTA COMPLETO: ", this.firstFormGroup.invalid);
      return;
    }
    console.log(this.firstFormGroup);
    this.saveForm();
    this.next();
  }
  //*******************************************//
  //FUNCIONES PARA SELECCION DE SERVICIOS//
  public selectServices(item: any) {
    this.router_.navigateByUrl('SeleccionarServicios/' + item.id)
  }
  //*******************************************//
  //FUNCION PARA SACAR IVA, TOTAL Y SUBTOTAL//
  public calculos() {
    this.Productos_listado.forEach((E: any) => {
      this.Subtotal = this.Subtotal + E.Precio * E.cantidadUnidades;
    });
    this.IVA = this.Subtotal * 0.16;
    this.total = this.Subtotal + this.IVA;
  }
  //*******************************************//
  //FUNCION PARA SALVAR LA DATA DEL FORMULARIO//
  public data_model: any = {
    fechaHoraInicio: '',
    fechaHoraFin: ''
  };
  public saveForm() {
    this.data_model = {
      calleNumero: this.firstFormGroup.value.calleNumero,
      ciudad: this.firstFormGroup.value.ciudad,
      colonia: this.firstFormGroup.value.colonia,
      correo: this.firstFormGroup.value.correo,
      cp: this.firstFormGroup.value.cp,
      fechaHoraFin: this.firstFormGroup.value.fechaHoraFin,
      fechaHoraInicio: this.firstFormGroup.value.fechaHoraInicio,
      genteEsperada: this.firstFormGroup.value.genteEsperada,
      idCatMunicipio: this.firstFormGroup.value.idCatMunicipio,
      nombreContratane: this.firstFormGroup.value.nombreContratane,
      nombreEvento: this.firstFormGroup.value.nombreEvento,
      telefono: this.firstFormGroup.value.telefono
    }
    this.auth.data_form = this.data_model;
    console.log("data_model: ", this.data_model);
    localStorage.setItem('form', JSON.stringify(this.data_model))
  }
  //*******************************************//
  //FUNCION PARA LLENAR EL FORMULAARIO//
  public fillForm() {
    let data = JSON.parse(localStorage.getItem('form') || '{}')
    this.firstFormGroup.get('fechaHoraInicio')?.setValue(data.fechaHoraInicio);
    this.firstFormGroup.get("fechaHoraFin")?.setValue(data.fechaHoraFin);
    this.firstFormGroup.get("genteEsperada")?.setValue(data.genteEsperada);
    this.firstFormGroup.get("ciudad")?.setValue(data.ciudad);
    this.firstFormGroup.get("idCatMunicipio")?.setValue(data.idCatMunicipio);
    this.firstFormGroup.get("cp")?.setValue(data.cp);
    this.firstFormGroup.get("calleNumero")?.setValue(data.calleNumero);
    this.firstFormGroup.get("colonia")?.setValue(data.colonia);
    this.firstFormGroup.get("nombreContratane")?.setValue(data.nombreContratane);
    this.firstFormGroup.get("nombreEvento")?.setValue(data.nombreEvento);
    this.firstFormGroup.get("correo")?.setValue(data.correo);
    this.firstFormGroup.get("telefono")?.setValue(data.telefono);
    console.log(this.firstFormGroup);
  }
  //*******************************************//
  //FUNCIONES PARA PASO 3//
  public step = 0;
  public pagarOpciones() {
    this.step = 1;
  }
  //*******************************************//
  //FUNCIONES PARA CONTROL DE STEPPER//
  public steps: any = {
    uno: "selected",
    dos: "next",
    tres: "next",
    cuatro: false
  }

  next() {
    if (this.steps.uno == "selected") {
      this.steps = {
        uno: "complete",
        dos: "selected",
        tres: "next",
        cuatro: false
      }
    } else if (this.steps.dos == "selected") {
      this.steps = {
        uno: "complete",
        dos: "complete",
        tres: "selected",
        cuatro: false
      }
    } else if (this.steps.tres == "selected") {
      this.steps = {
        uno: "complete",
        dos: "complete",
        tres: "complete",
        cuatro: true
      }
    }
  }

  after() {
    if (this.steps.uno == "complete") {
      this.steps = {
        uno: "selected",
        dos: "next",
        tres: "next",
        cuatro: false
      }
    } else if (this.steps.dos == "complete") {
      this.steps = {
        uno: "selected",
        dos: "next",
        tres: "next",
        cuatro: false
      }
    } else if (this.steps.tres == "complete") {
      this.steps = {
        uno: "complete",
        dos: "select",
        tres: "next",
        cuatro: false
      }
    }
  }
  //*******************************************//
  //FUNCIONES PARA GUARDAR EL EVENTO//
  public saveEvent(type:any) {
    if(!localStorage.getItem('userData')){
      let ancho = '';
      if(type==1){
        ancho = '50%';
      }else{
        ancho = '100%';
      }
      const dialogRef = this._dialog.open(LoginComponent, {
        width: ancho
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
  
        }
      })
    }
    this.next();
    this.spinner.show();
    let json_bd: any = this.auth.data_form;
    if(localStorage.getItem('userData')){
      let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
      json_bd.idUsuario = data_user.id;
    }
    json_bd.fechaCreacion = new Date();
    json_bd.detallesEventostring = "hardcoding",
    json_bd.fechaPago = new Date();
    json_bd.referenciaPago = "1234567890";
    json_bd.pagado = true,
    json_bd.claveSeguimientoCarrito = "1234567890",
    json_bd.listaProductosEventos = this.auth.listaProductosEventos;
    console.log("EVENTOS A GUARDAR: ", json_bd);

    this.auth.service_general_post_with_url('Eventos/AddEvent', json_bd).subscribe(r => {
      if (r.success) {
        console.log("respuesta exitosa: ", r);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dsifruta de tu evento',
          showConfirmButton: false,
          timer: 1500
        })
        this.auth.data_form = {};
        this.auth.listaProductosEventos = [];
        localStorage.removeItem('form');
        localStorage.removeItem('productos');
        localStorage.removeItem('categorias');
        this.spinner.hide();
      }
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    })
  }
  //*******************************************//
}

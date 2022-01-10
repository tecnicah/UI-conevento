import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivationStart, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { AppComponent } from 'src/app/app.component';
import { WizardLoginComponent } from 'src/app/dialog/wizard-login/wizard-login.component';
import { loadStripe, Stripe } from '@stripe/stripe-js';

//declare var paypal;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})



export class WizardComponent implements OnInit {
  //public paypal:any;
  //@ViewChild('paypal', {static:true}) paypalElement: ElementRef;
  public firstFormGroup!: FormGroup;
  public submitted = false;
  public isLinear = false;
  public Productos_listado: any = [];
  public emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  producto = {
    descripcion: "es algo descriptitvo",
    precio: 5.5,
    imagen: "sin imagen"
  }
  public formaPago = "No capturada";

  //////////// declaracion de variables golbales del componente 

  public payPalConfig?: IPayPalConfig;
  public  yourDate: any;
  public fecha_inicio_valid: any = true;
  public today = new Date();
  public dd = this.today.getDate();
  public mm = this.today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
  public data_model: any = {
    fechaHoraInicio: '',
    fechaHoraFin: ''
  };
  public data_user_model: any = {};
  public error_alguardar: boolean = false;


  constructor(public spinner: SpinnerService, private _formBuilder: FormBuilder
    , public auth: HttpService, public router_: Router, public _dialog: MatDialog, public appComponent:AppComponent) {

  }
  //*******************************************// 
  //CATALOGOS//
  public categorias: any = [];
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
        // console.log(this.categorias);
        this.initSettings();

      }
    }, (err) => {
      console.log(err);
    })
  }

 ///////////////////////////////// validar la sesión 

  //*******************************************//
  //INICIALIZACION DE PARAMETROS//
  ngOnInit() {
    this.appComponent.detectaRuta();
    this.initConfigPayPal();
    this.load_stripe_card();
    //paypal.Buttons().render(this.paypalElement.nativeElement);
    this.catalogos();
    this.firstFormGroup = this._formBuilder.group({
      fechaHoraInicio: new FormControl(null, Validators.compose([Validators.required])),
      fechaHoraFin: ['', Validators.required],
      genteEsperada: [''],

      ciudad: [1, Validators.required],
      idCatMunicipio: ['', Validators.required],
      cp: [''],
      calleNumero: ['', Validators.required],
      colonia: ['', Validators.required],

      nombreContratane: ['', Validators.required],
      nombreEvento: [''],
      correo: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      telefono: ['', Validators.required],
    });
    this.appComponent.get_sesion();
  }

  private initConfigPayPal(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        application_context: {
           shipping_preference: "NO_SHIPPING" 
          },
        payer: {
           email_address: this.data_model.correo,
           name: {
              given_name: this.data_model.nombreContratane,
              surname: this.data_model.nombreContratane
           },
           address: {
            address_line_1: this.data_model.calleNumero,
            address_line_2: this.data_model.colonia,
            admin_area_2: this.data_model.colonia,
            admin_area_1: "DF",
            //phone_number: "5554560284",
            //postal_code: this.data_model.cp,
            country_code: "MX"

           },
          },
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.total.toFixed(2).toString(),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.total.toString()
              }
            }
          },
          items: [{
            name: 'Mi Evento',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
            currency_code: 'MXN',
            value: this.total.toFixed(2).toString(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
       // this.formaPago = "PayPal"
        this.saveEvent(data.create_time, data.id, "PayPal");
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  //*******************************************// 
  //FUNCIONES PARA VALIDACION DE FORMULARIO//
  public total = 0;
  public Subtotal = 0;
  public IVA = 0;
  public initSettings() {
     
    if (localStorage.getItem('categorias')) {
      this.auth.categorias = JSON.parse(localStorage.getItem('categorias') || '{}');
    }
    if (localStorage.getItem('form')) {
      this.data_model = JSON.parse(localStorage.getItem('form') || '{}');
      this.auth.data_form = JSON.parse(localStorage.getItem('form') || '{}');
      this.steps = {
        uno: "complete",
        dos: "selected",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-none",
        dos: "class-view",
        tres: "class-none",
        cuatro: "class-none"
      }
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
        this.steps_css = {
          uno: "class-none",
          dos: "class-view",
          tres: "class-none",
          cuatro: "class-none"
        }
        this.calculos();
      }
    }
    this.setNumProductos();
    this.setchecks();

    if (localStorage.getItem('form')) {
      this.fillForm();
    }
    this.restart_dates();
    //this.get_sesion();
    this.spinner.hide();
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      window.scrollTo( 100, 360 );
      console.log("NO ESTA COMPLETO: ", this.firstFormGroup.invalid);
      return;
    }
    // console.log(this.firstFormGroup);
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
  public flete: number = 0;
  // public calculos() {
  //   this.Productos_listado.forEach((E: any) => {
  //     this.Subtotal = this.Subtotal + E.Precio * E.cantidadUnidades;
  //   });
  //   this.flete = 0;
  //   this.Productos_listado.forEach((E: any) => {
  //     if (E.idCategoria == 6 || E.idCategoria == 7) {
  //       this.flete++;
  //     }
  //   });
  //   if (this.flete > 0) {
  //     this.Subtotal = this.Subtotal + 500;
  //   }
  //   this.IVA = this.Subtotal * 0.16;
  //   this.total = this.Subtotal + this.IVA;
  //   //alert(this.total);
  //   this.total = parseFloat(this.total.toFixed(2));
  //   //alert(this.total);
  // //  console.log("Productos listado ===============>" , this.Productos_listado)
  // }

  public calculos() {
    this.Subtotal = 0;
    this.IVA = 0;
    this.total = 0;

    this.Productos_listado.forEach((E: any) => {
      this.total = this.total + E.Precio * E.cantidadUnidades * E.cantidadHoras;
    });

    this.flete = 0;
    this.Productos_listado.forEach((E: any) => {
      if (E.idCategoria == 6 || E.idCategoria == 7) {
        this.flete++;
      }
    });
    if (this.flete > 0) {
      this.total = this.total + 500;
    }
    this.Subtotal = this.total / 1.16;
    this.IVA = this.total - this.Subtotal;
    //alert(this.total);
    this.Subtotal = parseFloat(this.Subtotal.toFixed(2));
    //alert(this.total);
  //  console.log("Productos listado ===============>" , this.Productos_listado)
  }



  //*******************************************//
  //FUNCION PARA SALVAR LA DATA DEL FORMULARIO//

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
    //nombreEvento: this.firstFormGroup.value.nombreEvento,
      nombreEvento: "",
      telefono: this.firstFormGroup.value.telefono
    }
    this.auth.data_form = this.data_model;
 //   console.log("data_model: ", this.data_model);
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
   // this.firstFormGroup.get("nombreEvento")?.setValue(data.nombreEvento);
    this.firstFormGroup.get("correo")?.setValue(data.correo);
    this.firstFormGroup.get("telefono")?.setValue(data.telefono);
  //  console.log(this.firstFormGroup);
  }
  //*******************************************//
  //FUNCIONES PARA PASO 3//
  public step = 0;
  public step0 = 'class-view';
  public step1 = 'class-none';
  public pagarOpciones(type: any) {
    if (!localStorage.getItem('userData')) {
      let ancho = '';
      let alto = "457px";
      if (type == 1) {
        ancho = '50%';
        
      } else {
        ancho = '100%';
        alto = "600px";
      }
      
      const dialogRef = this._dialog.open(WizardLoginComponent, {
        width: ancho,
        height: alto
      });

      dialogRef.afterClosed().subscribe(result => {
        this.step = 1;
        this.step0 = 'class-none';
        this.step1 = 'class-view';
      })
    } else {
      this.step = 1;
      this.step0 = 'class-none';
      this.step1 = 'class-view';
    }

  }
  //*******************************************//
  //FUNCIONES PARA CONTROL DE STEPPER//
  public steps: any = {
    uno: "selected",
    dos: "next",
    tres: "next",
    cuatro: false
  }

  public steps_css: any = {
    uno: "class-view",
    dos: "class-none",
    tres: "class-none",
    cuatro: "class-none"
  }

  public card_css: any = {
    tarjeta: "class-none eventos_seleccionados",
    paypal: "class-none eventos_seleccionados",
    oxxo: "class-none eventos_seleccionados"
  }

  public view_pay_method(option: any){
    
    debugger;
    this.card_css.card = "class-none";
    this.card_css.paypal = "class-none";
    this.card_css.oxxo = "class-none";

    if(option == "oxxo")
      this.card_css.oxxo = "class-view eventos_seleccionados";
    if(option == "card")
      this.card_css.card = "class-view eventos_seleccionados";
    if(option == "paypal")
      this.card_css.paypal = "class-view eventos_seleccionados";
    
  }



  next() {
    if (this.steps.uno == "selected") {
      this.steps = {
        uno: "complete",
        dos: "selected",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-none",
        dos: "class-view",
        tres: "class-none",
        cuatro: "class-none"
      }
    } else if (this.steps.dos == "selected") {

      this.steps = {
        uno: "complete",
        dos: "complete",
        tres: "selected",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-none",
        dos: "class-none",
        tres: "class-view",
        cuatro: "class-none"
      }

    } else if (this.steps.tres == "selected") {

      this.steps = {
        uno: "complete",
        dos: "complete",
        tres: "complete",
        cuatro: true
      }
      this.steps_css = {
        uno: "class-none",
        dos: "class-none",
        tres: "class-none",
        cuatro: "class-view"
      }

    }
    window.scrollTo( 0, 100 );
  }

  after() {
    if (this.steps.uno == "complete") {
      this.steps = {
        uno: "selected",
        dos: "next",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-view",
        dos: "class-none",
        tres: "class-none",
        cuatro: "class-none"
      }
    } else if (this.steps.dos == "complete") {
      this.steps = {
        uno: "selected",
        dos: "next",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-view",
        dos: "class-none",
        tres: "class-none",
        cuatro: "class-none"
      }
    } else if (this.steps.tres == "complete") {
      this.steps = {
        uno: "complete",
        dos: "select",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-none",
        dos: "class-view",
        tres: "class-none",
        cuatro: "class-none"
      }
    }
  }

  public back_step2() {
    this.steps = {
      uno: "complete",
      dos: "selected",
      tres: "next",
      cuatro: false
    }
    this.steps_css = {
      uno: "class-none",
      dos: "class-view",
      tres: "class-none",
      cuatro: "class-none"
    }
  }

 public set_stepper(step: number){
  switch(step) { 
    case 1: { 
      this.steps = {
        uno: "selected",
        dos: "next",
        tres: "next",
        cuatro: false
      }
      this.steps_css = {
        uno: "class-view",
        dos: "class-none",
        tres: "class-none",
        cuatro: "class-none"
      }
       break; 
    } 
    case 2: { 
      if (localStorage.getItem('form')) {
        this.steps_css = {
          uno: "class-none",
          dos: "class-view",
          tres: "class-none",
          cuatro: "class-none"
        }
        this.steps = {
          uno: "complete",
        dos: "selected",
        tres: "next",
        cuatro: false
        }
      }
      
       break; 
    } 
    case 3: { 
      if ((localStorage.getItem('form')) && (this.Productos_listado.length > 0)) {
      this.steps_css = {
        uno: "class-none",
        dos: "class-none",
        tres: "class-view",
        cuatro: "class-none"
      }
      this.steps = {
        uno: "complete",
      dos: "complete",
      tres: "selected",
      cuatro: false
      }
    }
       break; 
    } 
    default: { 
       //statements; 
       break; 
    } 
 }

 }

  public method_name()
  {

    this.data_model.fechaHoraFin = null;

    this.auth.data_form = this.data_model;
    this.firstFormGroup.get("fechaHoraFin")?.setValue(null);

      //  const fecha = new Date();
      //  var hoy = fecha.getDate();
      //  fecha.setDate(fecha.getDate()  + 3);

      // this.yourDate = new Date(this.firstFormGroup.value.fechaHoraInicio);
      //this.yourDate.setDate(this.yourDate.getDate()  + 1);

      // if(this.yourDate <= fecha)
      // {
      //   this.fecha_inicio_valid = false;
      //    alert("no es major del jueves");

      // }
      // else{
      //   this.fecha_inicio_valid = true;
      // }

      //alert(this.yourDate);
      //alert(fecha);
  }
 
  //*******************************************//
  //FUNCIONES PARA GUARDAR EL EVENTO//
  public saveEvent(create_time: any, id: any, metodo: string) {
     
    
    this.spinner.show();
    let json_bd: any = this.auth.data_form;
    delete json_bd.ciudad; 
    if (localStorage.getItem('userData')) {
      let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
       json_bd.idUsuario = data_user.id;
    }
    if((json_bd.genteEsperada == "") || (json_bd.genteEsperada == null))
    {
      json_bd.genteEsperada = 0;
    }
    json_bd.formaPago =  metodo;
    json_bd.total = this.total.toFixed(2).toString();
    json_bd.fechaCreacion = create_time;
    json_bd.detallesEvento = "Sin detalles",
      json_bd.fechaPago = create_time;
    json_bd.referenciaPago = id;
    json_bd.pagado = true,
      json_bd.claveSeguimientoCarrito = "Sin seguimiento carrito",
      json_bd.listaProductosEventos = this.auth.listaProductosEventos;
   // console.log("EVENTOS A GUARDAR: ====================> ", json_bd);
    //debugger;
    this.auth.service_general_post_with_url('Eventos/AddEvent', json_bd).subscribe(r => {
      if (r.success) {
       // //debugger;
       // console.log("respuesta exitosa: ", r);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Disfruta de tu evento',
          showConfirmButton: false,
          timer: 1500
        })
      //  //debugger;
      //  this.clear_memory();
        this.error_alguardar = false;
        this.next();
        this.spinner.hide();
      }
    }, (err) => {
      this.error_alguardar = true;
     // //debugger;
      console.log(err);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ha ocurrido un error al guardar el evento, por favor contacta a administración',
        showConfirmButton: false,
        timer: 5500
      })
      this.spinner.hide();
    })
  }

  public modify_list(item: any){
   //alert(id);  this.Productos_listado
   debugger;
   for (let i = 0; i < this.auth.listaProductosEventos.length; i++) {
      if (item.idCatProducto == this.auth.listaProductosEventos[i].idCatProducto) {
           this.auth.listaProductosEventos.splice(i, 1);
      }
  }

  for (let i = 0; i < this.Productos_listado.length; i++) {
    if (item.idCatProducto == this.Productos_listado[i].idCatProducto) {
         this.Productos_listado.splice(i, 1);
    }
  }

  localStorage.setItem('productos', JSON.stringify(this.auth.listaProductosEventos));
  this.calculos();
  this.setchecks();
   console.log("modify ================> ",item);
  }

  public clear_memory()
  {
        this.auth.data_form = {};
        this.auth.listaProductosEventos = [];
        this.Productos_listado = [];
        localStorage.removeItem('form');
        localStorage.removeItem('productos');
        localStorage.removeItem('categorias');
        this.fillForm();
  }

   public restart_dates(){
 //debugger;
     //Display Only Date till today // 

     var someDate = new Date();
     var duration = 5; //In Days
    // someDate.setTime(someDate.getTime() +  (duration * 24 * 60 * 60 * 1000));

     var dtToday = new Date();
     //var duration = 2; //In Days
     dtToday.setTime(dtToday.getTime() +  (duration * 24 * 60 * 60 * 1000));

   var month = (dtToday.getMonth() + 1).toString();     // getMonth() is zero-based
   var day = (dtToday.getDate()).toString();
   var year = dtToday.getFullYear();
   //var month_ =""; var  day_ = "";
   if(parseInt(month) < 10)
    month = '0' + month.toString();
   if(parseInt(day) < 10)
    day = '0' + day.toString();

     var maxDate = year + '-' + month + '-' + day + "T00:01";
    document.getElementById("start")?.setAttribute('min', maxDate);
    var xxx= document.getElementById("start")?.getAttribute("min");
    // $('#dateID').attr('max', maxDate);
  }

  public no_menor_cero(){

    if(this.firstFormGroup.value.genteEsperada < 1)
    {
      this.data_model.fechaHoraFin = null;
      this.auth.data_form = this.data_model;
      this.firstFormGroup.get("genteEsperada")?.setValue(null);
    }
  }

  //*******************************************//
  //OBTENER NOMBRE DE LA DIRECCION//
  public alcaldias = [
    { id: 1, municipio: 'Benito Juárez' },
    { id: 2, municipio: 'Coyoacan' },
    { id: 3, municipio: 'Magdalena Contreras ' },
    { id: 4, municipio: 'Venustiano Carranza' },
    { id: 5, municipio: 'Cuajimalpa' },
    { id: 6, municipio: 'Alvaro Obregón' },
    { id: 7, municipio: 'Azcapotzalco' },
    { id: 8, municipio: 'Cuahutemoc' },
    { id: 9, municipio: 'Tlapan' }
  ]

  public getName(id: any) {

    for (let i = 0; i < this.alcaldias.length; i++) {
      if (this.alcaldias[i].id == id) {
        return this.alcaldias[i].municipio;
      }
    }
  }
  //*******************************************//
  //FUNCIONA PARA MARCAR CATEGORIA CON PRODUCTO//
  //SELECCIONADOS//  
  public setchecks() {
   // console.log("ENTRA A LA FUNCION CHECKS");
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
    this.categorias.forEach((E: any) => {
      if (E.id == 1) {
        E.checked = this.auth.categorias.personal1;
      }
      if (E.id == 3) {
        E.checked = this.auth.categorias.talento3;
      }
      if (E.id == 5) {
        E.checked = this.auth.categorias.alimentos5;
      }
      if (E.id == 6) {
        E.checked = this.auth.categorias.mobiliario6;
      }
      if (E.id == 7) {
        E.checked = this.auth.categorias.luces7;
      }
    });
  }
  //*******************************************//
  //FUNCIONA PARA MARCAR MOSTRAR LOS PRODUCTOS //
  //SELECCIONADOS EN CADA CATEGORIA//  
  public setNumProductos() {

    this.categorias.forEach((E: any) => {
      for (let i = 0; i < this.Productos_listado.length; i++) {
        if (E.id == this.Productos_listado[i].idCategoria) {
          E.numproductos.push(this.Productos_listado[i]);
        }
      }
    });
 //   console.log(this.categorias);
  }

  public reStart() {
    this.steps = {
      uno: "selected",
      dos: "next",
      tres: "next",
      cuatro: false
    }

    this.steps_css = {
      uno: "class-view",
      dos: "class-none",
      tres: "class-none",
      cuatro: "class-none"
    }
   // this.ngOnInit();
  }

  public set_datos_cuenta(){

    if(localStorage.getItem('userData'))
    {    
    let data_ = JSON.parse(localStorage.getItem('userData') || '{}');
    this.data_model.correo = data_.correo;
    this.data_model.nombreContratane = data_.nombres + ' ' + data_.apellidos;
    this.data_model.telefono = data_.telefono;

    this.auth.data_form = this.data_model;
    this.firstFormGroup.get("nombreContratane")?.setValue(data_.nombres + ' ' + data_.apellidos);
    //this.firstFormGroup.get("nombreEvento")?.setValue(data.nombreEvento);
    this.firstFormGroup.get("correo")?.setValue(data_.correo);
    this.firstFormGroup.get("telefono")?.setValue(data_.telefono);
    }
   //    alert(':)');
  }

  @HostListener('click') c_onEnterrr() {
    this.appComponent.get_sesion();
   }


//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// STRIPRE //////////////////////////////////////////////////////////

//// CARGAR TARJETA DE STRIPE 

public _clientSecret: string = "";
private stripe: Stripe;
public card: any;
public error_oxxo: boolean = false;

async load_stripe_card() {


  this.stripe = await loadStripe(environment.Clavepublicable);
  console.log(this.stripe);
  var elements = this.stripe.elements();

  this.card = elements.create('card', {
    style: {
      base: {
        iconColor: '#000',
        color: '#000',
        fontWeight: '400',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#80807E',
        },
      },
      invalid: {
        iconColor: '#FF0000',
        color: '#FF0000',
      },
    },
  });


  this.card.mount("#card-element");

  this.card.on('change', ({ error }) => {
    let displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });

}


////////////////////////////////// OBTENER SECRENT CLIET STRIPE ////////////////////////////
public SecretDto: any = {
  amount: 25.05 * 100,
  method: ""
}

async paymentintent_params(method: string) {

  this.spinner.show();
  //debugger;
  this.auth.service_general_post_with_url('Eventos/paymentintent_stripe_params', this.SecretDto).subscribe(r => {
    if (r.success) {
      debugger;
      console.log("respuesta exitosa paymentintent_stripe_params ========> : ", r, r.result.client_secret);
      this.secret_client = r.result.client_secret
      if (method == "oxxo") {
        this.pay_oxxo();
      } else if (method == "card") {

        this.pay_card();
      }

      this.spinner.hide();
    }
  }, (err) => {
    debugger;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al cargar el metodo de pago, contacta a la administración',
      showConfirmButton: false,
      timer: 5500
    })
    // this.error_alguardar = true;
    console.log("ERROR paymentintent_stripe_params ======> ", err);
    this.spinner.hide();
  })

}

/////////////////////////////// PAGO OXXO STRIPE /////////////////////////////////////////////


public nombre_oxxo: string = "";
public email_oxxo: string = "";
public secret_client = "";
async pay_oxxo() {
  debugger;
   if ((this.nombre_oxxo.length > 3 ) && (this.email_oxxo.length > 4))
   {
     this.stripe.confirmOxxoPayment(this.secret_client,
    {
      payment_method: {
        billing_details: {
          name: this.nombre_oxxo, //document.getElementById('name').value,
          email: this.email_oxxo // "correo@ddd.com"//document.getElementById('email').value,
        },
      },
    }) // Stripe.js will open a modal to display the OXXO voucher to your customer
    .then(function (result) {
      console.log("result this.stripe.confirmOxxoPayment | Pago correcto OXXO =================", result);

      this.saveEvent(Date.now, "id_stripe_oxxo", "paypal");
      // This promise resolves when the customer closes the modal
      if (result.error) {
        // Display error to your customer
        console.log("ERROR  this.stripe.confirmOxxoPayment =================", result.error);
        var errorMsg = document.getElementById('error-message');
        errorMsg.innerText = result.error.message;
      }
    });
   }
   else
   {
    var errorMsg = document.getElementById('error-message');
    errorMsg.innerText = "Datos incompletos";
   }
  

}


////////////// card

pay_card() {
  this.stripe.confirmCardPayment(this.secret_client, {
    payment_method: {
      card: this.card,
      billing_details: {
        name: 'Jenny Rosen'
      }
    }
  }).then(function (result) {
    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log("ERROR confirmCardPayment | Pago correcto tarjeta stripe =============>", result.error.message);
      this.saveEvent(Date.now, "id_stripe_card", "paypal");
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log("SUCCESS confirmCardPayment =============>", result);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  });

}


}

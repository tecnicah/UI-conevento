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
import { observable } from 'rxjs';
import { DateAdapter } from '@angular/material/core';


//declare var paypal;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
  // , providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }]
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
  public yourDate: any;
  public fecha_inicio_valid: any = true;
  public today = new Date();
  public dd = this.today.getDate();
  public mm = this.today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  public data_model: any = {
    fechaHoraInicio: '',
    fechaHoraFin: ''
  };
  public data_user_model: any = {};
  public error_alguardar: boolean = false;


  constructor(private dateAdapter: DateAdapter<Date>, public spinner: SpinnerService, private _formBuilder: FormBuilder
    , public auth: HttpService, public router_: Router, public _dialog: MatDialog, public appComponent: AppComponent) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
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

  public validate_stripe() {
    var sesion_stripe: any;
    if (localStorage.getItem('stripe')) {
      sesion_stripe = JSON.parse(localStorage.getItem('stripe') || '{}');
      console.log(sesion_stripe);
      alert('*-*-*-*-*-*-*-**-*-**- estatus stripe: ' + sesion_stripe.paymentIntent.status);
      localStorage.removeItem('stripe');
      ////debugger;;
    }
    else {
      sesion_stripe = null;
      console.log("sesion_stripe vacia");
    }
  }

  //*******************************************//
  //INICIALIZACION DE PARAMETROS//
  async ngOnInit(): Promise<void> {
    localStorage.removeItem('stripe');
    var obj = 1;
    setInterval(this.validate_stripe, 2000);

    this.appComponent.detectaRuta();
    this.initConfigPayPal();
    this.load_stripe_card();
    this.catalogos();
    this.firstFormGroup = this._formBuilder.group({
      fechaHoraInicio: new FormControl(null, Validators.compose([Validators.required])),
      fechaHoraFin: ['', Validators.required],
      genteEsperada: [''],
      horaInicio: ["00", Validators.required],
      minInicio: ["00", Validators.required],
      horaFin: ["00", Validators.required],
      minFin: ["00", Validators.required],
      ciudad: [1, Validators.required],
      idCatMunicipio: [1, Validators.required],
      cp: [''],
      calleNumero: ['', Validators.required],
      colonia: ['', Validators.required],
      nombreEvento: [''],
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
        , extraQueryParams: [{ name: "disable-funding", value: "credit,card" }]
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
      onClientAuthorization: async (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.formaPago = "PayPal"
        await this.saveEvent(data.create_time, data.id, "PayPal");
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

    ////aqui hay que editar
    if (localStorage.getItem('form')) {
      this.data_model = JSON.parse(localStorage.getItem('form') || '{}');
      this.auth.data_form = JSON.parse(localStorage.getItem('form') || '{}');
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

      // this.steps = {
      //   uno: "complete",
      //   dos: "selected",
      //   tres: "next",
      //   cuatro: false
      // }
      // this.steps_css = {
      //   uno: "class-none",
      //   dos: "class-view",
      //   tres: "class-none",
      //   cuatro: "class-none"
      // }
    }

    if (localStorage.getItem('productos')) {
      this.Productos_listado = JSON.parse(localStorage.getItem('productos') || '{}');
      this.auth.listaProductosEventos = JSON.parse(localStorage.getItem('productos') || '{}');
      if (this.Productos_listado.length != 0) {
        // this.steps = {
        //   uno: "complete",
        //   dos: "selected",
        //   tres: "next",
        //   cuatro: false
        // }
        // this.steps_css = {
        //   uno: "class-none",
        //   dos: "class-view",
        //   tres: "class-none",
        //   cuatro: "class-none"
        // }
        this.calculos();
      }
    }
    ////aqui hay que editar

    this.setNumProductos();
    this.setchecks();

    if (localStorage.getItem('form')) {
      this.fillForm();
    }
    this.restart_dates();
    this.spinner.hide();
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      window.scrollTo(100, 360);
      console.log("NO ESTA COMPLETO: ", this.firstFormGroup.invalid);
      return;
    }
    this.saveForm();
    this.next();
  }
  //*******************************************//
  //FUNCIONES PARA SELECCION DE SERVICIOS//
  public selectServices(item: any) {
    this.router_.navigateByUrl('SeleccionarServicios/' + item.id + "/" + this.data_model.fechaHoraInicio)
  }
  //*******************************************//
  //FUNCION PARA SACAR IVA, TOTAL Y SUBTOTAL//
  public flete: number = 0;

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
    this.Subtotal = parseFloat(this.Subtotal.toFixed(2));
  }

  //*******************************************//
  //FUNCION PARA SALVAR LA DATA DEL FORMULARIO//

  public nombreContratane = "";
  public telefono = "";
  public correo = "";

  public saveForm() {
    this.data_model = {
      calleNumero: this.firstFormGroup.value.calleNumero,
      ciudad: this.firstFormGroup.value.ciudad,
      colonia: this.firstFormGroup.value.colonia,
      //correo: this.firstFormGroup.value.correo,
      cp: this.firstFormGroup.value.cp,
      fechaHoraFin: this.firstFormGroup.value.fechaHoraFin,
      fechaHoraInicio: this.firstFormGroup.value.fechaHoraInicio,
      minInicio: this.firstFormGroup.value.minInicio,
      horaInicio: this.firstFormGroup.value.horaInicio,
      minFin: this.firstFormGroup.value.minFin,
      horaFin: this.firstFormGroup.value.horaFin,
      genteEsperada: this.firstFormGroup.value.genteEsperada,
      idCatMunicipio: this.firstFormGroup.value.idCatMunicipio,
      //nombreContratane: this.firstFormGroup.value.nombreContratane,
      //nombreEvento: this.firstFormGroup.value.nombreEvento,
      nombreContratane: this.nombreContratane == undefined ? "" : this.nombreContratane,
      telefono: this.telefono == undefined ? "" : this.telefono,
      correo: this.correo == undefined ? "" : this.correo,
      nombreEvento: "",
      //telefono: this.firstFormGroup.value.telefono
    }

    this.data_model.fechaHoraInicio = this.dato_to_string(this.data_model.fechaHoraInicio, this.data_model.horaInicio, this.data_model.minInicio);
    this.data_model.fechaHoraFin = this.dato_to_string(this.data_model.fechaHoraFin, this.data_model.horaFin, this.data_model.minFin);
    this.auth.data_form = this.data_model;
    //console.log("================== data_model: ", this.data_model);
    localStorage.setItem('form', JSON.stringify(this.data_model))
  }


  public dato_to_string(dtToday: any, horas: string, minutos: string): String {
    debugger;
    if (Object.prototype.toString.call(dtToday) === "[object Date]") { }
    else {
      var r = dtToday.substring(0, 10);
      dtToday = new Date(dtToday.substring(0, 10));
    }
    var month = (dtToday.getMonth() + 1).toString();
    var day = (dtToday.getDate()).toString();
    var year = dtToday.getFullYear();
    if (parseInt(month) < 10)
      month = '0' + month.toString();
    if (parseInt(day) < 10)
      day = '0' + day.toString();
    var date = year + '-' + month + '-' + day + "T" + horas + ":" + minutos;
    return date;
  }

  public error_correo = false;
  public error_telefono = false;
  public error_nombre = false;

  public validate_nombre() {
    if (this.nombreContratane.length > 4) {
      this.data_model.nombreContratane = this.nombreContratane;
      this.error_nombre = false;
    }
    else
      this.error_nombre = true;
  }



  public validate_telefono() {
    debugger;
    if (this.telefono.length > 5) {
      this.data_model.telefono = this.telefono;
      this.error_telefono = false;
    }
    else
      this.error_telefono = true;
  }


  public validarEmail(valor): any {
    var valida = false;
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      // alert("La dirección de email " + valor + " es correcta!.");
      valida = true;
    } else {
      //  alert("La dirección de email es incorrecta!.");
      valida = false;
    }

    return valida
  }

  public validate_correo() {
    // debugger
    //var valreg = this.correo.toLowerCase().match(this.emailRegex);
    var valida = this.validarEmail(this.correo);

    if ((this.correo.length > 5) && (valida)) {
      this.data_model.correo = this.correo;
      this.error_correo = false;
    }
    else
      this.error_correo = true;
  }

  public saveContacto(type: any) {
    // debugger;

    var valreg = this.correo.toLowerCase().match(this.emailRegex);
    var valida = this.validarEmail(this.correo);
    if ((this.correo.length > 5) && (valida)) {
      this.data_model.correo = this.correo;
      this.error_correo = false;
      localStorage.setItem('form', JSON.stringify(this.data_model))
    }
    else
      this.error_correo = true;

    if (this.telefono.length > 5) {
      this.data_model.telefono = this.telefono;
      this.error_telefono = false;
      localStorage.setItem('form', JSON.stringify(this.data_model))
    }
    else
      this.error_telefono = true;

    if (this.nombreContratane.length > 4) {
      this.data_model.nombreContratane = this.nombreContratane;
      this.error_nombre = false;
      localStorage.setItem('form', JSON.stringify(this.data_model))
    }
    else
      this.error_nombre = true;

    if (!this.error_correo && !this.error_telefono && !this.error_nombre) {
      // console.log("===================== si jala");

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
    else {
      // console.log("====================== no jala")
      window.scrollTo(100, 360);
      console.log("NO ESTA COMPLETOS LOS DATOS DE PERFIL");
    }

  }


  do_click_form() {
    console.log("Lista de prodictos========================: ", JSON.stringify(this.auth.listaProductosEventos));
    debugger;
    this.get_disponibility()
    //document.getElementById('idformbtu').click();
  }


  //*******************************************//
  //FUNCION PARA LLENAR EL FORMULAARIO//
  public fillForm() {
    let data = JSON.parse(localStorage.getItem('form') || '{}')
    var _fi: any = new Date(data.fechaHoraInicio.substring(0, 10));
    _fi.setTime(_fi.getTime() + (2 * 24 * 60 * 60 * 1000));
    var month = (_fi.getMonth() + 1).toString();     // getMonth() is zero-based
    var day = (_fi.getDate()).toString();
    var year = _fi.getFullYear();
    if (parseInt(month) < 10) month = '0' + month.toString();
    if (parseInt(day) < 10) day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;

    // this.firstFormGroup.get('fechaHoraInicio')?.setValue(new Date(data.fechaHoraInicio.substring(0, 10)));
    this.firstFormGroup.get('fechaHoraInicio')?.setValue(new Date(maxDate));
    this.firstFormGroup.get("fechaHoraFin")?.setValue(new Date(data.fechaHoraFin.substring(0, 10)));
    this.firstFormGroup.get("genteEsperada")?.setValue(data.genteEsperada);
    this.firstFormGroup.get("ciudad")?.setValue(data.ciudad);
    this.firstFormGroup.get("idCatMunicipio")?.setValue(data.idCatMunicipio);
    this.firstFormGroup.get("cp")?.setValue(data.cp);
    this.firstFormGroup.get("calleNumero")?.setValue(data.calleNumero);
    this.firstFormGroup.get("colonia")?.setValue(data.colonia);
    this.firstFormGroup.get("horaInicio")?.setValue(data.horaInicio);
    this.firstFormGroup.get("minInicio")?.setValue(data.minInicio);
    this.firstFormGroup.get("horaFin")?.setValue(data.horaFin);
    this.firstFormGroup.get("minFin")?.setValue(data.minFin);
    //  console.log(this.firstFormGroup);
    // this.firstFormGroup.get("nombreEvento")?.setValue(data.nombreEvento);

    this.correo = data.correo == undefined ? "" : data.correo;
    this.telefono = data.telefono == undefined ? "" : data.telefono;
    this.nombreContratane = data.nombreContratane == undefined ? "" : data.nombreContratane;

    //this.firstFormGroup.get("correo")?.setValue(data.correo);
    //this.firstFormGroup.get("telefono")?.setValue(data.telefono);
    //this.firstFormGroup.get("nombreContratane")?.setValue(data.nombreContratane);
    console.log("sesion de formulario ==========", data, this.telefono)
  }
  //*******************************************//
  //FUNCIONES PARA PASO 3//
  public step = 0;
  public step0 = 'class-view';
  public step1 = 'class-none';
  public pagarOpciones(type: any) {
    this.saveContacto(type);
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

  public view_pay_method(option: any) {

    ////debugger;;
    this.card_css.card = "class-none";
    this.card_css.paypal = "class-none";
    this.card_css.oxxo = "class-none";

    if (option == "oxxo")
      this.card_css.oxxo = "class-view eventos_seleccionados";
    if (option == "card")
      this.card_css.card = "class-view eventos_seleccionados";
    if (option == "paypal")
      this.card_css.paypal = "class-view eventos_seleccionados";

  }

  next_validate_total() {
    if (this.total >= 600) {
      this.next();
    }
    else {

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: ' Ups! EL ticket mínimo para organizar tu evento es de $600.',
        showConfirmButton: false,
        timer: 4000
      })
    }
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
    window.scrollTo(0, 100);
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


  public back_step2a() {
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

  public back_step2() {
    // this.steps = {
    //   uno: "complete",
    //   dos: "selected",
    //   tres: "next",
    //   cuatro: false
    // }
    // this.steps_css = {
    //   uno: "class-none",
    //   dos: "class-view",
    //   tres: "class-none",
    //   cuatro: "class-none"
    // }

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
  }

  public set_stepper(step: number) {
    ////debugger;;
    if (this.steps_css.cuatro != "class-view") {
      switch (step) {
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
    else {
      console.log("ya no regreso");
    }


  }

  public method_name() {

    this.data_model.fechaHoraFin = null;

    this.auth.data_form = this.data_model;
    this.firstFormGroup.get("fechaHoraFin")?.setValue(null);
  }


  //****************************************** */
  // Validacion de siponibilidad 

  public _dtolista: any = {
    ListaProductosEventos: null,
    Fecha: null
  }


  public async get_disponibility(): Promise<any> {

    debugger;
    this.spinner.show();

    

    this._dtolista.ListaProductosEventos = this.Productos_listado;
    this._dtolista.Fecha = this.data_model.fechaHoraInicio;

     console.log("Lista a validar: ====================> ", this._dtolista);
    this.auth.service_general_post_with_url('Catalog/Productos_by_id_date', this._dtolista).subscribe(r => {
      if (r.success) {
        console.log("resultado dispo Ok : ==================== ", r);

        this.spinner.hide();
      }
    }, (err) => {

      console.log("Resultado err dispo: =======================", err);

      this.spinner.hide();
    })
  }

  //*******************************************//
  //FUNCIONES PARA GUARDAR EL EVENTO//

  public req_factura: boolean = false;
  public async saveEvent(create_time: any, id: any, metodo: string): Promise<any> {

    debugger;
    this.spinner.show();
    let json_bd: any = this.data_model;//this.auth.data_form;

    ////debugger;;
    if (create_time == 1) {
      create_time = json_bd.fechaHoraInicio;
      // en el servidor se pone la hora del momento , acá solo se pasa eso para qu enos e vaya vacio
    }

    if (id == 1) {
      if (localStorage.getItem('stripe')) {
        let sesion_stripe = JSON.parse(localStorage.getItem('stripe') || '{}');
        console.log(sesion_stripe);
        //  alert('*-*-*-*-*-*-*-**-*-**- estatus stripe: ' + sesion_stripe.paymentIntent.status);
        localStorage.removeItem('stripe');
        id = sesion_stripe.paymentIntent.id
      }

    }

    delete json_bd.ciudad;
    delete json_bd.horaFin;
    delete json_bd.minFin;
    delete json_bd.horaInicio;
    delete json_bd.minInicio

    if (localStorage.getItem('userData')) {
      let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
      json_bd.idUsuario = data_user.id;
    }
    if ((json_bd.genteEsperada == "") || (json_bd.genteEsperada == null)) {
      json_bd.genteEsperada = 0;
    }

    json_bd.formaPago = metodo;
    json_bd.total = this.total.toFixed(2).toString();
    json_bd.req_factura = this.req_factura;
    json_bd.fechaCreacion = create_time;
    json_bd.detallesEvento = "Sin detalles",
      json_bd.fechaPago = create_time;
    json_bd.referenciaPago = id;
    json_bd.pagado = true,
      json_bd.claveSeguimientoCarrito = "Sin seguimiento carrito",
      json_bd.listaProductosEventos = this.auth.listaProductosEventos;

    // console.log("EVENTOS A GUARDAR: ====================> ", json_bd);
    this.auth.service_general_post_with_url('Eventos/AddEvent', json_bd).subscribe(r => {
      if (r.success) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Disfruta de tu evento',
          showConfirmButton: false,
          timer: 1500
        })
        this.clear_memory();
        this.error_alguardar = false;
        this.next();
        this.spinner.hide();
      }
    }, (err) => {
      this.error_alguardar = true;
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

  public modify_list(item: any) {
    //alert(id);  this.Productos_listado
    ////debugger;;
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
    console.log("modify ================> ", item);
  }

  public clear_memory() {
    this.auth.data_form = {};
    this.auth.listaProductosEventos = [];
    this.Productos_listado = [];
    localStorage.removeItem('form');
    localStorage.removeItem('productos');
    localStorage.removeItem('categorias');
    localStorage.removeItem('stripe');
    // this.fillForm();
  }

  public inputReadonly = true;
  public fechamat;
  public fechamatfin;
  public sas;
  public min_date_ = "";
  public min_date_2 = "";
  public dtToday: Date = null;
  public date_inicio_test: Date = null;
  public restart_dates() {
    //////debugger;;
    //Display Only Date till today // 

    var someDate = new Date();
    var duration = 4; //In Days
    // someDate.setTime(someDate.getTime() +  (duration * 24 * 60 * 60 * 1000));

    this.dtToday = new Date();
    //var duration = 2; //In Days
    this.dtToday.setTime(this.dtToday.getTime() + (duration * 24 * 60 * 60 * 1000));

    var month = (this.dtToday.getMonth() + 1).toString();     // getMonth() is zero-based
    var day = (this.dtToday.getDate()).toString();
    var year = this.dtToday.getFullYear();
    //var month_ =""; var  day_ = "";
    if (parseInt(month) < 10)
      month = '0' + month.toString();
    if (parseInt(day) < 10)
      day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day + "T00:01";
    this.min_date_ = day + "/" + month + "/" + year;
    this.min_date_2 = day + "/" + month + "/" + year;
    document.getElementById("start")?.setAttribute('min', maxDate);
    var xxx = document.getElementById("start")?.getAttribute("min");
    // $('#dateID').attr('max', maxDate);
  }

  public f_inicio_error: boolean = false;
  public compare_inicio_date() {
    debugger;

    var ffin = this.firstFormGroup.value.fechaHoraInicio;

    if (Object.prototype.toString.call(ffin) === "[object Date]") { }
    else {
      var r = ffin.substring(0, 10);
      ffin = new Date(ffin.substring(0, 10));
    }

    this.date_inicio_test = new Date(ffin);
    if (this.date_inicio_test <= this.dtToday) {
      this.f_inicio_error = true;
      // this.firstFormGroup.get('fechaHoraInicio')?.setValue(null);
    }
    else {

      this.f_inicio_error = false;
    }
  }

  public f_fin_error: boolean = false;
  public compare_fin_date() {
    //debugger;
    this.date_inicio_test = new Date(this.firstFormGroup.value.fechaHoraFin);
    if (this.date_inicio_test <= this.dtToday) {
      this.f_fin_error = true;
      this.firstFormGroup.get("fechaHoraFin")?.setValue(null);
    }
    else {

      this.f_fin_error = false;
    }
  }

  public no_menor_cero() {

    if (this.firstFormGroup.value.genteEsperada < 1) {
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

  public set_datos_cuenta() {

    if (localStorage.getItem('userData')) {
      let data_ = JSON.parse(localStorage.getItem('userData') || '{}');
      this.data_model.correo = data_.correo;
      this.data_model.nombreContratane = data_.nombres + ' ' + data_.apellidos;
      this.data_model.telefono = data_.telefono;

      this.nombreContratane = data_.nombres + ' ' + data_.apellidos;
      this.correo = data_.correo;
      this.telefono = data_.telefono;
      // this.auth.data_form = this.data_model;
      // this.firstFormGroup.get("nombreContratane")?.setValue(data_.nombres + ' ' + data_.apellidos);
      // this.firstFormGroup.get("correo")?.setValue(data_.correo);
      // this.firstFormGroup.get("telefono")?.setValue(data_.telefono);
    }

  }

  @HostListener('click', ['$event.target']) toggleDropdown(el: HTMLElement) {

    // console.log("HOST LISTENER ======================================", el.id);
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
    // console.log(this.stripe);
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
    amount: this.total * 1,
    method: ""
  }

  public ejecutotarjeta: boolean = false;
  public async paymentintent_params(method: string) {

    if ((method == 'card') || ((this.nombre_oxxo.length > 3) && (this.email_oxxo.length > 4))) {
      this.spinner.show();
      ////debugger;;
      this.SecretDto.amount = this.total * 100;//this.total.toFixed(2),
      this.SecretDto.method = "";
      await this.auth.service_general_post_with_url('Eventos/paymentintent_stripe_params', this.SecretDto).subscribe(async r => {
        if (r.success) {
          //////debugger;;
          console.log("respuesta exitosa paymentintent_stripe_params ========> : ", r, r.result.client_secret);
          this.secret_client = r.result.client_secret
          if (method == "oxxo") {
            this.pay_oxxo();
          } else if (method == "card") {
            // ////debugger;;
            await this.pay_card();
            // ////debugger;;
          }
          setTimeout(() => { this.spinner.hide() }, 2500);
        }
      }, (err) => {
        ////debugger;;
        console.log("ERROR EN paymentintent_stripe_params ============ :", err.message)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al cargar el metodo de pago, contacta a la administración',
          showConfirmButton: false,
          timer: 5500
        })
        // this.error_alguardar = true;
        console.log("ERROR paymentintent_stripe_params ======> ", err);
        setTimeout(() => {
          this.spinner.hide()
        }
          , 2500);
      })
    }
    else {
      var errorMsg = document.getElementById('error-message');
      errorMsg.innerText = "Datos incompletos";
    }




  }

  /////////////////////////////// PAGO OXXO STRIPE /////////////////////////////////////////////

  oxxo_Change(e: any) {
    var errorMsg = document.getElementById('error-message');
    errorMsg.innerText = "";
  }

  public nombre_oxxo: string = "";
  public email_oxxo: string = "";
  public secret_client = "";
  pay_oxxo() {
    ////debugger;;

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
        // This promise resolves when the customer closes the modal
        if (result.error) {
          // Display error to your customer
          console.log("ERROR  this.stripe.confirmOxxoPayment =================", result.error);
          var errorMsg = document.getElementById('error-message');
          errorMsg.innerText = result.error.message;
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Error al procesar el pago: ',// + result.error.message,
            showConfirmButton: false,
            timer: 4500
          })

        }
        else {
          console.log("result this.stripe.confirmOxxoPayment | Pago correcto OXXO =================", result);
          //  this.saveEvent(Date.now, result.paymentIntent.id, "Stripe-OXXO");
          // console.log("SUCCESS confirmCardPayment| Pago correcto tarjeta stripe =============>", result, result.paymentIntent.id);

          localStorage.setItem('stripe', JSON.stringify(result))
          var sesion_stripe: any;
          if (localStorage.getItem('stripe')) {
            sesion_stripe = JSON.parse(localStorage.getItem('stripe') || '{}');
            console.log("desde SUCCESS confirmOxxoPayment ====", sesion_stripe);
          }
          var errorMsg = document.getElementById('stripe_click_o');
          errorMsg.click();
        }
      });

  }


  ////////////// card

  public async pay_card(): Promise<any> {

    var ob = await this.stripe.confirmCardPayment(this.secret_client, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: this.data_model.nombreContratane
        }
      }
      // ,return_url: "http://localhost:4200/"
    }).then(async function (result) {

      if (result.error) {
        // Show error to your customer (for example, insufficient funds)
        console.log("ERROR confirmCardPayment | Pago incorrecto tarjeta stripe =============>", result.error.message);
        var errorMsg = document.getElementById('card-errors');
        errorMsg.innerText = result.error.message;
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Error al procesar el pago: ' + result.error.message,
          showConfirmButton: false,
          timer: 4500
        })
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          console.log("SUCCESS confirmCardPayment| Pago correcto tarjeta stripe =============>", result, result.paymentIntent.id);

          localStorage.setItem('stripe', JSON.stringify(result))
          var sesion_stripe: any;
          if (localStorage.getItem('stripe')) {
            sesion_stripe = JSON.parse(localStorage.getItem('stripe') || '{}');
            console.log("desde SUCCESS confirmCardPayment ====", sesion_stripe);
          }
          var errorMsg = document.getElementById('stripe_click');
          errorMsg.click();
          //this.ejecutotarjeta = true;
          // await this.saveEvent(Date.now, result.paymentIntent.id, "Stripe - CC");

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

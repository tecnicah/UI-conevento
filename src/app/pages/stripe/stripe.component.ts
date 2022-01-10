import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivationStart, Router } from '@angular/router';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import Swal from 'sweetalert2'
import { AppComponent } from 'src/app/app.component';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})




export class StripeComponent implements OnInit {


  constructor(public spinner: SpinnerService, private _formBuilder: FormBuilder
    , public auth: HttpService, public router_: Router, public _dialog: MatDialog, public appComponent: AppComponent) { }


    
  async ngOnInit(): Promise<void> {

    this.load_stripe_card();

    //const stripe = Stripe('pk_test_51JcbT7L3Jg9RumxpabSHFoQp4IhGNIIva8ZnhASqYQyxnseDFXSrD23BUfrjupwbJbWfzp3NjDWliKOSPJWOGt0o00f03HF62U');

    //this.stripe = await loadStripe('pk_test_51JcbT7L3Jg9RumxpabSHFoQp4IhGNIIva8ZnhASqYQyxnseDFXSrD23BUfrjupwbJbWfzp3NjDWliKOSPJWOGt0o00f03HF62U');
   // si se usa this.stripe = await loadStripe(environment.Clavepublicable);
   // si se usa  console.log(this.stripe);
    //ult  const options = {
    //   clientSecret: 'pi_3KFWi4L3Jg9Rumxp1lVkyyBS_secret_jw3jl4WoItfRKHsOuxSPOjW5Z',
    //   // Fully customizable with appearance API.
    //   appearance: {

    //     /*...*/
    //   },
    // };

    ///ult var form = document.getElementById('payment-form');

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
    // const elements = this.stripe.elements(options);

    // Create and mount the Payment Element
    // const paymentElement = elements.create('payment');
    // paymentElement.mount('#payment-element');

    //const elements = this.stripe.elements();
    // const card = elements.create("card");
    // card.mount("#card");
    // var form = document.getElementById('payment-form');
    //     card.on('change', (event) => {
    // const  display => document.getElementById("card-errors")
    //     })



    // Set up Stripe.js and Elements to use in checkout form
   // si se usa  var elements = this.stripe.elements();

    // var _style: {
    //   base: {
    //     iconColor: '#c4f0ff',
    //     color: '#fff',
    //     fontWeight: '500',
    //     fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    //     fontSize: '50px',
    //     fontSmoothing: 'antialiased',
    //     ':-webkit-autofill': {
    //       color: '#fce883',
    //     },
    //     '::placeholder': {
    //       color: '#87BBFD',
    //     },
    //   },
    //   invalid: {
    //     iconColor: '#FFC7EE',
    //     color: '#FFC7EE',
    //   },

    // };



    // var element = elements.create('card', {
    //   style: {
    //     base: {
    //       iconColor: '#c4f0ff',
    //       color: '#fff',
    //       fontWeight: '500',
    //       fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    //       fontSize: '16px',
    //       fontSmoothing: 'antialiased',
    //       ':-webkit-autofill': {
    //         color: '#fce883',
    //       },
    //       '::placeholder': {
    //         color: '#87BBFD',
    //       },
    //     },
    //     invalid: {
    //       iconColor: '#FFC7EE',
    //       color: '#FFC7EE',
    //     },
    //   },
    // });


    // this.card = elements.create("card", { style: _style });



  // todo esto si se susa    this.card = elements.create('card', {
  //     style: {
  //       base: {
  //         iconColor: '#000',
  //         color: '#000',
  //         fontWeight: '400',
  //         fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  //         fontSize: '16px',
  //         fontSmoothing: 'antialiased',
  //         ':-webkit-autofill': {
  //           color: '#fce883',
  //         },
  //         '::placeholder': {
  //           color: '#87BBFD',
  //         },
  //       },
  //       invalid: {
  //         iconColor: '#FF0000',
  //         color: '#FF0000',
  //       },
  //     },
  //   });


  //   this.card.mount("#card-element");

  //   this.card.on('change', ({ error }) => {
  //     let displayError = document.getElementById('card-errors');
  //     if (error) {
  //       displayError.textContent = error.message;
  //     } else {
  //       displayError.textContent = '';
  //     }
  //   });

  // 
}



//// CARGAR TARJETA DE STRIPE 

  public _clientSecret: string = "";
  private stripe: Stripe;
  public card: any;

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
            color: '#87BBFD',
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
        console.log("result this.stripe.confirmOxxoPayment =================", result);
        // This promise resolves when the customer closes the modal
        if (result.error) {
          // Display error to your customer
          console.log("ERROR  this.stripe.confirmOxxoPayment =================", result.error);
          var errorMsg = document.getElementById('error-message');
          errorMsg.innerText = result.error.message;
        }
      });

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
        console.log("ERROR confirmCardPayment =============>", result.error.message);
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

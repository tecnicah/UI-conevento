import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './dialog/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './dialog/profile/profile.component';
import { CreateAccountComponent } from './dialog/create-account/create-account.component';
import { NosotrosComponent } from './dialog/nosotros/nosotros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralMessageComponent } from './dialog/general-message/general-message.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WizardComponent } from './pages/wizard/wizard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SeleccionarServicioComponent } from './pages/seleccionar-servicio/seleccionar-servicio.component';
import { MisEventosComponent } from './dialog/mis-eventos/mis-eventos.component';
import { DetalleProductoComponent } from './dialog/detalle-producto/detalle-producto.component';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//external
import { NgxPayPalModule } from 'ngx-paypal';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { WizardLoginComponent } from './dialog/wizard-login/wizard-login.component';
import { FaqsComponent } from './dialog/faqs/faqs.component';
import { LayoutadminComponent } from './layout/layoutadmin/layoutadmin.component';
import { HeaderadminComponent } from './layout/headeradmin/headeradmin.component';
import { EventosadminComponent } from './pages/eventosadmin/eventosadmin.component';
import { ViewportScroller } from "@angular/common";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminServicesComponent } from './pages/admin-services/admin-services.component';
import { StripeComponent } from './pages/stripe/stripe.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { AvisoComponent } from './pages/aviso/aviso.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarServiciosComponent } from './pages/calendar-servicios/calendar-servicios.component';
import { UtilsModule } from '../app/utils/module';
import { DisponibilidadComponent } from './dialog/disponibilidad/disponibilidad.component';
import { CalendarEventsComponent } from './pages/calendar-events/calendar-events.component';
import { ImageCropperModule } from 'ngx-image-cropper';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    CreateAccountComponent,
    NosotrosComponent,
    GeneralMessageComponent,
    WizardComponent,
    SeleccionarServicioComponent,
    MisEventosComponent,
    DetalleProductoComponent,
    WizardLoginComponent,
    FaqsComponent,
    LayoutadminComponent,
    HeaderadminComponent,
    EventosadminComponent,
    AdminEventsComponent,
    AdminServicesComponent,
    StripeComponent,
    TerminosComponent,
    AvisoComponent,
    AdminUsersComponent,
    CalendarServiciosComponent,
    DisponibilidadComponent,
    CalendarEventsComponent
  ],
  imports: [
    NgxPayPalModule,
    MatIconModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    SwiperModule,
    FilterPipeModule,
    NgxPaginationModule,
    YouTubePlayerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    UtilsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    ImageCropperModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})


export class AppModule { 

  name = "Angular " + VERSION.major;

  constructor(private scroller: ViewportScroller, private router: Router) {}
  ngOnInit() {
    this.router.navigate(["/"]);
  }

  goDown1() {
    this.scroller.scrollToAnchor("targetRed");
  }

  goDown2() {
    //this.scroller.scrollToAnchor("targetGreen");
    document.getElementById("targetGreen")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goDown3() {
    this.router.navigate([], { fragment: "targetBlue" });
  }
}



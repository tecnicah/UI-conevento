import { NgModule } from '@angular/core';
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
    EventosadminComponent
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
    FilterPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
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

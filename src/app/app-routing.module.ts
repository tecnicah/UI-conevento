import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SeleccionarServicioComponent } from './pages/seleccionar-servicio/seleccionar-servicio.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { LayoutadminComponent } from './layout/layoutadmin/layoutadmin.component';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';
import { AdminServicesComponent } from './pages/admin-services/admin-services.component';
import { AvisoComponent } from './pages/aviso/aviso.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { StripeComponent } from './pages/stripe/stripe.component'
import { AdminUsersComponent } from './pages/admin-users/admin-users.component'
import { CalendarServiciosComponent } from './pages/calendar-servicios/calendar-servicios.component'
import { CalendarEventsComponent} from './pages/calendar-events/calendar-events.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'Wizard',
        component: WizardComponent,
      },
      {
        path: 'SeleccionarServicios/:id/:date',
        component: SeleccionarServicioComponent,
      },
      {
        path: 'aviso',
        component: AvisoComponent
      },
      {
        path: 'terminos',
        component: TerminosComponent
      }
    ]
  },

  {
    path: 'admin',
    component: LayoutadminComponent,
    children: [
      {
        path: 'events',
        component: AdminEventsComponent,
      },
      {
        path: 'services',
        component: AdminServicesComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'calendar-services/:id',
        component: CalendarServiciosComponent,
      },
      {
        path: 'calendar-events/:id',
        component: CalendarEventsComponent,
      }
    ]
  },
  {
    path: 'stripe',
    component: StripeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { Component, Inject, OnInit, AfterViewInit,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation, } from '@angular/core';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { ActivatedRoute } from '@angular/router'
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarView,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export class eventos{
    id: number = 0;
    //nombreContratane: string = "";
    nombreEvento: string = "";
    fechaHoraInicio: Date = new Date();
    fechaHoraFin: Date = new Date();
    // telefono: string = "";
    // correo: string = "";
    // idUsuario: number = 0;
    idCatMunicipio: number = 1;
    // genteEsperada: number = 0;
    calleNumero: string = "";
    // cp: string = "";
    colonia: string = "";
    fechaCreacion: Date = new Date();
    // detallesEvento: string = "";
    // fechaPago: Date = new Date();
    // referenciaPago: string = "";
    // pagado: boolean = false;
    // claveSeguimientoCarrito: string = "";
    // total: number = 0;
    // formaPago: string = "";
    // reqFactura: boolean = false;
    listaProductosEventos: ListaProductosServicios[];
}

export class ListaProductosServicios{
  id: number = 0;
  idEvento: number = 0;
  idCatProducto: number = 0;
  cantidadUnidades: number = 0;
  cantidadHoras: number = 0
}

@Component({
  selector: 'app-calendar-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  styles: [
    `
      .cal-month-view .bg-pink,
      .cal-week-view .cal-day-columns .bg-pink,
      .cal-day-view .bg-pink {
        background-color: hotpink !important;
      }
    `,
  ],
})

export class CalendarEventsComponent implements OnInit {
  _eventos: eventos[] = [];
  labelPosition: 'before';
  disabled = false;
  formModal: FormGroup;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
  };

  fecha_evento: any[] = [];
  activeDayIsOpen: boolean = true;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        console.log('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  eventsBlock: CalendarEvent[] = [];

  public eventos_changeMounth = [];
  constructor(
    public auth: HttpService,
    private _route: ActivatedRoute,
    private modal: NgbModal,
    public fb: FormBuilder,
    public spinner: SpinnerService)
    {
      this.formModal = fb.group({
        dateEvent: ['', Validators.required],
        dateStart: [''], 
        dateEnd: [''],
        lunesEvent: [false],
        martesEvent: [false],
        miercolesEvent: [false],
        juevesEvent: [false],
        viernesEvent: [false],
        sabadoEvent: [false],
        domingoEvent: [false],
      });
    }
  
    ngOnInit(): void {
    
    }
  ngAfterViewInit(): void {
    //console.log(this._route.snapshot.paramMap.get('id'));
   // this.viewEvents();
    this.get_resultados();
  }

public resultados: any;

  public get_resultados() {
    this.spinner.show();
    setTimeout(() => {
      debugger;
      
      this.auth.service_general_post_with_url('Eventos/GetCalendarEvents', 1).subscribe(r => {
        if (r.success) {
          this.resultados = r.result.value;
            console.log("respuesta exitosa GetCalendarEvents ======= : ", this.resultados);
            this.viewObjectCalendar(this.resultados);
         this.spinner.hide();
        }
      }, (err) => {
        console.log("Error al consultar informaci??n: ", err);
        this.spinner.hide();
      })
    }, 3000);
  }

  viewEvents(){
    this.auth.service_general_get('Eventos/CalendarEventByServicio?id=' + this._route.snapshot.paramMap.get('id'))
    .subscribe(r => {
      
      if (r.success) {
       this.fecha_evento=r.result.value;
       console.log("CalendarEventByServicio ================",this.fecha_evento);
       // this.viewObjectCalendar(this.fecha_evento);
      }
    }, (err) => {
     
    })
  }

  viewObjectCalendar(eventos){
    //console.log(eventos);
    eventos.forEach(element => {
      this.events.push({
        start: startOfDay(new Date(element.fechaHoraInicio)),
        end: endOfDay(new Date(element.fechaHoraFin)),
        title: "Contratante: " + element.nombreContratane + ", T??l: " + element.telefono 
       // + ", Correo: " + element.correo 
        +", Municipio: " + element.municipio + ", Agendado de " 
        + element.fechaHoraInicio.substring(0, 10) + " "+ element.fechaHoraInicio.substring(11, 16) + "hrs." +
        " a " +element.fechaHoraFin.substring(0, 10) + " "+ element.fechaHoraFin.substring(11, 16)+ "hrs."  ,
        
        color: colors.blue,
        actions: this.actions,
        allDay: true,
        
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: false
      });  
    });
    let _eventsBlock: any = []
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    //this.handleEvent('Dropped or resized');
  }
  handleEvent(action: string, event): void {
    console.log(event);
    this.modalData = { action };
    this.formModal.controls.dateEvent.setValue("1");
    this.modal.open(this.modalContent, { size: 'lg' });
    if(this.modalData.action == "Edit"){
      if(event.title == "No disponible individual"){
        this.formModal.controls.dateEvent.setValue("2");
        this.formModal.controls.dateStart.setValue(event.start);
        this.formModal.controls.dateEnd.setValue(event.end);
      }

      if(event.title == "No disponible recurrente"){
        this.formModal.controls.dateEvent.setValue("1");
      }
    }
  }

  addEvent(type): void {
    switch(type) {
      case "1":
        this._eventos.push({
          id: 0,
          nombreEvento: 'No disponible recurrente',
          fechaHoraInicio: this.formModal.controls.dateStart.value,
          fechaHoraFin: this.formModal.controls.dateEnd.value,
          idCatMunicipio: 1,
          calleNumero: "",
          colonia: "",
          fechaCreacion: new Date(),
          listaProductosEventos: [{
            id: 0,
            cantidadHoras: 1000,
            cantidadUnidades: 1000,
            idCatProducto: parseInt(this._route.snapshot.paramMap.get('id')),
            idEvento: 0
          }]
        });
        console.log(this._eventos);
        this.auth.service_general_post_with_url('Eventos/AddEventAdmin?type=1&lunes='+this.formModal.controls.lunesEvent.value+'&martes='+this.formModal.controls.martesEvent.value+'&miercoles='+this.formModal.controls.miercolesEvent.value+'&jueves='+this.formModal.controls.juevesEvent.value+'&viernes='+this.formModal.controls.viernesEvent.value+'&sabado='+this.formModal.controls.sabadoEvent.value+'domingo='+this.formModal.controls.domingoEvent.value+'',this._eventos)
        .subscribe(r => {
          console.log(r);
          if (r.success) {
            this.events = [];
            this.viewEvents();
            
          }
        }, (err) => {
         
        });
        break;
      case "2":
        this._eventos.push({
          id: 0,
          nombreEvento: 'No disponible individual',
          fechaHoraInicio: this.formModal.controls.dateStart.value,
          fechaHoraFin: this.formModal.controls.dateEnd.value,
          idCatMunicipio: 1,
          calleNumero: "",
          colonia: "",
          fechaCreacion: new Date(),
          listaProductosEventos: [{
            id: 0,
            cantidadHoras: 1000,
            cantidadUnidades: 1000,
            idCatProducto: parseInt(this._route.snapshot.paramMap.get('id')),
            idEvento: 0
          }]
        });
        console.log(this._eventos);
        this.auth.service_general_post_with_url('Eventos/AddEventAdmin?type=2',this._eventos)
        .subscribe(r => {
          console.log(r);
          if (r.success) {
            this.events = [];
            this.viewEvents();
            
          }
        }, (err) => {
         
        });
        break;
      default:
   }


    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }
  
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  
  setView(view: CalendarView) {
    this.view = view;
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
// events: CalendarEvent[] = [];

beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
  renderEvent.body.forEach((day) => {
    const dayOfMonth = day.isToday;
    let evento:any = day.events;
    //console.log(evento);
    evento.forEach(element => {
      if(element.title == 'No disponible individual')
      {
        day.cssClass = 'bg-noavailable';
      }
      if(element.title == 'No disponible recurrente')
      {
        day.cssClass = 'bg-available';
      }
    });
    // if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
    //   day.cssClass = 'bg-pink';
    // }
  });
}

beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
  renderEvent.hourColumns.forEach((hourColumn) => {
    hourColumn.hours.forEach((hour) => {
      hour.segments.forEach((segment) => {
        // if (
        //   segment.date.getHours() >= 2 &&
        //   segment.date.getHours() <= 5 &&
        //   segment.date.getDay() === 2
        // ) {
        //   segment.cssClass = 'bg-pink';
        // }
      });
    });
  });
}

beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
  renderEvent.hourColumns.forEach((hourColumn) => {
    hourColumn.hours.forEach((hour) => {
      hour.segments.forEach((segment) => {
        // if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
        //   segment.cssClass = 'bg-pink';
        // }
      });
    });
  });
}
}
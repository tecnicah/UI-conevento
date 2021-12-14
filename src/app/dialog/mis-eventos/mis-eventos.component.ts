import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.scss']
})
export class MisEventosComponent implements OnInit {

  constructor(public auth:HttpService, public spinner: SpinnerService) { }

  public eventos:any = [];
  ngOnInit(): void {
    let data_user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.spinner.show();
    this.auth.service_general_post_with_url('Eventos/GetEventsbyuser?id_user='+data_user.id, '').subscribe(r => {
      if(r.result){
        this.spinner.hide();
        console.log(r.result);
        this.eventos =  r.result;
      }
    },(err)=>{
      this.spinner.hide();
      console.log(err);
    })
  }

}

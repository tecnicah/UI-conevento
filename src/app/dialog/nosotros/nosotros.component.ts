import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/HttpRequest/http.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  constructor(public dialogREF: MatDialogRef<NosotrosComponent>,public auth: HttpService, public spinner: SpinnerService) { }

  ngOnInit(): void {
    this.data_model.nombres = "";
    this.data_model.telefono = "";
    this.data_model.correo = "";
    this.data_model.medio = "";
    this.data_model.servicios = "";
  }


  
  public data_model: any = {  };


 
  public save(): void {
    this.spinner.show();
    setTimeout(() => {

      this.auth.service_general_post_with_url('User/AddJoinUs', this.data_model).subscribe(r => {
        if (r.success) {
          console.log("respuesta exitosa: ", r);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Haz recibido un correo con tu Registro',
            showConfirmButton: false,
            timer: 2300
          })
          this.dialogREF.close();
          this.spinner.hide();
        }
      }, (err) => {
        console.log("Error al guardar información: ", err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ha ocurrido un error, intenta de nuevo',
          showConfirmButton: false,
          timer: 1800
        })
        this.dialogREF.close();
        this.spinner.hide();
      })
    }, 3000);

  }

}

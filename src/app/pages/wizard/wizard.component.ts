import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

   public firstFormGroup!: FormGroup;
   public submitted = false;
   
  constructor(private _formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fecha_inicio: ['', Validators.required],   
      hora_inicio: ['', Validators.required], 
      fecha_final: ['', Validators.required], 
      hora_final: ['', Validators.required], 
      ciudad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      alcaldia: ['', Validators.required],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  get f() { return this.firstFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
        console.log("NO ESTA COMPLETO: ", this.firstFormGroup.invalid);
        return;
    }
    alert('Mensaje Enviado !')
}

}

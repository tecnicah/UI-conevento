import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog, public dialogRef: MatDialogRef<DetalleProductoComponent>) { }

  ngOnInit(): void {
    console.log("DATA RECIBIDA: ", this.data);
  }

}

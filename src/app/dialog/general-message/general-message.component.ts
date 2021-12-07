import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-general-message',
  templateUrl: './general-message.component.html',
  styleUrls: ['./general-message.component.scss']
})
export class GeneralMessageComponent implements OnInit {

  public header:any;
  public body:any;

    constructor(
        public dialogRef: MatDialogRef<GeneralMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {

        this.header = this.data.header;
        this.body = this.data.body;

    }

}

export interface DialogData {
    header: string;
    body: string;
}
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

export interface DialogData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-sure-remove',
  templateUrl: './sure-remove.component.html',
  styles: [
  ]
})
export class SureRemoveComponent implements OnInit {

  Doctor: Doctor
  User?: User
  Hospital?: Hospital

  constructor(
    public dialogRef: MatDialogRef<SureRemoveComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

}

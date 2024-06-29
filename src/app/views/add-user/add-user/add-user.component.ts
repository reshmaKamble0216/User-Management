import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component( {
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.css' ]
} )
export class AddUserComponent implements OnInit
{
  userData: any;
  constructor ( private readonly fb: FormBuilder,
    @Inject( MAT_DIALOG_DATA ) public data: any,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit (): void
  {
    this.userData = this.data.payload;
  }

  addUserForm: FormGroup = this.fb.group( {
    role: [ this.data.payload.role || '', [ Validators.required ] ],
    name: [ this.data.payload.name || '', [ Validators.required ] ],
    email: [ this.data.payload.email || '', [ Validators.required, Validators.email ] ],
  } );
  onSubmit ( userData: any )
  {
    this.dialogRef.close( userData );
    this.addUserForm.reset();
  }
}

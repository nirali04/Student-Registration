import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/state';
import { IStudents } from '../../shared/students';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  form: FormGroup;
  countryList = [
    { id: 1, name: 'INDIA' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'CANADA' },
  ];
  maxDate = new Date();

  constructor(private build: FormBuilder,
    private store: Store<AppState>,
    private matdialogRef: MatDialogRef<StudentRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.bindForm();
    if (!!this.data[1]) {
      this.form.patchValue(this.data[1]);
    }
  }

  bindForm() {
    this.form = this.build.group({
      Id: [0],
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
      FatherName: [null, [Validators.required]],
      Email: [null, [Validators.required, Validators.email]],
      Address: [null, [Validators.required]],
      Mobile: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      Gender: ['Male', [Validators.required]],
      DOB: [null, [Validators.required]],
      Country: [null, [Validators.required]],
    });
  }

  submit() {
    if (!!this.data[1]) {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.store.dispatch({
      type: 'ADD_STUDENT',
      payload: <IStudents>{
        FirstName: this.form.value.FirstName,
        LastName: this.form.value.LastName,
        FatherName: this.form.value.FatherName,
        Email: this.form.value.Email,
        Address: this.form.value.Address,
        Mobile: this.form.value.Mobile,
        Gender: this.form.value.Gender,
        DOB: this.form.value.DOB,
        Country: this.form.value.Country
      }
    });
    this.matdialogRef.close(true);
  }

  edit() {
    this.store.dispatch({
      type: 'EDIT_STUDENT',
      payload: <IStudents>{
        FirstName: this.form.value.FirstName,
        LastName: this.form.value.LastName,
        FatherName: this.form.value.FatherName,
        Email: this.form.value.Email,
        Address: this.form.value.Address,
        Mobile: this.form.value.Mobile,
        Gender: this.form.value.Gender,
        DOB: this.form.value.DOB,
        Country: this.form.value.Country
      }
    });
    this.matdialogRef.close(true);
  }
}


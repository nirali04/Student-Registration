import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { AppState } from 'src/app/store/state';
import { IStudents } from 'src/app/shared/students';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit {

  // dataSource = [
  //   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  //   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  //   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  //   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  //   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },

  // ];

  displayedColumns: string[] = ['First_name', 'Email_ID', 'Mobile_no', 'Gender', 'DOB', 'action'];
  action: string;
  // matdialogRef: MatDialogRef<StudentRegistrationComponent>;
  @ViewChild('deleteConfirm') deleteConfirm: TemplateRef<any>;
  dataSource: any;

  constructor(private dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit(): void {
    let data: any = this.store.select(state => state.students);
    data.subscribe(data => this.dataSource = data);

  }


  openDialogRef(data?: any) {
    //  this.clearForm();
    if (data) {
      this.action = 'Update';
    } else {
      this.action = 'Add';
    }
    this.dialog.open(StudentRegistrationComponent,
      {
        disableClose: true,
        panelClass: 'popup_custom',
        autoFocus: false,
        data: [this.action, data]
      }).afterClosed()
      .subscribe(Item => {
        if (Item) {
          let data: any = this.store.select(state => state.students);
          data.subscribe(data => this.dataSource = data);
        }
      });

  }

  deleteDialog(id: any) {
    let dialogRef = this.dialog.open(this.deleteConfirm);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === 'yes') {
        this.store.dispatch({
          type: 'DELETE_STUDENT',
          payload: <IStudents>{
            FirstName: id,
          }
        });
        let data: any = this.store.select(state => state.students);
        data.subscribe(data => this.dataSource = data);
      }
    })
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [StudentRegistrationComponent, ViewStudentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
  ]
})
export class StudentsModule { }

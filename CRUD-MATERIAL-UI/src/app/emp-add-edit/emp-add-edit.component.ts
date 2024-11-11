import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EmpAddEditComponent implements OnInit {
  public data: any = inject(MAT_DIALOG_DATA);
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  private readonly fb = inject(FormBuilder);
  readonly empForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: '',
  });
  private readonly empService = inject(EmployeeService);
  private dialogRef = inject(MatDialogRef<EmpAddEditComponent>);
  private coreService = inject(CoreService);

  ngOnInit() {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.open('Employee detail updated');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.open('Employee added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }
  }
}

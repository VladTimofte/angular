import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Employee } from '../shared/models/Employee';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { createOrUpdateCustomEmployee } from '../../localStorage/createOrUpdate';
import { getDOMElements } from '../../helper/handleFieldsForm';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {
  @Input() data: Employee | null = null;
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      id: new FormControl('', [Validators.nullValidator]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        mobile: this.data.mobile,
        dob: formatDate(this.data.dob, 'yyyy-MM-dd', 'en'),
        doj: this.data.doj,
      });
    }
  }

  onSubmit() {
    const domFields = getDOMElements();
      createOrUpdateCustomEmployee({
        id: domFields?.id,
        name: domFields.name,
        email: domFields.email,
        mobile: domFields.mobile,
        dob: formatDate(domFields.dob, 'yyyy-MM-dd', 'en'),
        doj: formatDate(domFields.doj, 'yyyy-MM-dd', 'en'),
      })
      this.resetEmployeeForm();
      this.toastr.success("Emplyee added / updated succesfully");
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }
}

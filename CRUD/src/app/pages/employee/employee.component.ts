import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { getCustomEmployeesFromLocalStorage } from '../../localStorage/read';
import { deleteCustomEmployeeById } from '../../localStorage/delete';
import { Employee } from '../shared/models/Employee'
import { updateEmployeeFields } from '../../helper/handleFieldsForm';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: Employee[] = [];
  employee!: Employee;

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
   this.employees = getCustomEmployeesFromLocalStorage();
  }

  loadEmployee(employeeItem: Employee) {
    this.openModel();

    updateEmployeeFields(employeeItem);

  }

  deleteEmployee(employee: Employee) {
    deleteCustomEmployeeById(employee.id);
    

    this.toastr.success("Employee deleted succesfully");
    this.getAllEmployee();
  }

  openModel() {
    this.isModelOpen = true;
    updateEmployeeFields('');
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();
  }
}

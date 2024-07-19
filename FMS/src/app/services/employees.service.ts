import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../models/employee.model';
import { employees } from '../mock/employees.mock';

const LS_KEY = 'employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    
  employees: Employee[] = employees;
    

  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor() {
    let data = localStorage.getItem(LS_KEY);
    let parsedData = data ? JSON.parse(data) : null;

    if (parsedData?.length) {
      this.employees = parsedData;
    }
    this.saveEmployees();
  }

  getEmployeesObservable(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addOrUpdateEmployee(employee: Employee) {
    const existingEmployeesIndex = this.findEmployeeIndexById(employee.id);

    if (existingEmployeesIndex !== -1) {
      this.updateEmployee(existingEmployeesIndex, employee);
    } else {
      this.addNewEmployee(employee);
    }

    this.saveEmployees();
  }

  private findEmployeeIndexById(id: string): number {
    return this.employees.findIndex(f => f.id === id);
  }

  private updateEmployee(index: number, employee: Employee) {
    this.employees[index] = { ...employee };
    this.employeesSubject.next([...this.employees]); // Emit updated Employees to subscribers
    this.saveEmployees();
  }

  private addNewEmployee(employee: Employee) {
    const newEmployee = {
      id: uuidv4(),
      firstName: employee.firstName,
      lastName: employee.lastName,
      cnp: employee.cnp,
      drivingLicenseExDate: employee.drivingLicenseExDate,
      drivingLicenseCategories: employee.drivingLicenseCategories,
      email: employee.email,
      phone: employee.phone,
      jobDepartment: employee.jobDepartment,
      emergencyContactName: employee.emergencyContactName,
      emergencyContactPhoneNumber: employee.emergencyContactPhoneNumber,
    };
    this.employees.unshift(newEmployee);
    this.employeesSubject.next([...this.employees]); // Emit updated Employees to subscribers
    this.saveEmployees();
  }

  removeEmployee(id: string) {
    this.employees = this.employees.filter(employee => employee.id !== id);
    this.employeesSubject.next([...this.employees]); // Emit updated Employees to subscribers
    this.saveEmployees();
  }

  private saveEmployees() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.employees));
  }

  getEmployees() {
    return this.employees;
  }
}

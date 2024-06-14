import { Employee } from '../pages/shared/models/Employee'

export function getDOMElements(): Employee {
  const name = document.getElementById('name') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const mobile = document.getElementById('mobile') as HTMLInputElement;
      const dob = document.getElementById('dob') as HTMLInputElement;
      const doj = document.getElementById('doj') as HTMLInputElement;
      const id = document.getElementById('id') as HTMLInputElement;

      return { name: name.value, email: email.value, mobile: mobile.value, dob: dob.value, doj: doj.value, id: id.value }
}

export function updateEmployeeFields(employeeItem: Employee | any): void {
    setTimeout(() => {
      const name = document.getElementById('name') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const mobile = document.getElementById('mobile') as HTMLInputElement;
      const dob = document.getElementById('dob') as HTMLInputElement;
      const doj = document.getElementById('doj') as HTMLInputElement;
      const id = document.getElementById('id') as HTMLInputElement;
  
      if (name) name.value = employeeItem?.name || "";
      if (email) email.value = employeeItem?.email || "";
      if (mobile) mobile.value = employeeItem?.mobile || "";
      if (dob) dob.value = employeeItem?.dob || "";
      if (doj) doj.value = employeeItem?.doj || "";
      if (id) id.value = employeeItem?.id || "";
      
    }, 100);
  }
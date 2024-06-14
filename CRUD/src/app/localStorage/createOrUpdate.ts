import { Employee } from '../pages/shared/models/Employee'

function generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function createOrUpdateCustomEmployee(employee: Employee): void {
    const key = 'CustomEmployeesAngular';
    const storedData = localStorage.getItem(key);
    let employees: Employee[] = [];

    if (storedData) {
        try {
            employees = JSON.parse(storedData);
            if (!Array.isArray(employees)) {
                console.warn(`Data retrieved from localStorage key "${key}" is not an array.`);
                employees = [];
            }
        } catch (error) {
            console.error(`Error parsing data from localStorage key "${key}":`, error);
            employees = [];
        }
    }

    if (employee.id) {
        // Update existing employee
        const index = employees.findIndex((emp: any) => emp.id === employee.id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...employee };
            console.info(`Employee with id "${employee.id}" has been updated in localStorage.`);
        } else {
            console.warn(`Employee with id "${employee.id}" not found in localStorage.`);
        }
    } else {
        // Create new employee
        const newEmployee = {
            ...employee,
            id: generateRandomId(12)
        };
        employees.push(newEmployee);
        console.info(`New employee with id "${newEmployee.id}" has been added to localStorage.`);
    }

    localStorage.setItem(key, JSON.stringify(employees));
}

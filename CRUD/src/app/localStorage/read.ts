import { Employee } from '../pages/shared/models/Employee'

export function getCustomEmployeesFromLocalStorage(): Employee[] {
    const key = 'CustomEmployeesAngular';
    const storedData = localStorage.getItem(key);
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (Array.isArray(parsedData)) {
                return parsedData;
            } else {
                console.warn(`Data retrieved from localStorage key "${key}" is not an array.`);
                return [];
            }
        } catch (error) {
            console.error(`Error parsing data from localStorage key "${key}":`, error);
            return [];
        }
    } else {
        console.info(`No data found in localStorage for key "${key}".`);
        return [];
    }
}

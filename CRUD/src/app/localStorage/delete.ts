export function deleteCustomEmployeeById(id: string): void {
    const key = 'CustomEmployeesAngular';
    const storedData = localStorage.getItem(key);

    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (Array.isArray(parsedData)) {
                const updatedData = parsedData.filter((employee: any) => employee.id !== id);
                localStorage.setItem(key, JSON.stringify(updatedData));
                console.info(`Employee with id "${id}" has been removed from localStorage.`);
            } else {
                console.warn(`Data retrieved from localStorage key "${key}" is not an array.`);
            }
        } catch (error) {
            console.error(`Error parsing data from localStorage key "${key}":`, error);
        }
    } else {
        console.info(`No data found in localStorage for key "${key}".`);
    }
}

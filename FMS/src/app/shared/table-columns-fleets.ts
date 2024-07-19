import { ColDef } from 'ag-grid-community';

export const fleetsColumnsTable: ColDef[] = [
  { field: 'icon', flex: 1, filter: true },
  { field: 'plateNumber', flex: 1, filter: true },
  { field: 'make', flex: 1, filter: true },
  { field: 'model', flex: 1, filter: true },
  { field: 'manufactureYear', flex: 1, filter: true },
  { field: 'vinNumber', flex: 1, filter: true },
  { field: 'engineHorsePower', flex: 1, filter: true },
  { field: 'engineCapacityCC', flex: 1, filter: true },
  { field: 'fuelType', flex: 1, filter: true },
];

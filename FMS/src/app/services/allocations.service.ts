import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DB } from '../storage/db';
import { Allocation } from '../models/allocation.model';
import { allocations } from '../mock/allocations.mock';
import { Fleet } from '../models/fleet.model';
import { FleetsService } from './fleets.service';

@Injectable({
  providedIn: 'root'
})
export class AllocationsService extends DB<Allocation> {
  constructor(private fleetsService: FleetsService) {
    super('allocations', allocations);
  }

  // Link existing functions to the new common service
  getAllocationsObservable(): Observable<Allocation[]> {
    return this.getItemsObservable();
  }

  addOrUpdateAllocation(allocation: Allocation) {
    this.addOrUpdateItem(allocation);
  }

  removeAllocation(id: string) {
    this.removeItem(id);
  }

  getAllocations() {
    return this.getItems();
  }

  getAvailableVehicles(requestingEmployeeId: string, startDate: number, endDate: number): Fleet[] {
    return this.fleetsService.getFleets().filter(vehicle => {
      const isAvailable = !this.getItems().some(allocation => {
        if (allocation.vehicleId !== vehicle.id) {
          return false;
        }

        const overlaps = !(allocation.endDate < startDate || allocation.startDate > endDate);
        return overlaps && (requestingEmployeeId === undefined || allocation.employeeId !== requestingEmployeeId);
      });
      return isAvailable;
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Allocation } from '../models/allocation.model';
import { allocations } from '../mock/allocations.mock';

const LS_KEY = 'allocations';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {
    
  allocations: Allocation[] = allocations;
    

  private allocationsSubject = new BehaviorSubject<Allocation[]>([]);

  constructor() {
    let data = localStorage.getItem(LS_KEY);
    let parsedData = data ? JSON.parse(data) : null;

    if (parsedData?.length) {
      this.allocations = parsedData;
    }
    this.saveAllocations();
  }

  getAllocationsObservable(): Observable<Allocation[]> {
    return this.allocationsSubject.asObservable();
  }

  addOrUpdateAllocation(allocation: Allocation) {
    const existingAllocationsIndex = this.findAllocationIndexById(allocation.id);

    if (existingAllocationsIndex !== -1) {
      this.updateAllocation(existingAllocationsIndex, allocation);
    } else {
      this.addNewAllocation(allocation);
    }

    this.saveAllocations();
  }

  private findAllocationIndexById(id: string): number {
    return this.allocations.findIndex(f => f.id === id);
  }

  private updateAllocation(index: number, allocation: Allocation) {
    this.allocations[index] = { ...allocation };
    this.allocationsSubject.next([...this.allocations]); // Emit updated Allocations to subscribers
    this.saveAllocations();
  }

  private addNewAllocation(allocation: Allocation) {
    const newAllocation = {
      id: uuidv4(),
      employeeId: allocation.employeeId,
      vehicleId: allocation.vehicleId,
      startDate: allocation.startDate,
      endDate: allocation.endDate,
    };
    this.allocations.unshift(newAllocation);
    this.allocationsSubject.next([...this.allocations]); // Emit updated Allocations to subscribers
    this.saveAllocations();
  }

  removeEmployee(id: string) {
    this.allocations = this.allocations.filter(allocation => allocation.id !== id);
    this.allocationsSubject.next([...this.allocations]); // Emit updated Allocations to subscribers
    this.saveAllocations();
  }

  private saveAllocations() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.allocations));
  }

  getAllocations() {
    return this.allocations;
  }
}

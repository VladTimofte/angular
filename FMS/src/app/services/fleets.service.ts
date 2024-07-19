import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Fleet } from '../models/fleet.model';
import { fleets } from '../mock/fleets.mock';

const LS_KEY = 'fleets';

@Injectable({
  providedIn: 'root'
})
export class FleetsService {
  fleets: Fleet[] = fleets;

  private fleetsSubject = new BehaviorSubject<Fleet[]>([]);

  constructor() {
    let data = localStorage.getItem(LS_KEY);
    let parsedData = data ? JSON.parse(data) : null;

    if (parsedData?.length) {
      this.fleets = parsedData;
    }
    this.saveFleets();
  }

  getFleetsObservable(): Observable<Fleet[]> {
    return this.fleetsSubject.asObservable();
  }

  addOrUpdateFleet(fleet: Fleet) {
    const existingFleetIndex = this.findFleetIndexById(fleet.id);

    if (existingFleetIndex !== -1) {
      this.updateFleet(existingFleetIndex, fleet);
    } else {
      this.addNewFleet(fleet);
    }

    this.saveFleets();
  }

  private findFleetIndexById(id: string): number {
    return this.fleets.findIndex(f => f.id === id);
  }

  private updateFleet(index: number, fleet: Fleet) {
    this.fleets[index] = { ...fleet };
    this.fleetsSubject.next([...this.fleets]); // Emit updated fleets to subscribers
  }

  private addNewFleet(fleet: Fleet) {
    const newFleet = {
      id: uuidv4(),
      plateNumber: fleet.plateNumber,
      make: fleet.make,
      model: fleet.model,
      manufactureYear: fleet.manufactureYear,
      vinNumber: fleet.vinNumber,
      engineHorsePower: fleet.engineHorsePower,
      engineCapacityCC: fleet.engineCapacityCC,
      fuelType: fleet.fuelType,
      expirationDateITP: fleet.expirationDateITP,
      expirationDateRCA: fleet.expirationDateRCA,
    };
    this.fleets.unshift(newFleet);
    this.fleetsSubject.next([...this.fleets]); // Emit updated fleets to subscribers
  }

  removeFleet(id: string) {
    this.fleets = this.fleets.filter(fleet => fleet.id !== id);
    this.fleetsSubject.next([...this.fleets]); // Emit updated fleets to subscribers
    this.saveFleets();
  }

  private saveFleets() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.fleets));
  }

  getFleets() {
    return this.fleets;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DB } from '../storage/db';
import { Fleet } from '../models/fleet.model';
import { fleets } from '../mock/fleets.mock';

@Injectable({
  providedIn: 'root'
})
export class FleetsService extends DB<Fleet> {
  constructor() {
    super('fleets', fleets);
  }

  // Link existing functions to the new common service
  getFleetsObservable(): Observable<Fleet[]> {
    return this.getItemsObservable();
  }

  addOrUpdateFleet(fleet: Fleet) {
    this.addOrUpdateItem(fleet);
  }

  removeFleet(id: string) {
    this.removeItem(id);
  }

  getFleets() {
    return this.getItems();
  }
}

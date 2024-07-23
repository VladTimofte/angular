import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FleetsComponent } from './pages/fleets/fleets.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AllocationsComponent } from './pages/allocations/allocations.component';
import { TrackComponent } from './pages/track/track.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'fleets', component: FleetsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'allocations', component: AllocationsComponent },
  { path: 'track', component: TrackComponent },
];

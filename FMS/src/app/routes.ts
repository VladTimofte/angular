import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FleetsComponent } from './pages/fleets/fleets.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'fleets', component: FleetsComponent },
];
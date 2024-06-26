import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { AppAuthButtonComponent } from './components/app-auth-button/app-auth-button.component';
import { LoginComponent } from "./pages/login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        RouterOutlet,
        AppAuthButtonComponent,
        LoginComponent
    ]
})
export class AppComponent {
  title = 'FMS';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}

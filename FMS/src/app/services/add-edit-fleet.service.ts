import { Injectable, ApplicationRef, EnvironmentInjector, ComponentRef, createComponent } from '@angular/core';
import { Fleet } from '../models/fleet.model';
import { AddEditFleetModalComponent } from '../components/add-edit-fleet-modal/add-edit-fleet-modal.component';

@Injectable({ providedIn: 'root' })
export class AddEditFleetFormService {
  private isDialogOpen = false;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  openAddEditFleetForm(data: { fleet: Fleet, isFleetUpdating: boolean }): Promise<boolean> {
    if (this.isDialogOpen) {
      return Promise.resolve(false);
    }
    this.isDialogOpen = true;

    return new Promise<boolean>((resolve) => {
      const componentRef = this.createComponent(AddEditFleetModalComponent);
      componentRef.instance.fleet = data.fleet;
      componentRef.instance.isFleetUpdating = data.isFleetUpdating;

      componentRef.instance.isAddEditFleetConfirmed.subscribe((result: boolean) => {
        this.isDialogOpen = false;
        resolve(result);
        this.destroyComponent(componentRef);
      });

      document.body.appendChild(componentRef.location.nativeElement);
    });
  }

  private createComponent<T>(component: { new (...args: any[]): T }): ComponentRef<T> {
    const componentRef = createComponent(component, { environmentInjector: this.environmentInjector });
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  private destroyComponent<T>(componentRef: ComponentRef<T>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

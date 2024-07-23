import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ICellRendererParams,
  GridReadyEvent,
  GridApi,
} from 'ag-grid-community';
import * as moment from 'moment';
import { MomentInput } from 'moment';

import { FleetsService } from '../../services/fleets.service';
import { AddEditFleetModalComponent } from '../../components/add-edit-fleet-modal/add-edit-fleet-modal.component';
import { Fleet } from 'src/app/models/fleet.model';
import { MakeIconClassName, emptyFleetObj } from 'src/app/shared/fleet';
import { AddEditFleetFormService } from 'src/app/services/add-edit-fleet.service';
import { DialogService } from 'src/app/services/dialog.service';
import { documentExpired, documentExpiresWithinMonth } from 'src/app/utils/booleans';

@Component({
  selector: 'app-fleets',
  standalone: true,
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.scss'],
  imports: [
    AddEditFleetModalComponent,
    CommonModule,
    MatIconModule,
    AgGridAngular,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetsComponent implements OnInit, OnDestroy {
  public filteredFleets: Fleet[] = [];
  private fleetsSubscription: Subscription | undefined;
  public searchTerm: string = '';
  private gridApi!: GridApi;
  public selectedRow: any;

  constructor(
    private fleetsService: FleetsService,
    private addEditFleetService: AddEditFleetFormService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Subscribe to fleets observable
    this.fleetsSubscription = this.fleetsService
      .getFleetsObservable()
      .subscribe((fleets) => {
        this.updateFilteredFleets(fleets);
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from fleets observable to avoid memory leaks
    if (this.fleetsSubscription) {
      this.fleetsSubscription.unsubscribe();
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  fleetsColumns: ColDef[] = [
    {
      field: 'icon',
      flex: 0.75,
      filter: false,
      headerName: '',
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `<i class='${params.value}'></i>`;
      },
    },
    { field: 'plateNumber', flex: 1.5, filter: false },
    { field: 'make', flex: 2, filter: false },
    { field: 'model', flex: 2, filter: false },
    { field: 'manufactureYear', flex: 2, filter: false },
    { field: 'vinNumber', flex: 2.2, filter: false },
    { field: 'engineHorsePower', flex: 2, filter: false },
    { field: 'engineCapacityCC', flex: 2, filter: false },
    { field: 'fuelType', flex: 2, filter: false },
    {
      field: 'expirationDateITP',
      flex: 2,
      filter: false,
      cellRenderer: (params: { value: number }) => {
        return moment(params.value).format('DD-MM-YYYY');
      },
      cellStyle: (params) => {
        if (documentExpired(params.value)) {
          return { backgroundColor: 'rgb(255 0 0 / 40%) !important' };
        } else if (documentExpiresWithinMonth(params.value)) {
          return { backgroundColor: 'rgb(255 255 0 / 40%) !important' };
        }
        return null;
      }
    },
    {
      field: 'expirationDateRCA',
      flex: 2,
      filter: false,
      cellRenderer: (params: { value: MomentInput }) => {
        return moment(params.value).format('DD-MM-YYYY');
      },
      cellStyle: (params) => {
        if (documentExpired(params.value)) {
          return { backgroundColor: 'rgb(255 0 0 / 40%) !important' };
        } else if (documentExpiresWithinMonth(params.value)) {
          return { backgroundColor: 'rgb(255 255 0 / 40%) !important' };
        }
        return null;
      }
    },
  ];

  private updateFilteredFleets(fleets: Fleet[]): void {
    // Update filteredFleets based on current search term
    this.filteredFleets = this.filterFleets(this.searchTerm, fleets);
    if (this.gridApi) {
      const rowData: any[] = [];
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      this.gridApi.applyTransaction({
        remove: rowData,
      })!;
      this.gridApi.applyTransaction({
        add: this.filteredFleets,
      })!;
    }
  }

  searchInputListener(value: string) {
    // Update search term and filteredFleets
    this.searchTerm = value;
    this.filteredFleets = this.filterFleets(
      value,
      this.fleetsService.getFleets()
    );
  }

  inputListener(value: string) {
    // Handle input changes to update filteredFleets
    if (!value?.length) {
      this.filteredFleets = this.fleetsService.getFleets().map((fleet) => ({
        ...fleet,
        icon: this.getIconClassName(fleet),
      }));
    }
  }

  private filterFleets(searchTerm: string, fleets: Fleet[]): Fleet[] {
    // Check if searchTerm is null, undefined, or an empty string
    if (!searchTerm) {
      return this.fleetsService.getFleets().map((fleet) => ({
        ...fleet,
        icon: this.getIconClassName(fleet),
      }));
    }

    // Filter fleets based on search term
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return fleets
      .filter((fleet) =>
        Object.keys(fleet).some((key) => {
          const propValue = fleet[key as keyof typeof fleet];
          return (
            key !== 'id' &&
            propValue !== null &&
            propValue.toString().toLowerCase().includes(lowerCaseSearchTerm)
          );
        })
      )
      .map((filteredFleet) => ({
        ...filteredFleet,
        icon: this.getIconClassName(filteredFleet),
      }));
  }

  private getIconClassName(fl: Fleet) {
    // Find icon class name based on fleet make
    const formattedMake = fl.make.trim().toLowerCase();
    const foundFleet = MakeIconClassName.find(
      (vehicle) => vehicle.make.toLowerCase() === formattedMake
    );
    return foundFleet ? foundFleet.iconClassName : null;
  }

  addFleet() {
    this.addEditFleetService
      .openAddEditFleetForm({
        fleet: emptyFleetObj,
        isFleetUpdating: false,
      })
      .then((confirmed) => {
        if (confirmed) {
          console.log('Fleet added'); // Todo: create a confirm message UI
        }
      });
  }

  onRowClicked() {
    this.selectedRow = this.gridApi.getSelectedRows();
  }

  deselectRows() {
    this.selectedRow = undefined;
    this.gridApi.deselectAll();
  }

  editRow() {
    this.addEditFleetService
      .openAddEditFleetForm({
        fleet: this.selectedRow[0],
        isFleetUpdating: true,
      })
      .then((confirmed) => {
        if (confirmed) {
          console.log('Fleet updated'); // Todo: create a confirm message UI
        }
      });
      this.deselectRows();
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows()[0];
    this.dialogService
      .openConfirmDialog({
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete: ${selectedData.plateNumber}?`,
        type: 'question'
      })
      .then((confirmed) => {
        if (confirmed) {
          this.fleetsService.removeFleet(selectedData.id);
        }
      });
      this.deselectRows();
  }
}

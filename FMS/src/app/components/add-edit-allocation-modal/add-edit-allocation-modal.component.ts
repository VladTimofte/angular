import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { Allocation } from 'src/app/models/allocation.model';
import { AllocationService } from 'src/app/services/allocations.service';

@Component({
  selector: 'app-add-edit-allocation-modal',
  standalone: true,
  templateUrl: './add-edit-allocation-modal.component.html',
  styleUrls: ['./add-edit-allocation-modal.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditAllocationModalComponent {
  @Input({ required: true }) allocation!: Allocation;
  @Input({ required: true }) isAllocationUpdating!: boolean;
  @Output() isAddEditAllocationConfirmed = new EventEmitter<boolean>();

  private allocationService = inject(AllocationService);
  modalForm: FormGroup;
  isSOSDivHidden: boolean = true;

  constructor(private fb: FormBuilder) {
    this.modalForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.modalForm.patchValue({
      employeeId: this.allocation.employeeId,
      vehicleId: this.allocation.vehicleId,
      startDate: this.allocation.startDate,
      endDate: this.allocation.endDate,
    });
    this.modalForm.valueChanges.subscribe(value => {
      this.keepAllocationUpdated(value)
    });
  }

  keepAllocationUpdated(value: Allocation) {
    this.allocation = {
      ...this.allocation,
      ...value
    }
  }

  onCancel() {
    this.isAddEditAllocationConfirmed.emit(false);
  }

  onSubmit() {
    if (this.modalForm.valid) {
      this.allocationService.addOrUpdateAllocation(this.allocation);
      this.isAddEditAllocationConfirmed.emit(true);
    } else {
      this.modalForm.markAllAsTouched();
    }
  }
}

import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RequestPlant, ResponsePlant } from '../../models/plant.model';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { PlantService } from '../../services/plant.service';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-edit-plant-modal',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './edit-plant-modal.component.html',
  styleUrls: ['./edit-plant-modal.component.css'],
})
export class EditPlantModalComponent implements OnInit {
  fb = inject(FormBuilder);
  plantService = inject(PlantService);
  dialog = inject(MatDialog);
  countryService = inject(CountriesService);
  dialogRef: MatDialogRef<EditPlantModalComponent> = inject(MatDialogRef);

  plantForm: FormGroup;
  countries: Country[] = [];
  isLoadingCountries: boolean = false;

  @Output() plantUpdated = new EventEmitter<RequestPlant>();

  constructor(@Inject(MAT_DIALOG_DATA) public plantData: RequestPlant) {
    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    if (this.plantData) {
      this.setFormValues();
    }
  }

  private setFormValues(): void {
    this.plantForm.patchValue({
      name: this.plantData.name,
      country: this.plantData.country,
    });
  }

  private loadCountries(): void {
    this.isLoadingCountries = true;
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.isLoadingCountries = false;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      const updatedPlant: RequestPlant = {
        name: this.plantForm.value.name,
        country: this.plantForm.value.country,
      };

      this.plantUpdated.emit(updatedPlant);
      this.dialogRef.close(updatedPlant);
    }
  }
}

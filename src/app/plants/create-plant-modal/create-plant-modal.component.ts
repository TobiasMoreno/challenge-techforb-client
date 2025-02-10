import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RequestPlant } from '../../models/plant.model';
import { MatSelectModule } from '@angular/material/select';
import { Country } from '../../models/country.model';
import { PlantService } from '../../services/plant.service';
import { CountriesService } from '../../services/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-plant-modal',
  imports: [
    MatIconModule,
    MatError,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './create-plant-modal.component.html',
  styleUrl: './create-plant-modal.component.css',
})
export class CreatePlantModalComponent implements OnInit {
  plantForm: FormGroup = new FormGroup({});

  fb = inject(FormBuilder);
  plantService = inject(PlantService);
  dialog = inject(MatDialog);
  countryService = inject(CountriesService);

  countries: Country[] = [];
  isLoadingCountries = false;

  ngOnInit(): void {
    this.createForm();
    this.loadCountries();
  }

  createForm(): void {
    this.plantForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }
  onCancel(): void {
    this.dialog.closeAll();
  }
  onSubmit(): void {
    if (this.plantForm.valid) {
      this.createPlant(this.plantForm.value);
    }
  }

  createPlant(requestPlant: RequestPlant): void {
    this.plantService.createPlant(requestPlant).subscribe(() => {
      this.dialog.closeAll();
      Swal.fire('Planta Creada con éxito', '', 'success');
    });
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }
}

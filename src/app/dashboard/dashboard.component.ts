import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResponseCountPlant, ResponsePlant } from '../models/plant.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlantModalComponent } from '../plants/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../services/plants.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  plants: ResponseCountPlant[] = [];
  selectedPlant: ResponsePlant = {} as ResponsePlant;
  plantService = inject(PlantService);
  dialog = inject(MatDialog);

  selectPlant(plantId: string): void {
    this.plantService.getPlantById(plantId).subscribe((data) => {
      this.selectedPlant = data;
    })
  }

  ngOnInit(): void {
    this.getCountPlants();
  }
  getCountPlants(): void {
    this.plantService.getCountPlants().subscribe((data) => {
      this.plants = data;
    });
  }

  addPlant(): void {
    this.dialog.open(CreatePlantModalComponent, {
      width: '250px',
      data: { name: '', country: '' },
    });
  }


  // TODO agregar metodos para obtener la cantidad de alertas OK, MEDIA Y ROJA de una planta en especifico
  // TODO agregar metodo para obtener la cantidad de alertas OK, MEDIA Y ROJA de todas las plantas del usuario
  // TODO agregar metodo para obtener la cantidad de sensores dehabilitados
}

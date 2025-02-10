import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  RequestPlant,
  ResponseCountPlant,
  ResponsePlant,
} from '../models/plant.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreatePlantModalComponent } from '../plants/create-plant-modal/create-plant-modal.component';
import { PlantService } from '../services/plant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { EditPlantModalComponent } from '../plants/edit-plant-modal/edit-plant-modal.component';
import { AlertService } from '../services/alert.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  plants: ResponseCountPlant[] = [];
  selectedPlant: ResponsePlant = {} as ResponsePlant;
  plantService = inject(PlantService);
  alertService = inject(AlertService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  redAlertsCount: number = 0;
  mediumAlertsCount: number = 0;
  showActions: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<ResponseCountPlant>([]);

  ngOnInit(): void {
    this.getCountPlants();
    this.setAlertsCount();
  }

  getCountPlants(): void {
    this.plantService.getCountPlants().subscribe((data) => {
      this.plants = data;
      this.dataSource.data = this.plants;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectPlant(plantId: string): void {
    if (this.selectedPlant && this.selectedPlant.id === plantId) {
      this.selectedPlant = {} as ResponsePlant;
    } else {
      this.plantService.getPlantById(plantId).subscribe((data) => {
        this.selectedPlant = data;
      });
    }
  }

  setAlertsCount(): void {
    this.alertService.getMediumAlertsCount().subscribe((data) => {
      this.mediumAlertsCount = data;
    });
    this.alertService.getRedAlertsCount().subscribe((data) => {
      this.redAlertsCount = data;
    });
  }

  deletePlant(plantId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantService.deletePlantById(plantId).subscribe(() => {
          this.getCountPlants();
          Swal.fire('Planta eliminada con éxito', '', 'success');
        });
      } else {
        Swal.fire('Operación cancelada', '', 'info');
      }
    });
  }

  addPlant(): void {
    const dialogRef = this.dialog.open(CreatePlantModalComponent, {
      width: '250px',
      data: { name: '', country: '' },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCountPlants();
      this.setAlertsCount();
    });
  }

  editPlant(plantId: string): void {
    this.plantService.getPlantById(plantId).subscribe((plant) => {
      const dialogRef = this.dialog.open(EditPlantModalComponent, {
        width: '400px',
        data: plant,
      });

      dialogRef.afterClosed().subscribe((updatedPlant: RequestPlant) => {
        if (updatedPlant) {
          this.updatePlant(plantId, updatedPlant);
          Swal.fire('Planta actualizada con éxito', '', 'success');
        }
      });
    });
  }

  updatePlant(plantId: string, updatedPlant: RequestPlant): void {
    this.plantService.updatePlant(plantId, updatedPlant).subscribe(() => {
      this.getCountPlants();
      this.setAlertsCount();
    });
  }

  toggleActions(): void {
    this.showActions = !this.showActions;
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

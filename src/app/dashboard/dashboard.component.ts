import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResponsePlant } from '../models/plant.model';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  plants: ResponsePlant[] = [];
  selectedPlant: any = null;
  dashboardService = inject(DashboardService);

  selectPlant(plant: ResponsePlant): void {
    this.selectedPlant = plant;
  }

  ngOnInit(): void {
    this.dashboardService.getPlants().subscribe((data) => {
      this.plants = data;
    });
  }
}

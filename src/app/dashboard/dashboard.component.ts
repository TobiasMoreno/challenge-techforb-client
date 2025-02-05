import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResponsePlant } from '../models/plant.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  plants: ResponsePlant[] = [];
  selectedPlant: any = null;
  http = inject(HttpClient);

  selectPlant(plant: any): void {
    this.selectedPlant = plant;
  }

  ngOnInit(): void {
    debugger;
    this.http.get<ResponsePlant[]>('http://localhost:8080/api/plants').subscribe((plants) => {
      this.plants = plants;
    });
  }
}

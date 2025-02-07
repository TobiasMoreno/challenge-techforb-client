import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { ResponsePlant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseService = inject(BaseHttpService);

  getPlants() {
    return this.baseService.http.get<ResponsePlant[]>(`${this.baseService.API_URL}/plants/list`);
  }
}

import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import {
  RequestPlant,
  ResponseCountPlant,
  ResponsePlant,
} from '../models/plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  baseService = inject(BaseHttpService);

  getPlants(): Observable<ResponsePlant[]> {
    return this.baseService.http.get<ResponsePlant[]>(
      `${this.baseService.API_URL}/plants/list`
    );
  }

  createPlant(requestPlant: RequestPlant): Observable<ResponsePlant> {
    return this.baseService.http.post<ResponsePlant>(
      `${this.baseService.API_URL}/plants`,
      requestPlant
    );
  }

  getPlantById(id: string): Observable<ResponsePlant> {
    return this.baseService.http.get<ResponsePlant>(
      `${this.baseService.API_URL}/plants/${id}`
    );
  }

  getCountPlants(): Observable<ResponseCountPlant[]> {
    return this.baseService.http.get<ResponseCountPlant[]>(
      `${this.baseService.API_URL}/plants/stats`
    );
  }
}

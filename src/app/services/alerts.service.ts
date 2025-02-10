import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { RequestPlant, ResponsePlant } from '../models/plant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  baseService = inject(BaseHttpService);

  getMediumAlertsCount(plantId: string): Observable<number> {
    return this.baseService.http.get<number>(
      `${this.baseService.API_URL}/alerts/count-medium/${plantId}`
    );
  }

  getRedAlertsCount(plantId: string): Observable<number> {
    return this.baseService.http.get<number>(
      `${this.baseService.API_URL}/alerts/count-red/${plantId}`
    );
  }


}

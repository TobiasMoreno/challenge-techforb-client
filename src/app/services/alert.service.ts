import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  baseService = inject(BaseHttpService);

  getMediumAlertsCount(): Observable<number> {
    return this.baseService.http.get<number>(
      `${this.baseService.API_URL}/alerts/count-medium`
    );
  }

  getRedAlertsCount(): Observable<number> {
    return this.baseService.http.get<number>(
      `${this.baseService.API_URL}/alerts/count-red`
    );
  }


}
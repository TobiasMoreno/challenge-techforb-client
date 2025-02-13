import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  http = inject(HttpClient);
  API_URL = environment.production ? environment.apiUrl : 'http://localhost:8080/api';
}

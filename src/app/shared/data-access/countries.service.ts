import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  http = inject(HttpClient);
  apiUrl = 'https://restcountries.com/v3.1/all?fields=name';

  getCountries(): Observable<Country[]> {
    return this.http
      .get<{ name: { common: string } }[]>(this.apiUrl)
      .pipe(
        map((data) =>
          data
            .map((country) => ({ name: country.name.common }))
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
}

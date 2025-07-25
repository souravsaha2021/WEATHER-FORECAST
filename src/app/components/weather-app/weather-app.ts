import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'weather-search',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './weather-app.html',
  styleUrls: ['./weather-app.scss']
})
export class WeatherSearchComponent {

  forecastData = [
    { date: 'Thu, Jul 24', tempMin: 32, tempMax: 24, type: 'very heavy rain', icon: "11d.png" },
    { date: 'Fri, Jul 25', tempMin: 28, tempMax: 24, type: 'heavy intensity rain', icon: "11d.png" },
    { date: 'Sat, Jul 26', tempMin: 32, tempMax: 25, type: 'light rain', icon: "10d.png" },
    { date: 'Sun, Jul 27', tempMin: 33, tempMax: 26, type: 'few clouds', icon: "02d.png" },
    { date: 'Mon, Jul 28', tempMin: 31, tempMax: 27, type: 'clear sky', icon: "01d.png" },
    // { date: 'Tue, Jul 29', temp: '29 / 26°C', type: 'light rain' },
    // { date: 'Wed, Jul 30', temp: '32 / 25°C', type: 'light rain' },
  ];

  private http = inject(HttpClient);
  cityControl = new FormControl('');
  weatherData: any = null;
  errorMessage: string = '';
  isF: boolean = false;

  private apiKey = 'a389c166cb53aa538ded2a8ba170c9ff';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {
     // Later to retrieve:
      const saved = JSON.parse(localStorage.getItem('celiusData') || '{}');
      console.log(saved['isCelcius']);
      this.isF = saved['isCelcius'] === 'false' ? true : false;
    this.cityControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMessage = '';
          this.weatherData = null;
        }),
        switchMap(city =>
          this.http.get(`${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`).pipe(
            catchError(err => {
              if ((city ?? "").length > 0) {
                this.errorMessage = 'City not found or API error!';
              }
              else {
                this.errorMessage = '';
              }
              return of(null);
            })
          )
        )
      )
      .subscribe(data => {
        if (data) {
          this.weatherData = data;
        }
      });
  }
}
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
    { date: 'Thu, Jul 24', temp: '32 / 24°C', type: 'very heavy rain', icon: "11d.png" },
    { date: 'Fri, Jul 25', temp: '28 / 24°C', type: 'heavy intensity rain', icon: "11d.png" },
    { date: 'Sat, Jul 26', temp: '32 / 25°C', type: 'light rain', icon: "10d.png" },
    { date: 'Sun, Jul 27', temp: '33 / 26°C', type: 'few clouds', icon: "02d.png" },
    { date: 'Mon, Jul 28', temp: '31 / 27°C', type: 'clear sky', icon: "01d.png" },
    // { date: 'Tue, Jul 29', temp: '29 / 26°C', type: 'light rain' },
    // { date: 'Wed, Jul 30', temp: '32 / 25°C', type: 'light rain' },
  ];

  private http = inject(HttpClient);
  cityControl = new FormControl('');
  weatherData: any = null;
  errorMessage: string = '';

  private apiKey = 'a389c166cb53aa538ded2a8ba170c9ff';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {
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
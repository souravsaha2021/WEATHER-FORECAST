import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { WeatherSearchComponent } from './app/components/weather-app/weather-app';

bootstrapApplication(WeatherSearchComponent)
  .catch(err => console.error(err));
  

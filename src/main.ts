import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";
import { WeatherSearchComponent } from "./app/components/weather-app/weather-app";
import { Auth } from "./app/components/auth/auth";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/component/component";

// bootstrapApplication(WeatherSearchComponent)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});

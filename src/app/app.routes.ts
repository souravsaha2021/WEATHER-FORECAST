import { Routes } from "@angular/router";
import { Auth } from "./components/auth/auth";
import { WeatherSearchComponent } from "./components/weather-app/weather-app";

export const routes: Routes = [
  {
    path: "",
    component: Auth, // ✅ this is your default route
  },

  {
    path: "weather-forecast",
    loadComponent: () =>
      import("./components/weather-app/weather-app").then(
        (m) => m.WeatherSearchComponent
      ),
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./components/admin/admin").then((m) => m.Admin),
  },
];

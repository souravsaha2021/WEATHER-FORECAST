import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Users } from "./users/users";
import { Weather } from "./weather/weather";

const routes: Routes = [
  { path: "users", component: Users },

  { path: "weather", component: Weather },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

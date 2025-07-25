import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { Users } from "./users/users";

@NgModule({
  //  declarations: [Users],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}

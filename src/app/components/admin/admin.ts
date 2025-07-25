import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-admin",
  imports: [RouterOutlet],
  templateUrl: "./admin.html",
  styleUrl: "./admin.scss",
  //  template: `
  //   <h2>Admin Panel</h2>
  //   <router-outlet></router-outlet>
  // `,
})
export class Admin {
  logout() {}
}

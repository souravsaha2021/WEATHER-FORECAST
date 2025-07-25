import { Component } from "@angular/core";
import { RouterModule, RouterOutlet, Router } from "@angular/router";

@Component({
  selector: "app-admin",
  imports: [RouterModule, RouterOutlet],
  templateUrl: "./admin.html",
  styleUrl: "./admin.scss",
  //  template: `
  //   <h2>Admin Panel</h2>
  //   <router-outlet></router-outlet>
  // `,
})
export class Admin {
  constructor(private router: Router) { }
  logout() {
    console.log("logout clicked");
    this.router.navigate(['/']);
  }
}

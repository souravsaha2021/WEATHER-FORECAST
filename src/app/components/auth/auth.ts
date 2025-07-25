import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root", //app-auth
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: "./auth.html",
  styleUrl: "./auth.scss",
})
export class Auth {
  email = "";
  password = "";
  errorMessage = ""

  users: any[] = [];
  loginError = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>("assets/users.json").subscribe({
      next: (data) => {
        this.users = data;
        console.log("User data loaded:", this.users);
      },
      error: (err) => {
        console.error("Failed to load users.json", err);
      },
    });
  }

  login() {
    console.log("Email : ", this.email);
    console.log("password :", this.password);

    const foundUser = this.users.find(
      (user) => user.email === this.email && user.password === this.password
    );

    if (!foundUser) {
      console.log("Invalid email or password.");
      this.errorMessage = "Invalid email or password."
      this.loginError = true;
    } else if (!foundUser.isActive) {
      console.log("User is inactive.");
      this.errorMessage = "User is inactive."
      this.loginError = true;
    } else {
      console.log("Login successful!");
      this.loginError = false;
      console.log(foundUser.role);
      // redirect or store session here
      if (foundUser.role == "user") {
        this.router.navigate(["weather-forecast"]);
      } else if (foundUser.role == "admin") {
        this.router.navigate(["admin"]);
      }
    }
  }
}

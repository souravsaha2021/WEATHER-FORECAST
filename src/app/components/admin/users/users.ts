import { CommonModule } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-users",
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: "./users.html",
  styleUrl: "./users.scss",
})
export class Users implements OnInit {
  users: any[] = [];
  editingUser: any = null;
  showAddUserForm = false;
  newUser = {
    userId: this.generateId(),
    name: "",
    email: "",
    role: "",
    isActive: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>("assets/users.json").subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: any) {
    console.log("Editing user:", user);
    // Add edit logic here
    this.editingUser = { ...user };
  }

  saveUser() {
    const index = this.users.findIndex(
      (u) => u.userId === this.editingUser.userId
    );
    if (index !== -1) {
      this.users[index] = { ...this.editingUser };
      this.editingUser = null;
      console.log("User saved:", this.users[index]);
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }

  // goToAddUser() {
  //   // Navigate to add user form or toggle visibility
  //   console.log("Navigating to add user form...");
  //   // Example: this.router.navigate(['/add-user']);
  // }

  goToAddUser() {
    this.showAddUserForm = true;
  }

  cancelAddUser() {
    this.showAddUserForm = false;
    this.resetForm();
  }

  addUser() {
    this.users.push({ ...this.newUser });
    alert("User added successfully!");
    this.cancelAddUser();
  }

  generateId(): string {
    const nextId = this.users.length
      ? Math.max(...this.users.map((u) => Number(u.userId))) + 1
      : 6;

    return "U" + nextId.toString().padStart(3, "0");
  }

  resetForm() {
    this.newUser = {
      userId: this.generateId(),
      name: "",
      email: "",
      role: "",
      isActive: true,
    };
  }

  deleteUser(userId: number) {
    console.log("Deleting user ID:", userId);
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    this.users = this.users.filter((user) => user.userId !== userId);
    console.log(`User with ID ${userId} deleted`);
  }
}

import { Component } from "@angular/core";

@Component({
  selector: "app-weather",
  imports: [],
  standalone: true,
  template: `<p>Weather Component Works!</p>`,
  templateUrl: "./weather.html",
  styleUrl: "./weather.scss",
})
export class Weather {

  useCelsius = true;

  toggleUnit() {
    this.useCelsius = !this.useCelsius;
    console.log("changed to : ", this.useCelsius);

    // now save in local storage/json

    const data = {
        isCelcius: this.useCelsius ? 'true' : 'false',
      };
      localStorage.setItem('celiusData', JSON.stringify(data));
  }

}

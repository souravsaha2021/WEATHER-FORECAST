import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherApp } from './weather-app';

describe('WeatherApp', () => {
  let component: WeatherApp;
  let fixture: ComponentFixture<WeatherApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

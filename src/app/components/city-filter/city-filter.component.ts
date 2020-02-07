import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-city-filter',
    templateUrl: './city-filter.component.html',
    styleUrls: ['./city-filter.component.scss'],
})
export class CityFilterComponent {
    cityResults = [];
    error: string;
 

    constructor(private weatherService: WeatherService) {}

    displayCities(event) {
        const inputValue = event.target.value;
        if (inputValue.trim() === '') {
            this.cityResults = [];
            return;
        }
        if (inputValue > 3) {
            this.weatherService.getAutocomplete(inputValue).subscribe(
                city => {
                    this.cityResults = city.map(item => ({
                        key: item.Key,
                        name: item.LocalizedName,
                        country: item.Country.LocalizedName,
                    }));
                },
                error => {
                    this.error = error;
                }
            );
        }
    }

    setCurrentCity(city) {
        this.weatherService.setCurrentCity(city);
    }
}

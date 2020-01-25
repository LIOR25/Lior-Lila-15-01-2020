import { Component, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
    dailyForecasts = [];
    error: string;

    constructor(public weatherService: WeatherService) {}

    @Input()
    set city(city) {
        this.weatherService.get5DaysOfForecasts(city.key).subscribe(
            forecast => {
                this.dailyForecasts = forecast.DailyForecasts;
            },
            error => {
                this.error = error;
            }
        );
    }
}

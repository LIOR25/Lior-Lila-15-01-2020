import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
    dailyForecasts = [];
    error: string;

    constructor(private weatherService: WeatherService) {}

    @Input()
    set city(city) {
        console.log(city);

        this.weatherService.get5DaysOfForecasts(city.key).subscribe(
            forecast => {
                this.dailyForecasts = forecast.DailyForecasts;
                console.log(this.dailyForecasts, ' this.dailyForecasts');
            },
            error => {
                this.error = error;
            }
        );
    }

    ngOnInit() {}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import City from 'src/app/models/City';
import { Subscription } from 'rxjs';
import { DailyWeather } from 'src/app/models/DailyWeather';

// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { toggleFavorite } from '../../store/favorites.action';
@Component({
    selector: 'app-weather-page',
    templateUrl: './weather-page.component.html',
    styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent implements OnInit, OnDestroy {
    citySubsription: Subscription;
    currentCity: City;
    dailyWeatherSub: Subscription;
    dailyWeather: DailyWeather;
    dailyResult = [];
    isFavorite: boolean;
    isD: boolean;
    error: string;

    constructor(
        private weatherService: WeatherService,
        private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
        this.citySubsription = this.weatherService.currentCity.subscribe(
            currentCity => {
                this.isFavorite = this.favoritesService.isFavorite(currentCity);
                this.currentCity = currentCity;
                if (this.currentCity) {
                    this.dailyWeatherSub = this.weatherService
                        .getCurrentWeather(this.currentCity.key)
                        .subscribe(dailyWeather => {
                            this.dailyWeather = dailyWeather;
                        });
                }
            },
            error => {
                this.error = error;
            }
        );
    }

    ngOnDestroy() {
        this.citySubsription.unsubscribe();
        this.dailyWeatherSub.unsubscribe();
    }

    toggleFavorite() {
        const service = this.favoritesService;
        this.isFavorite
            ? service.remove(this.currentCity)
            : service.add(this.currentCity);
        this.isFavorite = !this.isFavorite;
    }

    toggleD() {}
}

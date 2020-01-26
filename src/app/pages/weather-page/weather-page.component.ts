import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as WeatherActions from '../../store/weather.actions';
import City from 'src/app/models/City';
import { DailyWeather } from 'src/app/models/DailyWeather';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-weather-page',
    templateUrl: './weather-page.component.html',
    styleUrls: ['./weather-page.component.scss'],
})

export class WeatherPageComponent implements OnInit, OnDestroy {
    currentCity: City;
    citySubsription: Subscription;
    dailyWeatherSub: Subscription;
    weatherState: Observable<{ dailyWeather: DailyWeather }>;
    isFavorite: boolean;
    error: string;

    constructor(
        private weatherService: WeatherService,
        private favoritesService: FavoritesService,
        private store: Store<{ weatherState: { dailyWeather: DailyWeather } }>
    ) {}

    ngOnInit() {
        this.weatherState = this.store.select('weatherState');
        this.citySubsription = this.weatherService.currentCity.subscribe(
            currentCity => {
                this.isFavorite = this.favoritesService.isFavorite(currentCity);
                this.currentCity = currentCity;
                if (this.currentCity) {
                    this.dailyWeatherSub = this.weatherService
                        .getCurrentWeather(this.currentCity.key)
                        .subscribe(dailyWeather => {
                            this.store.dispatch(
                                new WeatherActions.UpdateDailyWeather({
                                    weatherText: dailyWeather[0].WeatherText,
                                    dailyTemperature: dailyWeather[0].Temperature.Metric.Value.toFixed(),
                                })
                            );
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
    }

    toggleFavorite() {
        const service = this.favoritesService;
        this.isFavorite
            ? service.remove(this.currentCity)
            : service.add(this.currentCity);
        this.isFavorite = !this.isFavorite;
    }
}

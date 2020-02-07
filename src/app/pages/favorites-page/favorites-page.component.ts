import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
    favoritesForecasts = [];

    constructor(
        private router: Router,
        public weatherService: WeatherService,
        private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
        this.getFavoritesCurrentWeather();
    }

    async getFavoritesCurrentWeather() {
        const { favorites } = this.favoritesService;
        console.log(favorites, 'favorites');
        
        const favoritesForecasts = await Promise.all(
            favorites.map(favoriteCity =>
                this.weatherService
                    .getCurrentWeather(favoriteCity.key)
                    .toPromise()
            )
        );

        this.favoritesForecasts = favoritesForecasts.map(([forecast], i) => ({
            forecast,
            city: favorites[i],
        }));
    }

    setCurrentCity(city) {
        this.weatherService.setCurrentCity(city);
        this.router.navigateByUrl('/');
    }
}

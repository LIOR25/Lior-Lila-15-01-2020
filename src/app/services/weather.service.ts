import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import City from '../models/City';
import { UtilService } from './util.service';


@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    API_KEY = 'EDoXcIUtqNmGbRlLbqNReSUUtgmnUHt0';
    DEFAULT_LAT = 32.109333;
    DEFAULT_LNG = 34.855499;
    celsius: number;
    currentCity = new BehaviorSubject<City>(null);

    constructor(private http: HttpClient, private utilService: UtilService) {
        this.getCurrentPosition().then(coords =>
            this.setCurrentCityByGeoPosition(coords)
        );
    }

    setCurrentCityByGeoPosition(coords) {
        const { latitude, longitude } = coords;
        this.getGeoPosition(latitude, longitude).subscribe(response => {
            this.setCurrentCity({
                key: response.Key,
                name: response.LocalizedName,
                country: response.Country.LocalizedName,
            });
        });
    }

    toCelsius(fahrenheit: number) {
        this.celsius = ((fahrenheit - 32) * 5) / 9;
        return this.celsius.toFixed();
    }

    toIconUrl(iconIndex) {
        iconIndex = iconIndex.toString().padStart(2, '0');
        return `//developer.accuweather.com/sites/default/files/${iconIndex}-s.png`;
    }

    setCurrentCity(currentCity) {
        this.currentCity.next(currentCity);
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position.coords),
                    () =>
                        resolve({
                            latitude: this.DEFAULT_LAT,
                            longitude: this.DEFAULT_LNG,
                        })
                );
            } else {
                resolve({
                    latitude: this.DEFAULT_LAT,
                    longitude: this.DEFAULT_LNG,
                });
            }
        });
    }

    getGeoPosition(lat: number, lng: number): Observable<any> {
        const GeoPositionUrl = `//dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.API_KEY}&q=${lat},${lng}`;
        return this.http.get(GeoPositionUrl);
    }

    getAutocomplete(text: string): Observable<any> {
        const AutocompleteUrl = `//dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${text}`;
        return this.http
            .get(AutocompleteUrl)
            .pipe(retry(1), catchError(this.utilService.handleError));
    }

    get5DaysOfForecasts(key: number): Observable<any> {
        const DaysOfForecasts = `//dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.API_KEY}`;
        return this.http
            .get(DaysOfForecasts)
            .pipe(retry(1), catchError(this.utilService.handleError));
    }

    getCurrentWeather(locationKey: number): Observable<any> {
        const CurrentWeatherUrl = `//dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.API_KEY}`;
        return this.http.get(CurrentWeatherUrl);
    }
}

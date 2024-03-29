import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather.service';
import { FavoritesService } from './services/favorites.service';
import { StorageService } from './services/storage.service';
import { UtilService } from './services/util.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherPageComponent } from './pages/weather-page/weather-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { CityFilterComponent } from './components/city-filter/city-filter.component';
import { ForecastComponent } from './components/forecast/forecast.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { weatherReducer } from './store/weather.reducer';
import { StoreModule } from '@ngrx/store';
import { from } from 'rxjs';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WeatherPageComponent,
        FavoritesPageComponent,
        CityFilterComponent,
        ForecastComponent,
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        [
            (SweetAlert2Module.forRoot(), BrowserAnimationsModule)
        ],
        StoreModule.forRoot({ weatherState: weatherReducer }),
    ],
    providers: [WeatherService, FavoritesService, StorageService, UtilService],
    bootstrap: [AppComponent],
})
export class AppModule {}

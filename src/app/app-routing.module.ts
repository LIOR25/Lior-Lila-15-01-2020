import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherPageComponent } from './pages/weather-page/weather-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
const routes: Routes = [
    { path: 'home', component: WeatherPageComponent },
    { path: 'favorites', component: FavoritesPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

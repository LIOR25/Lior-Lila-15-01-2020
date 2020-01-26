import { Injectable } from '@angular/core';
import City from '../models/City';
import { StorageService } from './storage.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class FavoritesService {
    favorites: City[];

    constructor(private storageService: StorageService) {
        this.loadFromStorage();
    }

    add(city: City) {
        this.favorites.push(city);
        this.saveToStorage();
        Swal.fire('City added successfuly');
    }

    remove(city: City) {
        const cityIndex = this.favorites.findIndex(c => c.key === city.key);
        this.favorites.splice(cityIndex, 1);
        this.saveToStorage();
        Swal.fire('City removed successfuly');
    }

    isFavorite(city: City): boolean {
        return city && this.favorites.some(c => c.key === city.key);
    }

    saveToStorage() {
        this.storageService.store('Favorites', this.favorites);
    }

    loadFromStorage() {
        this.favorites = this.storageService.load('Favorites') || [];
    }
}

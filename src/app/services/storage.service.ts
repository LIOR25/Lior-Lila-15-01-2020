import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    load(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    store(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

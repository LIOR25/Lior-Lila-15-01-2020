import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'weather-app';
    isLight = true;

    switchMode() {
        this.isLight = !this.isLight;
        let bgColor: string;
        let textColor: string;
        this.isLight ? (bgColor = '#f8fafb') : (bgColor = '#272727');
        this.isLight ? (textColor = '#272727') : (textColor = '#f8fafb');
        document.querySelector('body').style.setProperty('--bg-color', bgColor);
        document
            .querySelector('body')
            .style.setProperty('--text-color', textColor);
    }
}

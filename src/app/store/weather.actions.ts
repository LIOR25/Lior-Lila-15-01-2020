import { Action } from '@ngrx/store';
import { DailyWeather } from '../models/DailyWeather';

export const UPDATE_DAILY_WEATHER = 'UPDATE_DAILY_WEATHER';

export class UpdateDailyWeather implements Action {
    readonly type = UPDATE_DAILY_WEATHER;
    constructor(public payload: DailyWeather) {}
}

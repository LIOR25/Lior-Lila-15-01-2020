import { DailyWeather } from '../models/DailyWeather';
import * as WeatherActions from './weather.actions';

const initialState = {
    dailyWeather: null,
};

export function weatherReducer(
    state = initialState,
    action: WeatherActions.UpdateDailyWeather
) {
    switch (action.type) {
        case WeatherActions.UPDATE_DAILY_WEATHER:
            return {
                ...state,
                dailyWeather: action.payload,
            };
        default:
            return state;
    }
}

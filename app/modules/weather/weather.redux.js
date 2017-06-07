import { createActions, createReducer } from 'reduxsauce';
import { Record, List, fromJS } from 'immutable';


export const { Types: WeatherTypes, Creators: WeatherActions } = createActions({
 getWeather: ['latitude', 'longitude'],
 getWeatherSuccess: ['data'],
 getWeatherFailure: ['error'],
}, { prefix: 'WEATHER_' });

const CampaignRecord = new Record({
 weather: List()
});

export const INITIAL_STATE = new CampaignRecord({});

const getWeatherSuccessHandler = (state, action) => state.set('weather', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
 [WeatherTypes.GET_WEATHER_SUCCESS]: getWeatherSuccessHandler,
});

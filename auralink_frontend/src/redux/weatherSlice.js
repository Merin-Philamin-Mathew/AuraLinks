// src/redux/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/config/apis/axios';

// Async thunk for fetching weather by coordinates
export const fetchWeatherByCoordinates = createAsyncThunk(
  'weather/fetchByCoordinates',
  async ({ lat, lon, locationInfo = {} }, { rejectWithValue }) => {
    try {
      const response = await api.post('api/weather/coordinates/', {
        lat,
        lon,
        location: locationInfo.location || '',
        address: locationInfo.address || '',
        city: locationInfo.city || ''
      });
      
      if (response.data.success) {
        return {
          weather: response.data.weather,
          forecast: response.data.forecast,
          locationInfo
        };
      }
      return rejectWithValue('Failed to fetch weather data');
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch weather data');
    }
  }
);

// New async thunk for setting current location (without weather data)
export const setCurrentLocation = createAsyncThunk(
  'weather/setCurrentLocation',
  async ({ lat, lon, locationInfo }, { rejectWithValue }) => {
    try {
      const response = await api.post('api/weather/coordinates/', {
        lat,
        lon,
        location: locationInfo.location || '',
        address: locationInfo.address || '',
        city: locationInfo.city || ''
      });
      
      if (response.data.success) {
        return {
          weather: response.data.weather,
          forecast: response.data.forecast,
          locationInfo
        };
      }
      return rejectWithValue('Failed to fetch weather data');
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch weather data');
    }
  }
);

// Async thunk for fetching recent searches
export const fetchRecentSearches = createAsyncThunk(
  'weather/fetchRecentSearches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('api/weather/recent/');
      if (response.data.success) {
        return response.data.searches;
      }
      return rejectWithValue('Failed to fetch recent searches');
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch recent searches');
    }
  }
);

const initialState = {
  currentWeather: null,  // Weather data from API
  forecast: null,
  selectedLocation: null, // Selected location for weather search
  currentLocation: null,  // User's current location (no weather data)
  recentSearches: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastUpdated: null,
  locationStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.selectedLocation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWeatherByCoordinates
      .addCase(fetchWeatherByCoordinates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCoordinates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload.weather;
        state.forecast = action.payload.forecast;
        state.selectedLocation = {
          ...action.payload.locationInfo,
          lat: action.payload.weather.coord.lat,
          lon: action.payload.weather.coord.lon,
          city: action.payload.weather.name || action.payload.locationInfo.city
        };
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchWeatherByCoordinates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle setCurrentLocation
      .addCase(setCurrentLocation.pending, (state) => {
        state.locationStatus = 'loading';
      })
      .addCase(setCurrentLocation.fulfilled, (state, action) => {
        state.locationStatus = 'succeeded';
        state.currentLocation = {
          lat: action.payload.lat,
          lon: action.payload.lon,
          ...action.payload.locationInfo
        };
      })
      .addCase(setCurrentLocation.rejected, (state, action) => {
        state.locationStatus = 'failed';
        state.error = action.payload;
      })
      // Handle fetchRecentSearches
      .addCase(fetchRecentSearches.fulfilled, (state, action) => {
        state.recentSearches = action.payload;
      });
  }
});

export const { setSelectedLocation, clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
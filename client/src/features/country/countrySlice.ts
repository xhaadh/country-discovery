import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { 
  fetchCountries, 
  fetchCountryByCode,
  fetchCountriesByRegion,
  searchCountries
} from './countryService';

export interface Country {
  cca3: string;
  name: { common: string; official: string };
  flags: { png: string; svg: string };
  region: string;
  subregion: string;
  population: number;
  capital: string[];
  timezones: string[];
  languages: { [key: string]: string };
  area: number;
  latlng: [number, number];
}

interface CountryState {
  list: Country[];
  currentCountry: Country | null;
  comparedCountries: Country[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
  page: number;
  limit: number;
  filters: {
    region: string;
    timezone: string;
    searchQuery: string;
  };
}

const initialState: CountryState = {
  list: [],
  currentCountry: null,
  comparedCountries: [],
  status: 'idle',
  error: null,
  hasMore: true,
  page: 1,
  limit: 20,
  filters: {
    region: '',
    timezone: '',
    searchQuery: ''
  }
};

export const loadCountries = createAsyncThunk(
  'countries/load',
  async (params: any, { getState }) => {
    const state = getState() as RootState;
    const { page, limit, filters } = state.country;
    
    // Use params if provided, otherwise use state values
    const actualParams = params || {
      page,
      limit,
      region: filters.region,
      timezone: filters.timezone,
      name: filters.searchQuery
    };
    
    return await fetchCountries(actualParams);
  }
);

export const getCountry = createAsyncThunk(
  'countries/get',
  async (code: string) => {
    return await fetchCountryByCode(code);
  }
);

export const getCountriesByRegion = createAsyncThunk(
  'countries/byRegion',
  async (region: string, { getState }) => {
    const state = getState() as RootState;
    const { page, limit } = state.country;
    return await fetchCountriesByRegion(region, { page, limit });
  }
);

export const searchCountriesByName = createAsyncThunk(
  'countries/search',
  async (query: string, { getState }) => {
    const state = getState() as RootState;
    const { page, limit } = state.country;
    return await searchCountries({ name: query, page, limit });
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.filters.region = action.payload;
      state.page = 1;
      state.list = [];
      state.hasMore = true;
    },
    setTimezoneFilter: (state, action: PayloadAction<string>) => {
      state.filters.timezone = action.payload;
      state.page = 1;
      state.list = [];
      state.hasMore = true;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.page = 1;
      state.list = [];
      state.hasMore = true;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetCountry: (state) => {
      state.currentCountry = null;
    },
    addToComparison: (state, action: PayloadAction<Country>) => {
      if (state.comparedCountries.length < 2) {
        if (!state.comparedCountries.some(c => c.cca3 === action.payload.cca3)) {
          state.comparedCountries.push(action.payload);
        }
      }
    },
    removeFromComparison: (state, action: PayloadAction<string>) => {
      state.comparedCountries = state.comparedCountries.filter(
        country => country.cca3 !== action.payload
      );
    },
    clearComparison: (state) => {
      state.comparedCountries = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Create a Set of existing country codes
      const existingCodes = new Set(state.list.map(c => c.cca3));

      // Filter out duplicates from new items
      const newItems = action.payload.items.filter(
        country => !existingCodes.has(country.cca3)
      );

       // Append only new unique countries
      state.list = [...state.list, ...newItems];
      
      // state.hasMore = state.list.length < action.payload.total;
      //   state.list = [...state.list, ...action.payload.items];
      //   state.hasMore = state.list.length < action.payload.total;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load countries';
      })
      .addCase(getCountry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCountry = action.payload;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Country not found';
      })
      .addCase(getCountriesByRegion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountriesByRegion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.items];
        state.hasMore = state.list.length < action.payload.total;
      })
      .addCase(getCountriesByRegion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load countries by region';
      })
      .addCase(searchCountriesByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCountriesByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.items];
        state.hasMore = state.list.length < action.payload.total;
      })
      .addCase(searchCountriesByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Search failed';
      });
  }
});

export const { 
  setRegionFilter, 
  setTimezoneFilter, 
  setSearchQuery, 
  incrementPage,
  resetCountry,
  addToComparison,
  removeFromComparison,
  clearComparison
} = countrySlice.actions;

export default countrySlice.reducer;
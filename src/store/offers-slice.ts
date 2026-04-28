import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../const.ts';
import type { OfferDetails, OfferPreview } from '../types/index.ts';
import {
  fetchNearbyOffers,
  fetchOfferDetails,
  fetchOffers,
  toggleFavoriteStatus,
} from './api-actions.ts';

export type City = typeof CITIES[number];
export type SortType =
  | 'Popular'
  | 'PriceLowToHigh'
  | 'PriceHighToLow'
  | 'TopRated';

export type OffersState = {
  city: City;
  offers: OfferPreview[];
  sortType: SortType;
  loading: boolean;
  error: string | null;
  currentOfferDetails: OfferDetails | null;
  currentOfferDetailsLoading: boolean;
  currentOfferDetailsErrorStatus: number | null;
  nearbyOffers: OfferPreview[];
  nearbyOffersLoading: boolean;
  nearbyOffersError: string | null;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  loading: false,
  error: null,
  currentOfferDetails: null,
  currentOfferDetailsLoading: false,
  currentOfferDetailsErrorStatus: null,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  nearbyOffersError: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load offers';
      })
      .addCase(fetchOfferDetails.pending, (state) => {
        state.currentOfferDetails = null;
        state.currentOfferDetailsLoading = true;
        state.currentOfferDetailsErrorStatus = null;
        state.nearbyOffers = [];
        state.nearbyOffersLoading = false;
        state.nearbyOffersError = null;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.currentOfferDetailsLoading = false;
        state.currentOfferDetails = action.payload;
      })
      .addCase(fetchOfferDetails.rejected, (state, action) => {
        state.currentOfferDetailsLoading = false;
        state.currentOfferDetails = null;
        state.currentOfferDetailsErrorStatus = action.payload ?? null;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.nearbyOffersLoading = true;
        state.nearbyOffersError = null;
        state.nearbyOffers = [];
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffersLoading = false;
        state.nearbyOffers = action.payload.slice(0, 3);
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.nearbyOffersLoading = false;
        state.nearbyOffersError = 'Failed to load nearby offers';
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id
            ? { ...offer, isFavorite: action.payload.isFavorite }
            : offer,
        );

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id
            ? { ...offer, isFavorite: action.payload.isFavorite }
            : offer,
        );

        if (state.currentOfferDetails?.id === action.payload.id) {
          state.currentOfferDetails = {
            ...state.currentOfferDetails,
            isFavorite: action.payload.isFavorite,
          };
        }
      });
  },
});

export const { changeCity, setSortType } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;

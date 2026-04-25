import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const.ts';
import type { OfferPreview } from '../types/index.ts';
import type { RootState } from './index.ts';

const sortOffers = (offers: OfferPreview[], sortType: RootState['offers']['sortType']) => {
  switch (sortType) {
    case 'PriceLowToHigh':
      return [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
    case 'PriceHighToLow':
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
    case 'TopRated':
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
    default:
      return offers;
  }
};

export const selectOffersState = (state: RootState) => state.offers;
export const selectUserState = (state: RootState) => state.user;
export const selectCommentsState = (state: RootState) => state.comments;
export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectCity = (state: RootState) => state.offers.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectSortType = (state: RootState) => state.offers.sortType;
export const selectOffersLoading = (state: RootState) => state.offers.loading;
export const selectOffersError = (state: RootState) => state.offers.error;
export const selectCurrentOfferDetails = (state: RootState) => state.offers.currentOfferDetails;
export const selectCurrentOfferDetailsLoading = (state: RootState) =>
  state.offers.currentOfferDetailsLoading;
export const selectCurrentOfferDetailsErrorStatus = (state: RootState) =>
  state.offers.currentOfferDetailsErrorStatus;
export const selectNearbyOffers = (state: RootState) => state.offers.nearbyOffers;
export const selectNearbyOffersError = (state: RootState) => state.offers.nearbyOffersError;

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectIsAuthorized = createSelector(
  [selectAuthorizationStatus],
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.Auth,
);

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsCount = createSelector(
  [selectComments],
  (comments) => comments.length,
);
export const selectSortedComments = createSelector([selectComments], (comments) =>
  [...comments]
    .sort((firstComment, secondComment) => new Date(secondComment.date).getTime() - new Date(firstComment.date).getTime())
    .slice(0, 10),
);

export const selectCurrentCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city),
);

export const selectSortedCurrentCityOffers = createSelector(
  [selectCurrentCityOffers, selectSortType],
  (offers, sortType) => sortOffers(offers, sortType),
);

export const selectCurrentCityData = createSelector(
  [selectCurrentCityOffers],
  (offers) => offers[0]?.city ?? null,
);

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length,
);
export const selectGroupedFavorites = createSelector([selectFavorites], (favorites) =>
  favorites.reduce<Record<string, OfferPreview[]>>((groupedFavorites, offer) => {
    const cityName = offer.city.name;

    if (!groupedFavorites[cityName]) {
      groupedFavorites[cityName] = [];
    }

    groupedFavorites[cityName].push(offer);

    return groupedFavorites;
  }, {}),
);
export const selectIsOfferUpdating = (state: RootState, offerId: string) =>
  state.favorites.updatingOfferIds.includes(offerId);

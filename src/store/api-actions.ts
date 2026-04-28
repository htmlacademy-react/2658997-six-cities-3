import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { OfferDetails, OfferPreview, Review } from '../types/index.ts';
import {api, APIRoute, saveToken, dropToken} from './api.ts';

type AuthData = {
  token: string;
  email: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type FetchOfferDetailsThunkConfig = {
  rejectValue: number | null;
};

type FavoriteStatus = 0 | 1;

type ToggleFavoriteStatusPayload = {
  offerId: string;
  status: FavoriteStatus;
};

type AddCommentPayload = {
  offerId: string;
  comment: string;
  rating: number;
};

const FAVORITE_ENABLED_STATUS: FavoriteStatus = 1;

export const fetchOffers = createAsyncThunk<OfferPreview[], void>(
  'offers/fetchOffers',
  async () => {
    const response = await api.get<OfferPreview[]>(APIRoute.Offers);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk<AuthData, void>(
  'user/checkAuth',
  async () => {
    const response = await api.get<AuthData>(APIRoute.Login);
    saveToken(response.data.token);
    return response.data;
  }
);

export const login = createAsyncThunk<AuthData, LoginPayload>(
  'user/login',
  async ({email, password}) => {
    const response = await api.post<AuthData>(APIRoute.Login, {email, password});
    saveToken(response.data.token);
    return response.data;
  }
);

export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async () => {
    try {
      await api.post(APIRoute.Logout);
    } catch {
      // no-op: local session must be terminated even if server logout fails
    } finally {
      dropToken();
    }
  }
);

export const fetchOfferDetails = createAsyncThunk<
  OfferDetails,
  string,
  FetchOfferDetailsThunkConfig
>(
  'offers/fetchOfferDetails',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferDetails>(`${APIRoute.Offers}/${offerId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.status ?? null);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<OfferPreview[], string>(
  'offers/fetchNearbyOffers',
  async (offerId) => {
    const response = await api.get<OfferPreview[]>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );
    return response.data;
  }
);

export const fetchFavorites = createAsyncThunk<OfferPreview[], void>(
  'favorites/fetchFavorites',
  async () => {
    const response = await api.get<OfferPreview[]>(APIRoute.Favorites);
    return response.data;
  }
);

export const toggleFavoriteStatus = createAsyncThunk<
  OfferDetails,
  ToggleFavoriteStatusPayload
>(
  'favorites/toggleFavoriteStatus',
  async ({offerId, status}, {dispatch}) => {
    const response = await api.post<OfferDetails>(`${APIRoute.Favorites}/${offerId}/${status}`);

    if (status === FAVORITE_ENABLED_STATUS) {
      await dispatch(fetchFavorites());
    }

    return response.data;
  }
);

export const fetchComments = createAsyncThunk<Review[], string>(
  'comments/fetchComments',
  async (offerId) => {
    const response = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk<Review, AddCommentPayload>(
  'comments/addComment',
  async ({offerId, comment, rating}) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return response.data;
  }
);

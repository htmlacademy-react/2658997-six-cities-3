import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferPreview} from '../types/offer.ts';
import {api, APIRoute, saveToken, dropToken} from './api.ts';

export const fetchOffers = createAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchOffers',
  async () => {
    const response = await api.get<OfferPreview[]>(APIRoute.Offers);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk<{token: string; email: string}, undefined>(
  'user/checkAuth',
  async () => {
    const response = await api.get<{token: string; email: string}>(APIRoute.Login);
    saveToken(response.data.token);
    return response.data;
  }
);

export const login = createAsyncThunk<{token: string; email: string}, {email: string; password: string}>(
  'user/login',
  async ({email, password}) => {
    const response = await api.post<{token: string; email: string}>(APIRoute.Login, {email, password});
    saveToken(response.data.token);
    return response.data;
  }
);

export const logout = createAsyncThunk<void, undefined>(
  'user/logout',
  async () => {
    await api.post(APIRoute.Logout);
    dropToken();
  }
);

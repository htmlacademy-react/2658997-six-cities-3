import {configureStore} from '@reduxjs/toolkit';
import {offersReducer, userReducer} from './reducer.ts';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

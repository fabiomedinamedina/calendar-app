import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui';
import { calendarSlice } from './calendar';
import { authSlice } from './auth';
import { getEnvVariables } from '../helpers/getEnvVariables';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer
  },
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: getEnvVariables().MODE !== 'production',
})

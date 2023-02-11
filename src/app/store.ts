import { configureStore } from '@reduxjs/toolkit';
import userSettingsCardReducer from 'features/userSettingsCard/userSettingsCardSlice';

export const store = configureStore({
  reducer: {
    userSettingsCard: userSettingsCardReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

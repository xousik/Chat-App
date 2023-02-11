import { createSlice } from '@reduxjs/toolkit';

interface UserSettingsCardState {
  isUserSettingsCardOpen: boolean;
  isChangeUserNameCardOpen: boolean;
  isChangeUserImageCardOpen: boolean;
  isChangeUserPasswordCardOpen: boolean;
  isChangeThemeCardOpen: boolean;
  isChangeUsersNicknamesCardOpen: boolean;
}

const initialState: UserSettingsCardState = {
  isUserSettingsCardOpen: false,
  isChangeUserNameCardOpen: false,
  isChangeUserImageCardOpen: false,
  isChangeUserPasswordCardOpen: false,
  isChangeThemeCardOpen: false,
  isChangeUsersNicknamesCardOpen: false
};

export const userSettingsCardSlice = createSlice({
  name: 'userSettingsCard',
  initialState: initialState,
  reducers: {
    openUserSettingsCard(state) {
      state.isUserSettingsCardOpen = true;
    },
    closeUserSettingsCard(state) {
      state.isUserSettingsCardOpen = false;
      state.isChangeUserNameCardOpen = false;
      state.isChangeUserImageCardOpen = false;
      state.isChangeUserPasswordCardOpen = false;
      state.isChangeThemeCardOpen = false;
      state.isChangeUsersNicknamesCardOpen = false;
    },
    openUserNameCard(state) {
      state.isChangeUserNameCardOpen = true;
      state.isChangeUserImageCardOpen = false;
      state.isChangeUserPasswordCardOpen = false;
    },
    closeUserNameCard(state) {
      state.isChangeUserNameCardOpen = false;
    },
    openUserImageCard(state) {
      state.isChangeUserNameCardOpen = false;
      state.isChangeUserImageCardOpen = true;
      state.isChangeUserPasswordCardOpen = false;
    },
    closeUserImageCard(state) {
      state.isChangeUserImageCardOpen = false;
    },
    openUserPasswordCard(state) {
      state.isChangeUserNameCardOpen = false;
      state.isChangeUserImageCardOpen = false;
      state.isChangeUserPasswordCardOpen = true;
    },
    closeUserPasswordCard(state) {
      state.isChangeUserPasswordCardOpen = false;
    },
    openChangeThemeCard(state) {
      state.isChangeThemeCardOpen = true;
      state.isChangeUsersNicknamesCardOpen = false;
    },
    closeChangeThemeCard(state) {
      state.isChangeThemeCardOpen = false;
    },
    openChangeUsersNicknamesCard(state) {
      state.isChangeUsersNicknamesCardOpen = true;
      state.isChangeThemeCardOpen = false;
    },
    closeChangeUsersNicknamesCard(state) {
      state.isChangeUsersNicknamesCardOpen = false;
    }
  }
});

export const {
  openUserSettingsCard,
  closeUserSettingsCard,
  openUserNameCard,
  closeUserNameCard,
  openUserImageCard,
  closeUserImageCard,
  openUserPasswordCard,
  closeUserPasswordCard,
  openChangeThemeCard,
  closeChangeThemeCard,
  openChangeUsersNicknamesCard,
  closeChangeUsersNicknamesCard
} = userSettingsCardSlice.actions;

export default userSettingsCardSlice.reducer;

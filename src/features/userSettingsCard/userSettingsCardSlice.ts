import { createSlice } from '@reduxjs/toolkit';

interface UserSettingsCardState {
  [key: string]: boolean;
}

const initialState: UserSettingsCardState = {
  isVisible: false,
  isUserSettingsCardOpen: false,
  isChangeUserNameCardOpen: false,
  isChangeUserImageCardOpen: false,
  isChangeUserPasswordCardOpen: false,
  isChangeThemeCardOpen: false,
  isChangeUsersNicknamesCardOpen: false,
  isDeleteChatCardOpen: false
};

export const userSettingsCardSlice = createSlice({
  name: 'userSettingsCard',
  initialState: initialState,
  reducers: {
    handleVisible(state) {
      state.isVisible = false;
    },
    openUserSettingsCard(state) {
      state.isUserSettingsCardOpen = true;
      state.isVisible = true;
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
      state.isChangeUserImageCardOpen = false;
      state.isChangeUserPasswordCardOpen = false;
      state.isChangeUserNameCardOpen = true;
    },
    closeUserNameCard(state) {
      state.isChangeUserNameCardOpen = false;
    },
    openUserImageCard(state) {
      state.isChangeUserNameCardOpen = false;
      state.isChangeUserPasswordCardOpen = false;
      state.isChangeUserImageCardOpen = true;
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
      state.isChangeUsersNicknamesCardOpen = false;
      state.isDeleteChatCardOpen = false;
      state.isChangeThemeCardOpen = true;
    },
    closeChangeThemeCard(state) {
      state.isChangeThemeCardOpen = false;
    },
    openChangeUsersNicknamesCard(state) {
      state.isChangeThemeCardOpen = false;
      state.isDeleteChatCardOpen = false;
      state.isChangeUsersNicknamesCardOpen = true;
    },
    closeChangeUsersNicknamesCard(state) {
      state.isChangeUsersNicknamesCardOpen = false;
    },
    openDeleteChatCard(state) {
      state.isChangeThemeCardOpen = false;
      state.isChangeUsersNicknamesCardOpen = false;
      state.isDeleteChatCardOpen = true;
    },
    closeDeleteChatCard(state) {
      state.isDeleteChatCardOpen = false;
    }
  }
});

export const {
  handleVisible,
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
  closeChangeUsersNicknamesCard,
  openDeleteChatCard,
  closeDeleteChatCard
} = userSettingsCardSlice.actions;

export default userSettingsCardSlice.reducer;

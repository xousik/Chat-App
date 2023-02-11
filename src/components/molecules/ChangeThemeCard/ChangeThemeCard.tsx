import React from 'react';
import {
  Wrapper,
  ChangeThemeCardTitle,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeThemeCard.styles';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { closeChangeThemeCard } from 'features/userSettingsCard/userSettingsCardSlice';

const ChangeThemeCard = () => {
  const isOpen = useAppSelector((state) => state.userSettingsCard.isChangeThemeCardOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeChangeThemeCard());
  };

  return (
    <Wrapper isChangeThemeCardOpen={isOpen}>
      <ChangeThemeCardTitle>Change Theme</ChangeThemeCardTitle>
      <InnerWrapper>
        <div onClick={handleClose}>Cancel</div>
        <HorizontalLine />
        <VerticalLine />
        <div>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeThemeCard;

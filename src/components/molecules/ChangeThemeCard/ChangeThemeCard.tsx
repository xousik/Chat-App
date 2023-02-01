import React from 'react';
import {
  Wrapper,
  ChangeThemeCardTitle,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeThemeCard.styles';

interface IChangeThemeCard {
  isChangeThemeCardOpen: boolean;
  setIsChangeThemeCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeThemeCard = ({ isChangeThemeCardOpen, setIsChangeThemeCardOpen }: IChangeThemeCard) => {
  return (
    <Wrapper isChangeThemeCardOpen={isChangeThemeCardOpen}>
      <ChangeThemeCardTitle>Change Theme</ChangeThemeCardTitle>
      <InnerWrapper>
        <div
          onClick={() => {
            setIsChangeThemeCardOpen(false);
          }}
        >
          Cancel
        </div>
        <HorizontalLine />
        <VerticalLine />
        <div>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeThemeCard;

import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { ISettingsCard } from './UserSettingsCard';

export const Wrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  /* display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; */
  /* transition: display 1s; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: ${({ isOpen }) => (isOpen ? '0' : '100%')};
  transition: top 0.3s ease-in-out;
  z-index: 9999;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  position: absolute;
  height: 25px;
  width: 50px;
  right: 0;
  margin: 15px 15px 0 0;
  background-color: ${({ theme }) => theme.colors.gray};
  border: none;
  color: ${({ theme }) => theme.colors.darkBrown};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const StyledUserImage = styled(UserImage)`
  width: 100px;
  height: 100px;
  margin-top: 50px;
  margin-bottom: -310px;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    margin-bottom: -200px;
  }

  @media (min-width: 480px) and (max-width: 700px) {
    margin-bottom: -230px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: -50px;
  }
`;

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 400px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.beige};
  margin-bottom: 30px;

  hr {
    width: 90%;
    border: 1px solid ${({ theme }) => theme.colors.darkBrown};
    opacity: 0.7;
  }
`;

export const Option = styled.span<ISettingsCard>`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  margin: 10px 0;

  &:nth-child(5) {
    color: ${({ theme, areChatSettings }) => areChatSettings && theme.colors.darkRed};
  }

  &:nth-child(1) {
    color: ${({ theme }) => theme.colors.darkGray};
    pointer-events: none;
  }
`;

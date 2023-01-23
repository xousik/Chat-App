import styled from 'styled-components';
import { UserName } from 'components/atoms/UserName/UserName';
import { UserImage } from 'components/atoms/UserImage/UserImage';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.beige};
  border-radius: 0 0 20px 20px;

  span {
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.darkBrown};
  }
`;

export const StyledUserImage = styled(UserImage)`
  margin: 0 10px;
`;

export const StyledUserName = styled(UserName)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.darkBrown};
`;

export const Logout = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-right: 10px;
  background: none;
  border: none;

  img {
    width: 25px;
    height: 25px;
    font-weight: bold;
  }

  span {
    line-height: 25px;
    color: ${({ theme }) => theme.colors.darkBrown};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

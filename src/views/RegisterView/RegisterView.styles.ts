import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import { Input } from 'components/atoms/Input/Input';

export const OuterWrapper = styled.div<{ windowHeight: number }>`
  height: ${({ windowHeight }) => windowHeight}px;
  width: 100vw;
  img {
    width: 100vw;
    height: 100%;
    position: absolute;
    z-index: -99999;
  }

  @media (min-width: 1250px) {
    display: flex;

    img {
      width: 50vw;
      height: auto;
      position: relative;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: hsla(100%, 100%, 100% 0.5);
    backdrop-filter: blur(7px);
    z-index: -99999;
  }

  @media (min-width: 1250px) {
    position: relative;
    width: 60vw;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightGray};

    span {
      font-size: ${({ theme }) => theme.fontSize.s};
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      width: 20px;
      height: 100%;
      border: 10px solid rgba(128, 128, 128, 0.7);
      filter: blur(5px);
      z-index: 0;
      backdrop-filter: none;
    }
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 80px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 25px;
  }
`;

export const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

export const StyledButton = styled(Button)`
  margin-top: 25px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: inset 0px 0px 12px px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);

  @media (min-width: 1250px) {
    width: 200px;
    height: 60px;
    font-size: ${({ theme }) => theme.fontSize.l};
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 0px 12px 5px rgba(0, 0, 0, 0.3);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const StyledFileLabel = styled.label`
  margin-top: 15px;
  display: flex;
  align-items: center;
  column-gap: 10px;

  svg {
    width: 50px;
    height: 50px;
  }

  span {
    text-align: center;
    width: 125px;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export const StyledFileInput = styled.input`
  display: none;
`;

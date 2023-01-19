import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';
import { Button } from 'components/atoms/Button/Button';

export const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -99999;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;

    img {
      height: 90vh;
    }
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(5px);

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100vh;
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
    }

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      width: 20px;
      height: 100vh;
      border: 10px solid rgba(128, 128, 128, 0.7);
      filter: blur(5px);
      z-index: 0;
      backdrop-filter: none;
    }
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 100px;
  }
`;

export const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  margin-top: 45px;
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

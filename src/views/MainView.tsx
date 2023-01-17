import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/atoms/Button/Button';
import { Title } from 'components/atoms/Title/Title';
import styled from 'styled-components';
import background from 'assets/images/background.jpg';

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }

  @media (min-width: 1250px) {
    display: flex;
    height: 100vh;

    img {
      width: 50vw;
      height: auto;
      position: relative;
    }
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};

  span {
    cursor: pointer;
    margin-top: 2%;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.dark};
    text-decoration: underline;
    z-index: 999;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 310px;
    border-bottom: 15px solid rgba(114, 114, 114, 0.8);
    filter: blur(5px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 305px;
    background: rgba(255, 255, 255, 0.4);
    filter: blur(5px);
    backdrop-filter: blur(10px);
  }

  @media (min-width: 1250px) {
    position: relative;
    width: 60vw;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightGrey};

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
    }
    &::after {
      display: none;
    }
  }
`;

const StyledTitle = styled(Title)`
  z-index: 999;
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
  z-index: 999;

  @media (min-width: 1250px) {
    margin-top: 200px;
    width: 250px;
    height: 100px;
    font-size: ${({ theme }) => theme.fontSize.l};
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 0px 12px 5px rgba(0, 0, 0, 0.3);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const MainView = () => {
  const navigate = useNavigate();
  return (
    <OuterWrapper>
      <img src={background} alt="background-cat" />
      <MainWrapper>
        <StyledTitle>Welcome to Lulu's Chat App</StyledTitle>
        <StyledButton onClick={() => navigate('/login')}>Login with Email</StyledButton>
        <span onClick={() => navigate('/register')}>New User? Sign Up</span>
      </MainWrapper>
    </OuterWrapper>
  );
};

export default MainView;

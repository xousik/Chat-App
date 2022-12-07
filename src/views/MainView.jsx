import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/atoms/Button/Button';
import { Title } from 'components/atoms/Title/Title';
import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */

  span {
    margin-top: 1%;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.dark};
    /* text-decoration: underline; */
  }
`;

const StyledTitle = styled(Title)``;

const StyledButton = styled(Button)`
  margin-top: 15%;
`;

const MainView = () => {
  const navigate = useNavigate();
  return (
    <MainWrapper>
      <StyledTitle>Welcome in Lulu's Chat App</StyledTitle>
      <StyledButton onClick={() => navigate('/login')}>Login with Email</StyledButton>
      <span onClick={() => navigate('/register')}>New User? Sign Up</span>
    </MainWrapper>
  );
};

export default MainView;

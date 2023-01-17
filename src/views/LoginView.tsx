import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { Title } from 'components/atoms/Title/Title';
import { Label } from 'components/atoms/Label/Label';
import { Input } from 'components/atoms/Input/Input';
import { Button } from 'components/atoms/Button/Button';
import background from 'assets/images/background.jpg';

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -99999;
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

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(5px);
  /* Note: backdrop-filter has minimal browser support */

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 90vh;
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

const StyledTitle = styled(Title)`
  margin-top: 40px;
`;

const StyledForm = styled.form`
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const StyledLabel = styled(Label)`
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledButton = styled(Button)`
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

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OuterWrapper>
      <img src={background} alt="background-cat" />
      <Wrapper>
        <StyledTitle>Welcome to Lulu's Chat App</StyledTitle>
        <StyledForm onSubmit={handleLogIn}>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type="submit">Log in</StyledButton>
        </StyledForm>
      </Wrapper>
    </OuterWrapper>
  );
};

export default LoginView;

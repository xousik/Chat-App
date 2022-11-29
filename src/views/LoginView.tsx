import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled.h1`
  width: 60%;
  text-align: center;
  line-height: 35px;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: bold;
  position: absolute;
  top: 7%;
`;

const StyledInput = styled.input`
  margin: 10px 0 30px 0;
  padding: 20px 10px;
  border: 2px solid black;
  border-radius: 10px;
  height: 4%;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
`;

const StyledButton = styled.button`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
  border: 2px solid black;
  border-radius: 10px;
`;

const StyledRegisterInfo = styled.span`
  bottom: 25%;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
  text-align: center;

  p {
    margin-top: 50px;
  }
`;

const StyledRegister = styled(StyledButton)`
  border: none;
  text-decoration: none;
  color: darkred;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.xl};
  border-bottom: 1px solid black;
  border-top: 1px solid black;
`;

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  return (
    <Wrapper>
      <StyledHeading>Welcome in Lulu's Chat App</StyledHeading>
      <StyledLabel htmlFor="username">Username</StyledLabel>
      <StyledInput
        type="text"
        id="username"
        name="username"
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
      <StyledButton onClick={() => auth.handleLogIn({ email, password })}>Log in</StyledButton>
      <StyledRegisterInfo>
        <p>If you dont have account click:</p> <br />
        <StyledRegister as={Link} to="/register">
          Register
        </StyledRegister>
      </StyledRegisterInfo>
    </Wrapper>
  );
};

export default LoginView;

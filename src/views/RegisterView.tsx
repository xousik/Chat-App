import React, { useState } from 'react';
import styled from 'styled-components';
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

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  return (
    <Wrapper>
      <StyledHeading>Create your account</StyledHeading>
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <StyledButton onClick={() => auth.handleRegister({ email, password })}>Register</StyledButton>
    </Wrapper>
  );
};

export default RegisterView;

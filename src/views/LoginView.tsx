import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
`;

const StyledHeading = styled.h1`
  width: 390px;
  text-align: center;
  line-height: 35px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  position: absolute;
  top: 7%;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  const navigate = useNavigate();

  const handleLogIn = async (e: any) => {
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
    <Wrapper>
      <StyledHeading>Welcome in Lulu's Chat App</StyledHeading>
      <StyledForm onSubmit={handleLogIn}>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
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

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { Title } from 'components/atoms/Title/Title';
import { Label } from 'components/atoms/Label/Label';
import { OuterWrapper, Wrapper, StyledForm, StyledInput, StyledButton } from './LoginView.styles';
import background from 'assets/images/background.jpg';

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
        <Title>Welcome to Lulu's Chat App</Title>
        <StyledForm onSubmit={handleLogIn}>
          <Label htmlFor="email">Email</Label>
          <StyledInput
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
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

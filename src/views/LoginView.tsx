import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { Title } from 'components/atoms/Title/Title';
import { Label } from 'components/atoms/Label/Label';
import { OuterWrapper, Wrapper, StyledForm, StyledInput, StyledButton } from './LoginView.styles';
import background from 'assets/images/background.jpg';
import { useErrorContext } from 'context/ErrorContext';
import { IErrorContext } from 'views/RegisterView';
import ErrorMessage from 'components/molecules/ErrorMessage/ErrorMessage';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { error, handleError }: IErrorContext = useErrorContext();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !handleError) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      handleError('Invalid email or password');
      setEmail('');
      setPassword('');
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
        {error && <ErrorMessage isLogin message={error} />}
      </Wrapper>
    </OuterWrapper>
  );
};

export default LoginView;

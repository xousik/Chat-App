import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { Title } from 'components/atoms/Title/Title';
import { Label } from 'components/atoms/Label/Label';
import { OuterWrapper, Wrapper, StyledForm, StyledInput, StyledButton } from './LoginView.styles';
import background from 'assets/images/background.jpg';
import { useErrorContext } from 'context/ErrorContext';
import { IErrorContext } from 'views/RegisterView/RegisterView';
import ErrorMessage from 'components/molecules/ErrorMessage/ErrorMessage';

const LoginView = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { error, handleError }: IErrorContext = useErrorContext();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current || !handleError) return;
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      handleError('Invalid email or password');
      emailRef.current.value = '';
      passwordRef.current.value = '';
    }
  };

  return (
    <OuterWrapper>
      <img src={background} alt="background-cat" />
      <Wrapper>
        <Title>Welcome to Lulu's Chat App</Title>
        <StyledForm onSubmit={handleLogIn}>
          <Label htmlFor="email">Email</Label>
          <StyledInput ref={emailRef} autoComplete="off" type="email" id="email" name="email" />
          <Label htmlFor="password">Password</Label>
          <StyledInput ref={passwordRef} type="password" id="password" name="password" />
          <StyledButton type="submit">Log in</StyledButton>
        </StyledForm>
        {error && <ErrorMessage isLogin message={error} />}
      </Wrapper>
    </OuterWrapper>
  );
};

export default LoginView;

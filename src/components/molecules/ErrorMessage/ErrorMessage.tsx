import React from 'react';
import { Title } from 'components/atoms/Title/Title';
import { Wrapper, LoginWrapper } from './ErrorMessage.styles';

const defaultErrorMessage = 'Something went wrong. Please try again, or contact our support';

interface IErrorMessage {
  message: string;
  isLogin?: boolean;
}

const ErrorMessage = ({ message = defaultErrorMessage, isLogin }: IErrorMessage) => {
  return (
    <>
      {isLogin ? (
        <LoginWrapper>
          <Title>Oops!</Title>
          <p>{message}</p>
        </LoginWrapper>
      ) : (
        <Wrapper>
          <Title>Oops!</Title>
          <p>{message}</p>
        </Wrapper>
      )}
    </>
  );
};

export default ErrorMessage;

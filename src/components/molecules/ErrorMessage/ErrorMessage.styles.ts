import styled, { keyframes } from 'styled-components';
import { Title } from 'components/atoms/Title/Title';

const shrinkAnimation = keyframes`
  from {
    transform: translateX(-50%) scaleX(1);
  }
  to {
    transform: translateX(-50%) scaleX(0);
  }
`;

const slideAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(300%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  left: 55%;
  bottom: 31%;
  background-color: white;
  padding: 10px;
  color: ${({ theme }) => theme.colors.darkRed};
  border: 2px solid ${({ theme }) => theme.colors.darkRed};
  border-radius: 15px;
  animation: ${slideAnimation} 1s ease-in-out 1 forwards,
    ${slideAnimation} 1s 6.2s ease-in-out 1 reverse forwards;

  ${Title} {
    color: ${({ theme }) => theme.colors.darkRed};
    font-size: ${({ theme }) => theme.fontSize.l};
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin-bottom: 20px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    width: 35%;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.darkRed};
    border-radius: 50px;
  }

  &::before {
    opacity: 0.5;
  }

  &::after {
    transform: translateX(-50%) scaleX(1);
    transform-origin: left;
    animation: ${shrinkAnimation} 5s 1s linear 1 forwards;
  }

  @media (min-width: 320px) and (max-width: 1250px) {
    display: none;
  }

  @media (min-width: 1250px) and (max-width: 1600px) {
    left: 50%;
  }
`;

export const LoginWrapper = styled(Wrapper)`
  left: 50%;
  bottom: 8%;
`;

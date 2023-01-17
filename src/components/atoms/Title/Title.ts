import styled from 'styled-components';

export const Title = styled.h1`
  max-width: 390px;
  margin-top: 18%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  color: ${({ theme }) => theme.colors.dark};

  @media (min-width: 1250px) {
    font-size: ${({ theme }) => theme.fontSize.desktop.xxl};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    max-width: 55vw;
  }
`;

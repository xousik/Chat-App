import styled from 'styled-components';

export const Title = styled.h1`
  width: 390px;
  margin-top: 18%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  color: ${({ theme }) => theme.colors.dark};
`;

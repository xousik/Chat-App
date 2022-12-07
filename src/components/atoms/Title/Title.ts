import styled from 'styled-components';

export const Title = styled.h1`
  width: 390px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.dark};
`;

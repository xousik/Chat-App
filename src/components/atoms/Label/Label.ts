import styled from 'styled-components';

export const Label = styled.label`
  width: 72px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

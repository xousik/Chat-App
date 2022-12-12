import styled from 'styled-components';

export const UserName = styled.h2`
  display: inline-block;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

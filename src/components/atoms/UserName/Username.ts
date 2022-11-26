import styled from 'styled-components';

export const UserName = styled.h2`
  display: inline-block;
  text-align: center;
  color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

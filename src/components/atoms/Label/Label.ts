import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  text-align: center;
`;

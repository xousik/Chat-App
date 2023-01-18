import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.01);
  box-shadow: inset 0px 0px 12px 5px rgba(0, 0, 0, 0.3);
  /* Note: backdrop-filter has minimal browser support */
  backdrop-filter: blur(25px);
  border-radius: 30px;
  border: none;
  color: ${({ theme }) => theme.colors.darkRed};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

import styled from 'styled-components';

export const Input = styled.input`
  width: 272px;
  height: 55px;
  margin: 0 auto;
  padding: 5% 4%;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 2px 2px 4px 2px rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  :focus {
    outline: none;
  }
`;

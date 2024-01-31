import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const StyledInput = styled(Input)`
  display: block;
  margin: 10px auto;
  padding: 15px;
  height: 25px;
  width: 80%;
  border-radius: 50px;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  &:focus {
    outline: none;
  }

  @media (min-width: 1250px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    width: 30%;
  }
`;

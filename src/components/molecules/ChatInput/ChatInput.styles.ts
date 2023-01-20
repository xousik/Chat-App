import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
`;

export const StyledInput = styled.textarea`
  display: block;
  width: 250px;
  min-height: 20px;
  max-height: 120px;
  margin: 0 auto;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: left;
  line-height: 20px;
  word-wrap: break-word;

  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 20px;
    color: ${({ theme }) => theme.colors.darkBrown};
  }

  @media (min-width: 1250px) {
    width: 400px;
  }
`;

export const StyledButton = styled(Button)`
  height: 30px;
  width: 60px;
  padding: 0;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: 5px;
  align-self: flex-end;
`;

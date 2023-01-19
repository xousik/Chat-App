import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1250px) {
    width: 30%;
  }
`;

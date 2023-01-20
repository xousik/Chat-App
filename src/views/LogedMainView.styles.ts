import styled from 'styled-components';

export const OuterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.customBlack};
`;

export const MainWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};

  @media (max-width: 700px) {
    height: 90vh;
    width: 100%;
  }
`;

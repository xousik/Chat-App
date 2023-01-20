import styled from 'styled-components';

export const LeftCatImg = styled.img`
  width: 25%;
  height: 100vh;
`;

export const RightCatImg = styled.img`
  width: 25%;
  height: 100vh;
`;

export const OuterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.customBlack};
  display: flex;
`;

export const MainWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};

  @media (max-width: 700px) {
    height: 90vh;
    width: 100%;
  }
`;

import styled from 'styled-components';

export const LeftSidebarImg = styled.img`
  width: 25%;
  /* left: -240px; */
  height: 100vh;
  display: inline-block;
  position: absolute;
  /* display: none; */
`;

export const RightSidebarImg = styled.img`
  width: 25%;
  /* right: -240px; */
  right: 0;
  height: 100vh;
  display: inline-block;
  position: absolute;
  /* display: none; */
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
  z-index: 9999;

  @media (max-width: 700px) {
    height: 90vh;
    width: 100%;
  }
`;

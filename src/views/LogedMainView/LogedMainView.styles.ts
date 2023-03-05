import styled from 'styled-components';

export const LeftCatImg = styled.img`
  width: 25%;
  height: 100vh;
  @media (min-width: 320px) and (max-width: 1500px) {
    display: none;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    @media (min-width: 700px) {
      display: block;
    }
  }
`;

export const RightCatImg = styled.img`
  width: 25%;
  height: 100vh;
  @media (min-width: 320px) and (max-width: 1500px) {
    display: none;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    @media (min-width: 700px) {
      display: block;
    }
  }
`;

export const OuterWrapper = styled.div<{ windowHeight: number }>`
  width: 100%;
  height: ${({ windowHeight }) => windowHeight}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
`;

export const MainWrapper = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

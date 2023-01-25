import styled from 'styled-components';

export const OuterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;

  /* @media (min-width: 320px) and (max-width: 700px) {
    height: 90vh;
  } */
`;

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray};

  /* @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;
  } */

  @media (max-width: 700px) {
    /* height: 90vh; */
    width: 100%;
  }
`;

export const MessagesWrapper = styled.ul`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

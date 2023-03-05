import styled from 'styled-components';

export const OuterWrapper = styled.div<{ windowHeight: number }>`
  width: 100%;
  height: ${({ windowHeight }) => windowHeight}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray};
  overflow: hidden;

  @media (max-width: 700px) {
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

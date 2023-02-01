import styled from 'styled-components';

export const Wrapper = styled.div<{ isChangeThemeCardOpen: boolean }>`
  width: 90%;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  margin-top: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeThemeCardOpen }) => (isChangeThemeCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

export const ChangeThemeCardTitle = styled.span`
  width: 80%;
  text-align: center;
  margin: 10px auto;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  position: relative;

  div {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    width: 70px;
    text-align: center;

    &:nth-child(4) {
      color: ${({ theme }) => theme.colors.darkRed};
    }
  }
`;

export const HorizontalLine = styled.span`
  position: absolute;
  top: 10px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: 7px;
  }
`;

export const VerticalLine = styled.span`
  position: absolute;
  height: 41px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const Wrapper = styled.div<{ isChangeNicknamesCardOpen: boolean }>`
  width: 90%;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  /* margin-top: 20px; */
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeNicknamesCardOpen }) => (isChangeNicknamesCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const ChangeNicknamesCardTitle = styled.span`
  width: 100%;
  margin: 10px auto 5px auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const StyledInput = styled(Input)`
  padding: 10px 10px;
`;

export const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
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
  top: 5px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: 3px;
  }
`;

export const VerticalLine = styled.span`
  position: absolute;
  height: 41px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

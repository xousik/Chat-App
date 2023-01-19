import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};

  @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;
  }
`;

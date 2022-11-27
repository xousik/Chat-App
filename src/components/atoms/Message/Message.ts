import styled from 'styled-components';

export const Message = styled.div`
  min-width: 15%;
  /* min-height: 5%; */
  padding: 10px;
  margin: 0 5% 5% 5%;
  border-radius: 20px;
  border: 1px solid red;
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
  font-weight: bold;
`;

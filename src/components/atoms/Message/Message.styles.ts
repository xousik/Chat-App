import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';

export const Wrapper = styled.div`
  display: flex;
`;

export const StyledUserImage = styled(UserImage)`
  width: 20px;
  height: 20px;
  margin: 0 0 1px 5px;
  align-self: flex-end;
`;

export const MessageContent = styled.li`
  list-style-type: none;
  min-width: 50px;
  max-width: 300px;
  word-wrap: break-word;
  padding: 5px 10px;
  margin: 1px 5px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: left;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBrown};
`;
export const OwnerMessageContent = styled(MessageContent)`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.beige};
  color: ${({ theme }) => theme.colors.darkBrown};
`;

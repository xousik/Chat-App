import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
`;

const StyledInput = styled.textarea`
  display: block;
  width: 250px;
  min-height: 20px;
  max-height: 120px;
  margin: 0 auto;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: left;
  line-height: 20px;
  word-wrap: break-word;

  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 20px;
  }

  @media (min-width: 1250px) {
    width: 400px;
  }
`;

const StyledButton = styled(Button)`
  height: 30px;
  width: 60px;
  padding: 0;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: 5px;
  align-self: flex-end;
`;

interface ChatInputProps {
  handleSend: () => void;
  user: {
    chatId?: string;
  };
  setText: (text: string) => void;
  text: string;
}

const ChatInput = ({ handleSend, user, setText, text }: ChatInputProps) => {
  //   const [image, setImage] = useState(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = '20px';
    textAreaRef.current.style.height = `${Math.max(textAreaRef.current.scrollHeight, 20)}px`;
  }, [text]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Wrapper>
      <StyledInput
        ref={textAreaRef}
        id="text"
        name="text"
        placeholder="Aa"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleKey(e)}
      ></StyledInput>
      <StyledButton onClick={handleSend}>Send</StyledButton>
    </Wrapper>
  );
};

export default ChatInput;

import React, { useRef, useLayoutEffect } from 'react';
import { Wrapper, StyledInput, StyledButton } from './ChatInput.styles';

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

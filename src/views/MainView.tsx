import { useNavigate } from 'react-router-dom';
import { OuterWrapper, MainWrapper, StyledTitle, StyledButton } from './MainView.styles';
import background from 'assets/images/background.jpg';

const MainView = () => {
  const navigate = useNavigate();
  return (
    <OuterWrapper>
      <img src={background} alt="background-cat" />
      <MainWrapper>
        <StyledTitle>Welcome to Lulu's Chat App</StyledTitle>
        <StyledButton onClick={() => navigate('/login')}>Login with Email</StyledButton>
        <span onClick={() => navigate('/register')}>New User? Sign Up</span>
      </MainWrapper>
    </OuterWrapper>
  );
};

export default MainView;

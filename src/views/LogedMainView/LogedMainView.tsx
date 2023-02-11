import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import SearchResult from 'components/molecules/SearchResult/SearchResult';
import UserChats from 'components/organisms/UserChats/UserChats';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from 'views/ChatView/ChatView';
import { LeftCatImg, RightCatImg, MainWrapper, OuterWrapper } from './LogedMainView.styles';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/molecules/SearchBar/SearchBar';
import catLeft from 'assets/images/catLeft.jpg';
import catRight from 'assets/images/catRight.jpg';
import UserSettingsCard from 'components/organisms/UserSettingsCard/UserSettingsCard';
export interface IUser {
  user?: {
    uid: string;
    email: string;
    displayName: string;
    name: string;
    photoURL: string;
  };
}

const LogedMainView = () => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);

  localStorage.removeItem('currentChatId');
  localStorage.removeItem('nicknames');

  return (
    <>
      {Object.keys(currentUser!).length !== 0 && (
        <OuterWrapper>
          <LeftCatImg src={catLeft} alt="cat" />
          <MainWrapper>
            <UserSettingsCard user={currentUser} />
            <Header handleLogOut={() => signOut(auth)} user={currentUser} hasLogout={true} />
            <SearchBar />
            <SearchResult />
            <UserChats />
          </MainWrapper>
          <RightCatImg src={catRight} alt="cat" />
        </OuterWrapper>
      )}
    </>
  );
};

export default LogedMainView;

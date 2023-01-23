import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, storage, db } from 'FirebaseApp/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

const Wrapper = styled.div<{ isChangeUserImageCardOpen: boolean }>`
  width: 90%;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  margin-top: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeUserImageCardOpen }) => (isChangeUserImageCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const ChangeUserImageCardTitle = styled.span`
  width: 80%;
  text-align: center;
  margin: 10px auto;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StyledFileLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 20px;

  svg {
    width: 40px;
    height: 40px;
  }

  span {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const StyledFileInput = styled.input`
  display: none;
`;

const InnerWrapper = styled.div`
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

const HorizontalLine = styled.span`
  position: absolute;
  top: 10px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: 7px;
  }
`;

const VerticalLine = styled.span`
  position: absolute;
  height: 41px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

interface IChangeUserImageCard {
  user?: {
    photoURL: string;
    displayName: string;
  };
  setIsChangeUserImageCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeUserImageCardOpen: boolean;
}

const ChangeUserImageCard = ({
  user,
  isChangeUserImageCardOpen,
  setIsChangeUserImageCardOpen
}: IChangeUserImageCard) => {
  const [newUserImage, setNewUserImage] = useState<File | Blob | null>(null);

  const updateImage = async () => {
    const user: any = auth.currentUser;
    const docSnap = await getDoc(doc(db, 'userChats', user.uid));
    const storageRef = ref(storage, user.displayName);
    if (!newUserImage) return;
    await uploadBytes(storageRef, newUserImage).then(() => {
      getDownloadURL(storageRef).then(async (url) => {
        await updateProfile(user, {
          photoURL: url
        });
        await updateDoc(doc(db, 'users', user.uid), {
          photoURL: url
        });
        if (docSnap.exists()) {
          Object.entries(docSnap.data()).forEach((chat) => {
            updateDoc(doc(db, 'userChats', chat[1].userInfo.uid), {
              [chat[0] + '.userInfo.photoURL']: url
            });
          });
        }
      });
    });
    setIsChangeUserImageCardOpen(false);
  };

  return (
    <Wrapper isChangeUserImageCardOpen={isChangeUserImageCardOpen}>
      <ChangeUserImageCardTitle>Set your new profile image</ChangeUserImageCardTitle>
      <StyledFileLabel htmlFor="userAvatar">
        <svg
          fill="#000000"
          width="800px"
          height="800px"
          viewBox="0 -1.5 35 35"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>upload1</title>
          <path d="M29.426 15.535c0 0 0.649-8.743-7.361-9.74-6.865-0.701-8.955 5.679-8.955 5.679s-2.067-1.988-4.872-0.364c-2.511 1.55-2.067 4.388-2.067 4.388s-5.576 1.084-5.576 6.768c0.124 5.677 6.054 5.734 6.054 5.734h9.351v-6h-3l5-5 5 5h-3v6h8.467c0 0 5.52 0.006 6.295-5.395 0.369-5.906-5.336-7.070-5.336-7.070z"></path>
        </svg>
        <span>Add image</span>
      </StyledFileLabel>
      <StyledFileInput
        type="file"
        id="userAvatar"
        name="userAvatar"
        onChange={(e) => e.target.files && setNewUserImage(e.target.files[0])}
      />
      <InnerWrapper>
        <div
          onClick={() => {
            setIsChangeUserImageCardOpen(false);
          }}
        >
          Cancel
        </div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateImage}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserImageCard;

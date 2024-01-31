import { useState } from 'react';
import { auth, storage, db } from 'FirebaseApp/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import {
  Wrapper,
  ChangeUserImageCardTitle,
  StyledFileLabel,
  StyledFileInput,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeUserImageCard.styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closeUserImageCard } from 'features/userSettingsCard/userSettingsCardSlice';

interface IChangeUserImageCard {
  user?: {
    photoURL: string;
    displayName: string;
  };
}

const ChangeUserImageCard = ({ user }: IChangeUserImageCard) => {
  const [newUserImage, setNewUserImage] = useState<File | Blob | null>(null);

  const isOpen = useAppSelector((state) => state.userSettingsCard.isChangeUserImageCardOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeUserImageCard());
  };

  const updateImage = async () => {
    const user = auth.currentUser;
    const docSnap = await getDoc(doc(db, 'userChats', user!.uid));

    const storageRef = ref(storage, user!.displayName!);
    if (!newUserImage) return;
    await uploadBytes(storageRef, newUserImage).then(() => {
      getDownloadURL(storageRef).then(async (url) => {
        await updateProfile(user!, {
          photoURL: url
        });
        await updateDoc(doc(db, 'users', user!.uid), {
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
    handleClose();
  };

  return (
    <Wrapper isChangeUserImageCardOpen={isOpen}>
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
        <div onClick={handleClose}>Cancel</div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateImage}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserImageCard;

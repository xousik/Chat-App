import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from 'FirebaseApp/firebase';
import { useNavigate } from 'react-router-dom';
import { Title } from 'components/atoms/Title/Title';
import { Label } from 'components/atoms/Label/Label';
import { Input } from 'components/atoms/Input/Input';
import { Button } from 'components/atoms/Button/Button';
import background from 'assets/images/background.jpg';
import defaultAvatat from 'assets/images/defaultAvatar.png';

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -99999;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;

    img {
      height: 90vh;
    }
  }

  @media (min-width: 1250px) {
    display: flex;

    img {
      width: 50vw;
      height: auto;
      position: relative;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    background-color: hsla(100%, 100%, 100% 0.5);
    backdrop-filter: blur(7px);
    z-index: -99999;
  }

  @media (min-width: 1250px) {
    position: relative;
    width: 60vw;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightGray};

    span {
      font-size: ${({ theme }) => theme.fontSize.s};
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      width: 20px;
      height: 100vh;
      border: 10px solid rgba(128, 128, 128, 0.7);
      filter: blur(5px);
      z-index: 0;
      backdrop-filter: none;
    }
  }
`;

const StyledForm = styled.form`
  width: 100%;
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 80px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  margin-top: 25px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: inset 0px 0px 12px px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);

  @media (min-width: 1250px) {
    width: 200px;
    height: 60px;
    font-size: ${({ theme }) => theme.fontSize.l};
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0px 0px 12px 5px rgba(0, 0, 0, 0.3);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const StyledFileLabel = styled.label`
  margin-top: 15px;
  display: flex;
  align-items: center;
  column-gap: 10px;

  svg {
    width: 50px;
    height: 50px;
  }

  span {
    text-align: center;
    width: 125px;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const StyledFileInput = styled.input`
  display: none;
`;

const RegisterView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | Blob | null>(null);
  const navigate = useNavigate();

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //TODO: Create unique user name for example with adding date to username

      const storageRef = ref(storage, name);

      if (!image) {
        await updateProfile(res.user, {
          displayName: name,
          photoURL: defaultAvatat
        });
        setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          name: name,
          email: email,
          photoURL: defaultAvatat
        });
        setDoc(doc(db, 'userChats', res.user.uid), {});
        navigate('/');
      } else {
        await uploadBytes(storageRef, image).then(() => {
          getDownloadURL(storageRef).then(async (url) => {
            console.log(url);
            await updateProfile(res.user, {
              displayName: name,
              photoURL: url
            });
            setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              name: name,
              email: email,
              photoURL: url
            });
            setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OuterWrapper>
      <img src={background} alt="background-cat" />
      <Wrapper>
        <Title>Welcome to Lulu's Chat App</Title>
        <StyledForm onSubmit={handleRegister}>
          <Label htmlFor="name">Name</Label>
          <StyledInput
            autoComplete="off"
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="email">Email</Label>
          <StyledInput
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            <span>Add profile img</span>
          </StyledFileLabel>
          <StyledFileInput
            type="file"
            id="userAvatar"
            name="userAvatar"
            onChange={(e) => handleSetImage(e)}
          />
          <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
      </Wrapper>
    </OuterWrapper>
  );
};

export default RegisterView;

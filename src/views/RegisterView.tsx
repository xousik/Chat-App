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

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: url('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  backdrop-filter: blur(5px);
  /* Note: backdrop-filter has minimal browser support */

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 90vh;
    top: 0;
    background-color: hsla(100%, 100%, 100% 0.5);
    backdrop-filter: blur(7px);
    z-index: -99999;
  }
`;

const StyledTitle = styled(Title)`
  margin-top: 10%;
`;

const StyledForm = styled.form`
  width: 100%;
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 5%;
`;

const StyledLabel = styled(Label)``;

const StyledButton = styled(Button)`
  margin-top: 10%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: inset 0px 0px 12px px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const StyledFileLabel = styled.label`
  margin-top: 5%;
  display: flex;
  align-items: center;
  column-gap: 10px;

  img {
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
  const [image, setImage]: any = useState({});
  const navigate = useNavigate();

  const handleSetImage = (e: any) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //TODO: Create unique user name for example with adding date to username

      const storageRef = ref(storage, name);

      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          updateProfile(res.user, {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <StyledTitle>Welcome in Lulu's Chat App</StyledTitle>
      <StyledForm onSubmit={handleRegister}>
        <StyledLabel htmlFor="name">Name</StyledLabel>
        <StyledInput
          type="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledFileLabel htmlFor="userAvatar">
          <img
            src="https://www.svgrepo.com/show/12324/cloud-uploading-arrow.svg"
            alt="Add-file-icon"
          />
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
  );
};

export default RegisterView;

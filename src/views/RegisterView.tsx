import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from 'FirebaseApp/firebase';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledHeading = styled.h1`
  width: 60%;
  text-align: center;
  line-height: 35px;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: bold;
  position: absolute;
  top: 7%;
`;

const StyledInput = styled.input`
  margin: 10px 0 30px 0;
  padding: 20px 10px;
  border: 2px solid black;
  border-radius: 10px;
  height: 4%;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
`;

const StyledFileInput = styled.input`
  padding: 2em 0 3em 0;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
`;

const StyledButton = styled.button`
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
  border: 2px solid black;
  border-radius: 10px;
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
      <StyledHeading>Create your account</StyledHeading>
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
        <StyledLabel htmlFor="userAvatar">Add user avatar</StyledLabel>
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

import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, TextField, Typography, autocompleteClasses } from '@mui/material';
import useLogin from "./hooks/useLogin";
import Register from './Pages/Register';
import { validateInput } from './../src/Components/validators/Validators';
import Login, { validateField } from './Pages/Login';
import { UserData } from './propTypes/propTypes';

const Home = () => {
  const fields = [
    { label: 'Email', name: 'email', type: 'email'},
    { label: 'Password', name: 'password', type: 'password'}
  ];

  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ fieldErrors, setFieldErrors ] = useState({
    email: '', password: ''
  });

  const [ error, login ] = useLogin();
  const [ form, setForm ] = useState("signin");

  const [ userData, setUserData ] = useState({});
  const handleFieldError = (fieldName: string, value: string) => setFieldErrors(prevData => ({ ...prevData, [fieldName]: value}));

  const handleFieldChange = (value: string, field: {name:string}) => {
    setUserData(prevData => ({ ...prevData, [field.name]: value}));
  };

  const checkForm = (data, setInputError: (v: string) => void, fields) => {
    fields.forEach(field => {
      validateField(data[field.name], field, setInputError);
    })
  };

  useEffect(() => {
    const areFieldsValid= fields.every(field => validateInput(userData[field.name]));
    if (areFieldsValid) {
      setIsFormValid(fields.every(field => fieldErrors[field.name] == '' ));
    } else {
      setIsFormValid(false);
    }
  }, [userData, fieldErrors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkForm(userData, handleFieldError, fields);

    if (!isFormValid) {
    return; 
    }
    login(userData);
  }

  return (
    <Container sx={{paddingTop: "50px"}}>
      {
        form === "signin" ?
        <Stack
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        sx={{
          boxShadow: '0 4px 8px 0 rgba(14, 13, 25, 0.2)',
          padding: '20px',
          borderRadius: '10px',
          gap: '10px',
          width: '40%',
          margin: "auto",
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h6"> GET STARTED </Typography>

        {fields.map((field, index) =>(
            <Login 
              key={index} 
              field={field}
              onChange={handleFieldChange}
              errorMessage={fieldErrors}
              setError={handleFieldError}
              userData={userData}
              />
          ))}

        <Button type="submit" variant="contained" sx={{backgroundColor: "#FF9448"}}>Sign In</Button>
        {error &&       
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#EF5350"
          }}>{error}
        </Typography>}
        <Stack sx={{flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
          <Typography variant="caption"> Don't have an account? </Typography>
          <Button size="small" onClick={()=>setForm("signup")}>
            <Typography variant="caption" sx={{color: "#FF9448"}}>Register HERE</Typography>
          </Button>
        </Stack>
       
      </Stack> : 
      <Register
        setForm={setForm}
      />
      }
    </Container>
  )
}

export default Home;
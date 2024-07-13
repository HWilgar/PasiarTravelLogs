import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import React, { useEffect, useState } from "react";
import RegisterForm from "./../Pages/RegisterForm";
import { validateInput } from "./../Components/validators/Validators";
import { validateField } from "./../Pages/Login";

const Register = ({ setForm }) => {
  const fields = [
    { label: 'Username', name: 'username', type: 'text'},
    { label: 'Email', name: 'email', type: 'email'},
    { label: 'Password', name: 'password', type: 'password'}
  ];

  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ fieldErrors, setFieldErrors ] = useState({
    username: '', email: '', password: ''
  });

  const [ error, setError ] = useState("");
  const [ errorLog, login ] = useLogin();

  const [ userData, setUserData ] = useState({});
  const handleFieldError = (fieldName, value) => setFieldErrors(prevData => ({ ...prevData, [fieldName]: value}));

  const handleFieldChange = (value, field) => {
    setUserData(prevData => ({ ...prevData, [field.name]: value}));
  };

  const checkForm = (data, setInputError, fields) => {
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

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  checkForm(userData, handleFieldError, fields);

  if (!isFormValid) {
  return; 
  }

  try {
    const registered = await axios.post("https://pasiartravellogs-api.onrender.com/api/v1/users", {name: userData.username, email: userData.email, password: userData.password});

    if(registered){
      login(userData);
    }

  } catch (error) {
    setError(error.response.data.message);
  }
}

  return (
    <Container>
      <Stack 
        component="form"
        onSubmit={(e)=>handleSubmit(e)}
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
        <Typography variant="h6"> Create Account </Typography>

        {fields.map((field, index) =>(
            <RegisterForm
              key={index} 
              field={field}
              onChange={handleFieldChange}
              errorMessage={fieldErrors}
              setError={handleFieldError}
              userData={userData}
              />
          ))}

        <Button type="submit" variant="contained" sx={{backgroundColor: "#FF9448"}}>Sign Up</Button>
        {error && 
          <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#EF5350"
          }}>{error}
        </Typography>}
        {errorLog && 
          <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#EF5350"
          }}>{error}
        </Typography>}
        <Stack sx={{flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
          <Typography variant="caption"> Already have an account? </Typography>
          <Button size="small" onClick={()=>setForm("signin")}>
            <Typography variant="caption" sx={{color: "#FF9448"}}>Sign In</Typography>
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Register;
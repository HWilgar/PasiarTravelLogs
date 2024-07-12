import { Container, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { validateInput, validatePassword, validateEmail } from "./../Components/validators/Validators";

export const validateField = (input: string, field: {name:string}, setError) =>{
	if (validateInput(input)) {
		if (field.name === 'password' && !validatePassword(input)) {
			setError(field.name, 'Must be 2 or more characters.');
		} else if (field.name === 'username' && !validatePassword(input)) {
			setError(field.name, 'Must be 2 or more characters.');
		} else if (field.name === 'email' && !validateEmail(input)) {
			setError(field.name, 'Please enter a valid email address. ');
		} else{
				setError(field.name,'');
		}
	}else{
		setError(field.name, 'This field is required.');
	}
};

const Login = ({ field, onChange, errorMessage, setError, userData }) => {
  const hasError = errorMessage[field.name] !== '';

  const inputChangeHandler = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setError(field.name, '');
    onChange(value, field);
  };

  return (
  <Container>
    <Stack>
    <TextField
      id={field.name}
      size="small"
      label={field.label}
      type={field.type}
      value={userData[field.name] || ""}
      onChange={inputChangeHandler}
      onBlur={(e)=> validateField(e.target.value, field, setError)}
      sx={{ borderColor: hasError ? '#EF5350' : '#303846' }}
    />
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: "#EF5350",
          width: "100%",
          textAlign: "right"
        }}
      >{errorMessage[field.name]}</Typography>
    </Stack>
  </Container>
)
}

export default Login;
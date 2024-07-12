export const validateContactNumber = (number) => {
  const regex = /^\+\d{1,3}\s?9\d{9}$/;
  return regex.test(number);
};
 
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateName = (name) => {
  const pattern = /^[A-Za-z\s'-.]+$/;
  const words = /^(?:\b[a-zA-Z'-.]+\b\s+){1,}[a-zA-Z'-.]+$/;

  if(!pattern.test(name)){
    return 'Please check for unnecessary characters.';
  } else if(!words.test(name)){
    return "Please enter name as 'Firstname Lastname'";
  } else{
    return '';
  }
};

export const validatePassword = (password) => {
  if(!password) {
    return false;
  }

  return password.length > 2 ? true : false;
};

export const validateInput = (input) => {
return input ? true : false;
};

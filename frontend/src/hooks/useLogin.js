import { useContext, useState } from "react";
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const REQUEST_URL = process.env.REACT_APP_URL;

const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (userCredentials) => {
    try {
      const { data: { data } } = await axios.post(`${REQUEST_URL}/api/v1/users/login`, {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      setIsLoggedIn(true);
      setUser({
        token: data.token,
        name: data.name,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;

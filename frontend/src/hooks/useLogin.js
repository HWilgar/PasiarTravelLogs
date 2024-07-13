import { useContext, useState } from "react";
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (userCredentials) => {
    try {
      const data = await axios.post("https://pasiartravellogs-api.onrender.com/api/v1/auth/login", {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      setIsLoggedIn(true);
      setUser(data.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;

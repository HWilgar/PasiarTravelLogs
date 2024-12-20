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
      const { data: { data } } = await axios.post(`https://pasiar-travel-logs-api.vercel.app/api/v1/users/login`, {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      localStorage.setItem("pasiar_user", JSON.stringify(data));
      setUser(data);
      setIsLoggedIn(true);   
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;

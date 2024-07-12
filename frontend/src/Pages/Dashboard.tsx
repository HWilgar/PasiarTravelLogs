import React, { useContext, useEffect } from "react";
import { Container } from "@mui/material";
import Collection from "../Components/Collection.tsx";
import MyContext from "../../MyContext.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) navigate("/");
  });

  return (
    <Container>
      <Collection />
    </Container>
  )
}

export default Dashboard;
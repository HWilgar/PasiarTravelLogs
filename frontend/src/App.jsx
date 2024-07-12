// import { useEffect } from "react";
// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Trip from "./Pages/Trip.tsx";

function App() {
  // const [greeting, setGreeting] = useState();

  // useEffect(() =>{
  //   fetch('/api/v1')
  //   .then((res) => res.text())
  //   .then(setGreeting);
  // }, []);

  // return <h1>{greeting}</h1>;
return(
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/trips/:tripId" element={<Trip/>} />
  </Routes>
  )
}

export default App;

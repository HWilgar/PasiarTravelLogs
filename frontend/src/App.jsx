import { Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Trip from "./Pages/Trip.tsx";

function App() {
return(
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/trips/:tripId" element={<Trip/>} />
  </Routes>
  )
}

export default App;

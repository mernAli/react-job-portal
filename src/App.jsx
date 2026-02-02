import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./components/JobList";
import "./components/layout.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Network from "./pages/Network";
import Landing from "./pages/Landing";
import AppLayout from "./layouts/AppLayout";


function App() {
  return (
    
    <>
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />}/>

        {/* Day 10 Job Portal */}
        <Route path="/app/*" element={<AppLayout />}/>
      </Routes>

    </BrowserRouter>


    
    </>
  );
}

export default App;

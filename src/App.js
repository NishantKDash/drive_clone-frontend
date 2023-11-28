import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/*" element={<Error></Error>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

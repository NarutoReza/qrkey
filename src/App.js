import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Users";
import Posts from "./Posts";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/users/:userId' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

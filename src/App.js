import "./App.css";
import "./styles/App/App.css";
import Home from "./pages/Home/Home";
import Sub from "./pages/Sub/Sub";
import Raid from "./pages/Raid/Raid";
import Test from "./pages/Test/Test"; // 테스트api용
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import ButtonAppBar from "./components/Nav/Appbar";
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <ButtonAppBar></ButtonAppBar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Sub" element={<Sub></Sub>}></Route>
            <Route path="/Raid/" element={<Raid></Raid>}></Route>
            <Route path="/Test/" element={<Test></Test>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

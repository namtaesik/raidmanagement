import "./App.css";
import "./styles/App/App.css";
import Home from "./pages/Home/Home";
import Sub from "./pages/Sub/Sub";
import ChanmiNoonNa from "./pages/Raid/ChanmiNoonNa/ChanmiNoonNa";
import ChanmiNoonNaSignUp from "./pages/Raid/ChanmiNoonNa/SignUp";
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
            <Route
              path="/Raid/ChanmiNoonNa/"
              element={<ChanmiNoonNa></ChanmiNoonNa>}
            ></Route>
            <Route
              path="/Raid/ChanmiNoonNa/SignUp"
              element={<ChanmiNoonNaSignUp></ChanmiNoonNaSignUp>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

import "./App.css";
import "./styles/App/App.css";
import Home from "./pages/Home/Home";
import Sub from "./pages/Sub/Sub";
import Raid from "./pages/Raid/Raid";
import RiadV2 from "./pages/RaidV2/RaidV2";
import RaidV2Inner from "./pages/RaidV2/RaidV2Inner";
import CharacterManagement from "./pages/CharacterManagement/CharacterManagement";
import JobOffer from './pages/JobOffer/JobOffer';
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
            <Route path="/Raid" element={<Raid></Raid>}></Route>
            <Route path="/RaidV2" element={<RiadV2></RiadV2>}></Route>
            <Route path="/JobOffer" element={<JobOffer></JobOffer>}></Route>
            <Route
              path="/RaidV2Inner"
              element={<RaidV2Inner></RaidV2Inner>}
            ></Route>
            <Route
              path="/CharacterManagement"
              element={<CharacterManagement></CharacterManagement>}
            ></Route>
            <Route path="/Test" element={<Test></Test>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

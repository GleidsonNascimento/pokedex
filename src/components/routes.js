import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/home";
import Details from "./details/details";
import Trainer from "./trainer/trainer";


export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/trainer" element={<Trainer/>} />
      </Routes>
    </BrowserRouter>
  );
}

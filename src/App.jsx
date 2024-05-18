import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Events from "./pages/Events";
import Documents from "./pages/Documents";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Members from "./pages/Members";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/posts" exact element={<Posts />}></Route>
            <Route path="/events" exact element={<Events />}></Route>
            <Route path="/documents" exact element={<Documents />}></Route>
            <Route path="/about" exact element={<About />}></Route>
            <Route path="/contact" exact element={<Contact />}></Route>
            <Route path="/members" exact element={<Members />}></Route>
            <Route path="/gallery" exact element={<Gallery />}></Route>
          </Route>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

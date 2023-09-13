import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@components/Header";
import Home from "@routes/Home";
import Search from "@routes/Search";
import Tv from "@routes/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

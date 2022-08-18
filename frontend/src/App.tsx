import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import World from "./routes/World";
import Admin from "./routes/Admin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/world/*" element={<World />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import "./App.css";

function App() {
  return (
    <>
      <div className="background-image bg-center"></div>
      <div className="App w-screen h-screen bg-transparent text-night">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room">
              <Route path=":roomId" element={<Room />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

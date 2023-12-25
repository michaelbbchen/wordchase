import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import "./App.css";

function App() {
  return (
    <div className="App w-screen h-screen bg-night text-snow">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room">
              <Route path=":roomId" element={<Room />} />
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;

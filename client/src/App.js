import { Routes, Route } from 'react-router-dom';
import './App.css';

// Existing Screens
import LobbyScreen from "./screens/lobby";
import RoomPage from "./screens/Room";




// New Pages (converted from old HTML)
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;

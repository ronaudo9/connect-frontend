import Profile from "./components/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";
import UserList from "./pages/userList/UserList";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Register />}
        />
        <Route path="/userList/:username" element = {user ? <UserList/> : <Register />}/>
      </Routes>
    </Router>
  );
}

export default App;

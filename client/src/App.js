import { useEffect, useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./components/Home/Home";
import TopNavbar from "./components/Navbar/TopNavbar";
import Login from "./components/onboarding/Login";
import Register from "./components/onboarding/Register";
import History from "./components/History/History";
import PrivateRoute from "./components/onboarding/PrivateRoute";
import {
  fillLocationsData,
  fillPlayersDataAction,
  fillUserData,
} from "./Redux/Actions/actions";

export const UserContext = createContext();

function App() {
  const dispatch = useDispatch();
  const lsToken = localStorage.getItem("footballAccessToken");
  const [token, setToken] = useState(lsToken);

  useEffect(() => {
    token && dispatch(fillUserData(token));
    token && dispatch(fillPlayersDataAction(token));
    dispatch(fillLocationsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="football-app">
      <UserContext.Provider value={{ token, setToken }}>
        <TopNavbar />
        <Routes>
          <Route element={<PrivateRoute user={token} />}>
            <Route path="/" element={<Home />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to={token ? "/" : "login"} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

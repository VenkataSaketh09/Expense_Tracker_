import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/dashboard" element={<Home />} />
            <Route exact path="/income" element={<Income />} />
            <Route exact path="/expense" element={<Expense />} />
          </Routes>
        </Router>
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#fff",
              color: "#333",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #e5e7eb",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
            loading: {
              iconTheme: {
                primary: "#8b5cf6",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if the token exists in the local storage
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" /> //Navigate is Used for programmatic redirection.
  ) : (
    <Navigate to="/login" />
  );
};

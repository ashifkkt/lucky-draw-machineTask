import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Departments from "./components/Departments";
import { register as registerAPI, login as loginAPI } from "./utils/api";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const handleRegister = async (userData) => {
    await registerAPI(userData);
    setMessage("Registration successful! You can now login.");
    setIsLogin(true);
  };

  const handleLogin = async (credentials) => {
    const response = await loginAPI(credentials);
    const authToken = response.token;

    localStorage.setItem("token", authToken);
    setToken(authToken);
    setIsAuthenticated(true);
    setMessage("Login successful!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setMessage("");
  };

  if (isAuthenticated) {
    return <Departments token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full flex flex-col items-center">
        {message && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-md text-sm">
            {message}
          </div>
        )}

        {isLogin ? (
          <Login
            onSwitchToRegister={() => {
              setIsLogin(false);
              setMessage("");
            }}
            onLogin={handleLogin}
          />
        ) : (
          <Register
            onSwitchToLogin={() => {
              setIsLogin(true);
              setMessage("");
            }}
            onRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
}

export default App;

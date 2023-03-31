import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    // Request done.
    setUser({
      id: 1,
      name: "John",
      permissions:["analize"],
      roles: ["admin"]
    });
  };

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}> {/* !!user = Si el usuario existe es true, si no existe es false. */}
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/analytics" element={
          <ProtectedRoute
            isAllowed={!!user && user.permissions.includes("analize")}
            redirecTo="/home"
          >
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute 
            isAllowed={!!user && user.roles.includes("admin")}
            redirecTo="/home"
          >
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
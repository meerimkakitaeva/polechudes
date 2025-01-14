import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateQuestion from "./pages/CreateQuestion";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/admin/create-question" element={<CreateQuestion />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

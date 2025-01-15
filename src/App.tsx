import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateQuestion from "./pages/CreateQuestion";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditQuestion from "./pages/EditQuestion";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/polechudes/f" element={<Main />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/admin/create-question" element={<CreateQuestion />} />
        <Route path="/admin/edit-question/:id" element={<EditQuestion />} />
        <Route path="*" element={<NotFound />} />
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

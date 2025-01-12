import React from "react";
import { useAppDispatch } from "../app/hook";
import { logout } from "../features/adminSlice";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  };

  return (
    <div className="formAdmin">
      <h2>Админ панель</h2>
      <button onClick={handleLogout} className="btn btn-danger">
        Выйти
      </button>
    </div>
  );
};

export default Admin;

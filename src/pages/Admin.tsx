import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  logout,
  selectFetchLoading,
  selectQuestions,
} from "../features/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import QuestionItem from "../components/QuestionItem/QuestionItem";
import { fetchQuestions } from "../features/gameThunk";
import Spinner from "../components/Spinner/Spinner";

const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectQuestions);
  const loading = useAppSelector(selectFetchLoading);

  const handleLogout = () => {
    dispatch(logout());

    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="container mt-3">
      <h4>Админ панель</h4>
      <div className="d-flex justify-content-between mt-4">
        <Link className="btn btn-primary" to="/admin/create-question">
          Создать вопрос
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Выйти
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3 row">
          {items.map((item) => (
            <QuestionItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;

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
    <div className="admin-page">
      <div className="header text-white">
        <div className="container pt-3 pb-3 d-flex justify-content-between">
          <h4 className="m-0">Админ панель</h4>
          <div className="d-flex justify-content-end">
            <Link
              className="btn bg-primary-subtle text-primary-emphasis me-2"
              to="/admin/create-question"
            >
              Создать вопрос
            </Link>
            <button
              onClick={handleLogout}
              className="btn text-danger-emphasis"
              style={{ background: "#F76C6C" }}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-3 content">
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
    </div>
  );
};

export default Admin;

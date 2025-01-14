import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  logout,
  selectFetchLoading,
  selectQuestions,
} from "../features/adminSlice";
import { useNavigate } from "react-router-dom";
import QuestionItem from "../components/QuestionItem/QuestionItem";
import { fetchQuestions } from "../features/gameThunk";
import Spinner from "../components/Spinner/Spinner";

const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  };

  const items = useAppSelector(selectQuestions);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="container mt-3">
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {items.map((item) => (
            <QuestionItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <button onClick={handleLogout} className="btn btn-danger">
        Выйти
      </button>
    </div>
  );
};

export default Admin;

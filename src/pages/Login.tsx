import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { IAdmin } from "../types";
import { loginCheck, selectIsLoggedIn } from "../features/adminSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [state, setState] = useState<IAdmin>({
    username: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);
    setError(false);
    dispatch(loginCheck(state));
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    if (formSubmitted) {
      if (isLoggedIn) {
        navigate("/admin");
      } else {
        setError(true);
        setFormSubmitted(false);
      }
    }
  }, [isLoggedIn, navigate, formSubmitted]);

  return (
      <div className="mt-4 formAdmin">
        {error && (
            <div className="alert alert-danger" role="alert">
              Неправильные данные! Попробуйте снова
            </div>
        )}
        <form onSubmit={submitFormHandler}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
                type="text"
                className="form-control"
                id="username"
                value={state.username}
                name="username"
                onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                value={state.password}
                name="password"
                onChange={inputChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
  );
};

export default Login;

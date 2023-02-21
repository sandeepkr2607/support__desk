import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../component/Spinner";

import { useNavigate } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  // for redux

  const dispatch = useDispatch();

  // for selector
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );
  const Navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      return toast.error(message);
    }
    // Redirect when logged in
    if (isSuccess || user) {
      return Navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch, user, message, Navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error("Password does not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="Enter your name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="Enter password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="Confirm password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;

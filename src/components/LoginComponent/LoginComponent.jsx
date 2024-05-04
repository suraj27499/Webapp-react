import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CallApi from "../../utility/ApiUtils";
import Spinner from "../Spinner/Spinner";
import "./LoginComponent.css";

const LoginComponent = () => {
  return (
    <>
      <div className="card" id="login-container">
        <div className="card-body max-width">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiPromise, setApiPromise] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userNameValidations = {
    required: "Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };

  const passwordValidations = {
    required: "Required",
    minLength: { value: 8, message: "Minimum characters of 8 length" },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
      message: "Invalid password",
    },
  };

  const eyeIcon = <i className="fa fa-eye" aria-hidden="true"></i>;
  const eyeSlashIcon = <i className="fa fa-eye-slash" aria-hidden="true"></i>;

  const handleKeyDown = (event) => {
    // Prevent form submission when the Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  function getRequest(data) {
    return {
      emailId: data.userName,
      password: data.password,
    };
  }

  const submitData = async (data) => {
    try {
      const url = "http://localhost:8080/customers/getCustomer";
      const request = getRequest(data);
      const promise = CallApi(url, request);
      setApiPromise(promise);
      await promise;
    } catch (error) {
    } finally {
      setApiPromise(null);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          submitData(data);
        })}
        onKeyDown={handleKeyDown}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address*</label>
          <input
            {...register("userName", userNameValidations)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <p className="error-text">{errors.userName?.message}</p>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Password*</label>
          <div className="password-input-container">
            <input
              {...register("password", passwordValidations)}
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <p className="error-text">{errors.password?.message}</p>
            <div className="password-icon-container">
              <button
                type="button"
                onClick={() => {
                  setShowPassword((prevValue) => !prevValue);
                }}
              >
                {showPassword ? eyeIcon : eyeSlashIcon}
              </button>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn button-primary mt-1">
                Login
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-secondary mt-2">
                <Link
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Signup
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
      {apiPromise && <Spinner promise={apiPromise} />}
    </>
  );
};

export default LoginComponent;

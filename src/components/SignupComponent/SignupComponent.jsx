import { useState } from "react";
import { useForm } from "react-hook-form";
import CallApi from "../../utility/ApiUtils";
import "./SignupComponent.css";

const SignupComponent = () => {
  return (
    <>
      <div className="card card-container">
        <div className="card-body">
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nameValidations = {
    required: "Required",
    pattern: {
      value: /^[a-zA-Z\s'-]{3,20}$/i,
      message: "Invalid Name",
    },
  };

  const radioValidations = { required: "Required" };

  const dobValidations = {
    required: "Required",
    pattern: {
      value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i,
      message: "Invalid date of birth",
    },
  };

  const emailValidations = {
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

  function getRequest(data) {
    return {
      firstName: data.form,
      lastName: data.lastName,
      gender: data.gender,
      dob: data.dob,
      emailId: data.email,
      password: data.password,
    };
  }

  const handleKeyDown = (event) => {
    // Prevent form submission when the Enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const url = "http://localhost:8080/customers/create";
        const request = getRequest(data);
        CallApi(url, request).then((resp) => {
          if (!resp) return;
          console.info("Logged in Successfully!");
        });
      })}
      onKeyDown={handleKeyDown}
    >
      <div className="form-group">
        <label htmlFor="firstName">First Name*</label>
        <input
          {...register("firstName", nameValidations)}
          type="text"
          className="form-control"
          id="firstName"
          aria-describedby="firstName"
          placeholder="Enter FirstName"
        />
        <p className="error-text">{errors.firstName?.message}</p>
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name*</label>
        <input
          {...register("lastName", nameValidations)}
          type="text"
          className="form-control"
          id="lastName"
          aria-describedby="lastName"
          placeholder="Enter LastName"
        />
        <p className="error-text">{errors.lastName?.message}</p>
      </div>
      <div className="form-group row justify-content-start">
        <div className="col-auto align-items-center">
          <label htmlFor="gender" className="me-2 mb-2">
            Gender:
          </label>
          <div className="form-check form-check-inline">
            <input
              {...register("gender", radioValidations)}
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="MALE"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              {...register("gender", radioValidations)}
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="FEMALE"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              {...register("gender", radioValidations)}
              className="form-check-input"
              type="radio"
              name="gender"
              id="other"
              value="OTHER"
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
        </div>
        <p className="error-text">{errors.gender?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth*</label>
        <input
          {...register("dob", dobValidations)}
          type="text"
          className="form-control"
          id="dob"
          aria-describedby="dob"
          placeholder="e.g. 15/04/1789"
        />
        <p className="error-text">{errors.dob?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Id*</label>
        <input
          {...register("email", emailValidations)}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="email"
          placeholder="xyz@abc.com"
        />
        <p className="error-text">{errors.email?.message}</p>
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
        <div className="col-lg-12 d-flex justify-content-center">
          <button type="submit" className="btn button-primary mt-1">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignupComponent;

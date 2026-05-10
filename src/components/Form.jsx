import "../Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  return (
    <div className="form d-flex justify-content-center align-items-center w-100">
      <form className="w-25 h-100 d-flex justify-content-center align-items-start flex-column p-5">
        <div className="mb-3 w-100">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={data.name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <div id="emailHelp" className="form-text text-danger">
              {errors.name}
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label for="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
            value={data.userName}
            onChange={handleUserNameChange}
          />
          {errors.userName && (
            <div id="emailHelp" className="form-text text-danger">
              {errors.userName}
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={data.email}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <div id="emailHelp" className="form-text text-danger">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="exampleInputPassword1"
            value={data.password}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <div className="form-text text-danger">{errors.password}</div>
          )}
        </div>
        <div className="mb-4 w-100">
          <label for="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            id="exampleInputPassword2"
            value={data.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
            <div className="form-text text-danger">
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmission}
        >
          Register
        </button>
      </form>
    </div>
  );

  function handleNameChange(e) {
    setData({
      ...data,
      name: e.target.value,
    });
  }

  function handleUserNameChange(e) {
    setData({
      ...data,
      userName: e.target.value,
    });
  }

  function handlePasswordChange(e) {
    setData({
      ...data,
      password: e.target.value,
    });
  }

  function handleConfirmPasswordChange(e) {
    setData({
      ...data,
      confirmPassword: e.target.value,
    });
  }

  function handleEmailChange(e) {
    setData({
      ...data,
      email: e.target.value,
    });
  }

  function handleSubmission(e) {
    e.preventDefault();
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.name.trim()) {
      newErrors.name = "Name is Required!";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is Required!";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid Email Format! (example@gmail.com)";
    }

    if (!data.userName.trim()) {
      newErrors.userName = "UserName is Required!";
    } else if (data.userName.includes(" ")) {
      newErrors.userName = "UserName must not contain spaces!";
    }

    if (!data.password) {
      newErrors.password = "Password is Required!";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be 8 or more characters!";
    } else if (!/[a-z]/.test(data.password)) {
      newErrors.password =
        "Password must have at least one lowercase character!";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password =
        "Password must have at least one uppercase character!";
    } else if (!/[*@%$#]/.test(data.password)) {
      newErrors.password = "Password must have at least one special character!";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Password Confirmation is Required!";
    } else if (!newErrors.password && data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords doesn't match!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(data, null, 2));

      navigate("/");
    }
  }
}

export default Form;

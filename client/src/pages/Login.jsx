import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";
import "./auth.styles.css";
import jwt_decode from "jwt-decode";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormDataFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL + "/auth/login", formData);
      if (response?.data?.success) {
        successToast("Successfully logged in");

        setFormData({
          email: "",
          password: "",
        });

        const token = response?.data?.data?.accessToken;
        localStorage.setItem("token", token);
        const decodedToken = jwt_decode(localStorage.getItem("token"));
        if (decodedToken.user.role == "ADMIN") {
          navigate("/products");
        } else if (decodedToken.user.role == "CUSTOMER") {
          navigate("/dashboard");
        }

        setLoading(false);
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    return (
      <div className="--auth">
        <div className="--left-container">
          <div className="--left-container-content">
            <p className="--app-name">
              Binary
              <br />
             SuperMarket
              <br />
              <span className="--highligher">Online</span>
            </p>
            <p className="--app-description">
              Binary supermarket, by KALIM
            </p>
          </div>
        </div>
        <div className="--right-container">
          <div className="--right-container-content">
            <p className="--app-logo">Binary SuperMarket</p>
            <div className="--welcome">
              <p className="--welcome-text">Hey, Hello 🤗</p>
              <p className="--details">
                Enter the information you entered while registering
              </p>
    
            </div>
            <form onSubmit={handleSubmit} className="--auth-form">
              <div className="--field">
                <label htmlFor="email" className="--form-label">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="--form-input"
                  // className={`${
                  //   errors.email && touched.email ? "--input-error" : ""
                  // } --form-input`}
                />
                {/* {errors.email && touched.email && (
                  <span className="--error">{errors.email}</span>
                )} */}
              </div>
              <div className="--field">
                <label htmlFor="password" className="--form-label">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="--form-input"
                  // className={`${
                  //   errors.password && touched.password ? "--input-error" : ""
                  // } --form-input`}
                />
                {/* {errors.password && touched.password && (
                  <span className="--error">{errors.password}</span>
                )} */}
              </div>
              <div className="--remember">
                <div className="--check">
                  <input type="checkbox" name="remember" id="remember" />
                  <label>Remember me</label>
                </div>
                <p className="--forgot">Forgot Password?</p>
              </div>
              <div className="--actions">
                <button type="submit" className="--main-button">
                  {loading ? "Logging in..." : "Login"}
                </button>
                <div className="--toggle">
                  <p>Don’t have an account?</p>
                  &nbsp;
                  <Link to="/signup" className="--option">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

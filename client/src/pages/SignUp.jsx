import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormDataFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        API_URL + "/users/register/customer",
        formData
      );
      if (response?.data?.success) {
        successToast("Successfully registered");

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });

        setLoading(false);
        navigate("/login");
      } else {
        errorToast(
          response?.data?.message || "Error occurred while registering"
        );
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
          <p className="--app-description">Binary supermarket, by KALIM</p>
        </div>
      </div>
      <div className="--right-container">
        <div className="--right-container-content">
          <p className="--app-logo">Binary SuperMarket</p>
          <div className="--welcome">
            <p className="--welcome-text">Welcome back! 🤗</p>
            <p className="--details">
              Enter personal information to register an account!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="--auth-form">
            <div className="--form-fields">
              <div className="--field">
                <label htmlFor="name" className="--form-label">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  defaultInputValue={formData.name || ""}
                  placeholder="Enter Name"
                  className="--form-input"
                  //    className={`${
                  //      errors.fullName && touched.fullName ? "--input-error" : ""
                  //    } --form-input`}
                  onChange={handleChange}
                />
                {/* {errors.fullName && touched.fullName && (
               <span className="--error">{errors.fullName}</span>
             )} */}
              </div>
              <div className="--field">
                <label htmlFor="email" className="--form-label">
                  Email
                </label>

                <Input
                  type="email"
                  name="email"
                  className="--form-input"
                  defaultInputValue={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email"
                  //    className={`${
                  //      errors.email && touched.email ? "--input-error" : ""
                  //    } --form-input`}
                />
                {/* {errors.email && touched.email && (
               <span className="--error">{errors.email}</span>
             )} */}
              </div>
              <div className="--field">
                <label htmlFor="phone" className="--form-label">
                  phone
                </label>

                <Input
                  type="tel"
                  name="phone"
                  className="--form-input"
                  defaultInputValue={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  //    className={`${
                  //      errors.email && touched.email ? "--input-error" : ""
                  //    } --form-input`}
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
                  defaultInputValue={formData.password || ""}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="--form-input"
                  //    className={`${
                  //      errors.password && touched.password ? "--input-error" : ""
                  //    } --form-input`}
                />
                {/* {errors.password && touched.password && (
               <span className="--error">{errors.password}</span>
             )} */}
              </div>
            </div>
            <div className="--actions">
              <button type="submit" className="--main-button">
                {loading ? "Creating account..." : "Signup"}
              </button>
              <div className="--toggle">
                <p>Already have an account?</p>
                <Link to="/login" className="--option">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

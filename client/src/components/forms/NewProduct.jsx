/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Input } from "../Input";
import { API_URL, sendRequest } from "../../utils/Api";
import { errorToast, successToast } from "../../utils/Toast";
import * as Yup from "yup";

const NewProduct = ({ closeModal }) => {
  const [data, setData] = React.useState({});

  const [localSending, setlocalSending] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    name: Yup.string().required("name is required"),
    type: Yup.string().required("Type  is required"),
    price: Yup.number().required("Price is required"),
    image: Yup.string().required("Image is required"),
  

  });

  const inputHandler = async (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    try {
      await validationSchema.validate(data, { abortEarly: false });

      let response = await sendRequest(
        API_URL + "/products",
        "POST",
        data
      );
      if (response?.data?.success) {
        successToast("Successfully registered the new product");
        closeModal(false);
      } else {
        errorToast(
          response?.data?.message ||
            "Error occurred while registering the product "
        );
        closeModal();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};

        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });

        setValidationErrors(errors);
      } else {
        errorToast(error?.response?.data?.message || "An error occurred");
        closeModal();
      }
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="form-holder">
        <div className="form-header text-white flex justify-center items-center relative">
          {"Register Employee Laptop"}
          <FaTimes
            className="text-white absolute right-4 cursor-pointer"
            onClick={closeModal}
          ></FaTimes>
        </div>
        <div className="form-content bg-white p-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="w-full ">
              <div className="flex flex-col items-center  justify-center">
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="code"
                      name="code"
                      onChange={inputHandler}
                      defaultInputValue={data.code || ""}
                    ></Input>
                    {validationErrors.code && (
                      <span className="error-message">
                        {validationErrors.code}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="name"
                      name="name"
                      onChange={inputHandler}
                      defaultInputValue={data.name || ""}
                    ></Input>
                    {validationErrors.name && (
                      <span className="error-message">
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                </div>
               
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="type"
                      name="type"
                      onChange={inputHandler}
                      defaultInputValue={data.type || ""}
                    ></Input>
                    {validationErrors.type && (
                      <span className="error-message">
                        {validationErrors.type}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <Input
                      type="number"
                      labelName="price"
                      name="price"
                      onChange={inputHandler}
                      defaultInputValue={data.price || ""}
                    ></Input>
                    {validationErrors.price && (
                      <span className="error-message">
                        {validationErrors.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      type="text"
                      labelName="image"
                      name="image"
                      onChange={inputHandler}
                      defaultInputValue={data.image || ""}
                    ></Input>
                    {validationErrors.image && (
                      <span className="error-message">
                        {validationErrors.image}
                      </span>
                    )}
                  </div>
              
                </div>
      
                <button type="submit" className="save-btn">
                  {localSending ? "wait..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;

import React, { useState, useEffect } from "react";
import bg from "./assests/bg2.jpg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Slide } from "@material-ui/core";

function LandingPage(props) {
  const { register, handleSubmit, errors } = useForm();
  const [firstPostRender, setfirstPostRender] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [debitLoading, setDebitLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setfirstPostRender(true);
    }, 500);
  }, []);

  const debit = async () => {
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      setDebitLoading(true);
      const res = await axios.patch(
        "http://localhost:3001/api/v1/debit",
        config
      );
      if (res) {
        setDebitLoading(false);
        Swal.fire("Success", res.data.message, "success");
      }
    } catch (error) {
      setDebitLoading(false);
      let err = error.data
        ? error.data.message
        : "Something went wrong, try again later";
      Swal.fire("Error", err, "error");
    }
  };

  const credit = async () => {
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      setCreditLoading(true);
      const res = await axios.patch(
        "http://localhost:3001/api/v1/credit",
        config
      );
      if (res) {
        setCreditLoading(false);
        Swal.fire("Success", res.data.message, "success");
      }
    } catch (error) {
      setCreditLoading(false);
      let err = error.data
        ? error.data.message
        : "Something went wrong, try again later";
      Swal.fire("Error", err, "error");
    }
  };

  const onSubmit = async (data) => {
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      setUserLoading(true);
      const res = await axios.post(
        "http://localhost:3001/api/v1/user",
        data,
        config
      );
      if (res) {
        setUserLoading(false);
        Swal.fire("Success", res.data.message, "success");
      }
    } catch (error) {
      setUserLoading(false);
      let err = error.data
        ? error.data.message
        : "Something went wrong, try again later";
      Swal.fire("Error", err, "error");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className="row justify-content-center p-md-5 p-2"
    >
      <Slide
        direction="right"
        timeout={900}
        in={firstPostRender}
        mountOnEnter
        unmountOnExit
      >
        <div
          className="mt-5 mb-4 p-md-5 p-4 bg-white shadow"
          style={{ borderRadius: "10px", height: "50vh" }}
        >
          <form
            method="POST"
            noValidate
            onSubmit
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor="email">Email or Name</label>
                <input
                  type="text"
                  name="name"
                  ref={register({ required: true })}
                  className={
                    errors.name ? "form-control is-invalid" : "form-control"
                  }
                />
                <div className="invalid-feedback">
                  {errors.name && "email or name is required"}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mx-auto rounded d-flex justify-content-center align-items-center"
            >
              {userLoading ? (
                <span className="px-3 m-w-90 d-block">
                  <CircularProgress color="inherit" size={"1rem"} />
                </span>
              ) : (
                "Add new user"
              )}
            </button>
          </form>
          <div className="d-flex mx-auto mt-5">
            <button
              type="submit"
              className="btn btn-primary rounded d-flex justify-content-center align-items-center mr-1"
              onClick={credit}
            >
              {creditLoading ? (
                <span className="px-3 m-w-90 d-block">
                  <CircularProgress color="inherit" size={"1rem"} />
                </span>
              ) : (
                "Credit users"
              )}
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded d-flex justify-content-center align-items-center"
              onClick={debit}
            >
              {debitLoading ? (
                <span className="px-3 m-w-90 d-block">
                  <CircularProgress color="inherit" size={"1rem"} />
                </span>
              ) : (
                "Debit users"
              )}
            </button>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default LandingPage;

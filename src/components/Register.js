import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import RegisterUser from "../apis/RegisterUser";
import {jwtDecode} from "jwt-decode";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log(jwtDecode(localStorage.getItem("token")));
      if (jwtDecode(localStorage.getItem("token")).exp > currentTimestamp)
        navigate("/");
    }
  }, []);

  function onSubmit(values) {
    const user = {
      email: values.email,
      name: values.name,
      password: values.password,
    };
    RegisterUser(user)
      .then((res) => {
        if (res.status === 200) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function validate(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(values.email);

    if (!isValid)
      errors.email = "Enter a valid email";

    if (values.password.length < 5)
      errors.password = "Password should be at least 5 characters";

    if (values.name.length < 5)
      errors.name = "Name should be  at least 5 characters";

    return errors;
  }

  return (
    <div className="container">
      <h1>Please enter the details to register</h1>

      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <Form>
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>
            <ErrorMessage
              name="name"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            ></ErrorMessage>

            <fieldset className="form-group">
              <label>Email</label>
              <Field type="text" className="form-control" name="email"></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Name</label>
              <Field
                type="text"
                className="form-control"
                name="name"
              ></Field>
            </fieldset>
            <fieldset className="form-group">
              <label>Password</label>
              <Field
                type="password"
                className="form-control"
                name="password"
              ></Field>
            </fieldset>

            <div>
              <button className="btn btn-success m-5" type="submit">
                Sign-Up!
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Link to="/login">Already a user ? </Link>
    </div>
  );
};

export default Register;

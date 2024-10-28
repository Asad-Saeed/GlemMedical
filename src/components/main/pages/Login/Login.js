import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../config/schema";
import { login } from "../../../../redux/auth/authActions";
import "./Login.css";
import Header from "../../Header/Header";
import { LOCAL_ROUTE } from "../../../../config/route";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    // Api payload
    const apiPayload = {
      user_name: data.usernameOrEmail,
      password: data.password,
    };

    try {
      const res = await dispatch(login(apiPayload));
      if (res?.status === 1) {
        navigate(LOCAL_ROUTE.home);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <Header />
      <section className="contact-detail pt-90 login-signup-wraper">
        <div className="theme__container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="form-wraper">
                <div className="section-heading-wraper mb-xl-3 mb-2">
                  <div className="d-flex flex-column">
                    <h5 className="mb-xl-2 mb-1 one-side-fency-heading">
                      Let’s Connect
                    </h5>
                    <h2 className="mb-xl-3 mb-1 theme-color">Sign In</h2>
                  </div>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>User Name or Email</Form.Label>
                    <Controller
                      name="usernameOrEmail"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Control
                          type="text"
                          size="lg"
                          placeholder="Enter your username or email"
                          {...field}
                          isInvalid={!!errors.usernameOrEmail}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.usernameOrEmail?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <div
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Form.Control
                          className="w-100"
                          type={showPassword ? "text" : "password"}
                          size="lg"
                          placeholder="Enter your password"
                          {...field}
                          isInvalid={!!errors.password}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between mt-xl-3 mt-2">
                    <div className="d-flex">
                      <input
                        className="styled-checkbox"
                        id="styled-checkbox-1"
                        type="checkbox"
                        value="value1"
                      />
                      <label htmlFor="styled-checkbox-1">Remember Me </label>
                    </div>
                    <div className="forgot-password">
                      <Link
                        to="/forgot-password"
                        className="theme-color me-xl-4 me-2"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`btn-holder mt-xl-4 mt-2 d-flex justify-content-end align-items-end ${
                      isSubmitting ? "disabled" : ""
                    }`}
                  >
                    <button
                      disabled={isSubmitting}
                      className="theme-btn"
                      type="submit"
                    >
                      {isSubmitting ? "Login..." : "Login"}
                      <FontAwesomeIcon
                        className="arrow1"
                        icon={faChevronRight}
                      />
                    </button>
                  </div>
                  <div className="forgot-password mt-xl-3 mt-2">
                    Don't Have An Account?
                    <Link to="/sign-up" className="theme-color me-xl-4 me-2">
                      Register Now
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;

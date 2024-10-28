import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../../redux/auth/authActions";
import { signupSchema } from "../../../../config/schema";
import { LOCAL_ROUTE } from "../../../../config/route";
import { FetchCountries } from "../../../../redux/common/commonActions";
import {
  faChevronRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";


function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "all",
  });
  useEffect(() => {
    dispatch(FetchCountries());
  }, [dispatch]);
  const countries = useSelector(
    (state) => state?.common?.countriesList?.data
  );
  const loading = useSelector((state) => state?.common?.loading);

  const onSubmit = async (data) => {
    // Api payload
    const apiPayload = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      user_name: data?.username,
      phone_no: data?.phone,
      email: data?.email,
      password: data?.password,
      country: data?.country,
    };

    try {
      const res = await dispatch(signup(apiPayload));
      if (res?.status === 1) {
        navigate(LOCAL_ROUTE.login);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <section className="contact-detail pt-90 login-signup-wraper">
        <div className="theme__container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="form-wraper">
                <div className="section-heading-wraper mb-xl-3 mb-2">
                  <div className="d-flex flex-column">
                    <h5 className="mb-xl-2 mb-1 one-side-fency-heading">
                      Let’s Connect
                    </h5>
                    <h2 className="mb-xl-3 mb-1 theme-color">Sign Up</h2>
                  </div>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <Form.Group className="mb-3 col-sm-6" controlId="first_name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Enter your first name"
                        {...register("first_name")}
                        isInvalid={!!errors.first_name}
                      />
                      {errors.first_name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.first_name.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 col-sm-6" controlId="last_name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Enter your last name"
                        {...register("last_name")}
                        isInvalid={!!errors.last_name}
                      />
                      {errors.last_name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.last_name.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 col-sm-6" controlId="username">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Enter your username"
                        {...register("username")}
                        isInvalid={!!errors.username}
                      />
                      {errors.username && (
                        <Form.Control.Feedback type="invalid">
                          {errors.username.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 col-sm-6" controlId="email">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        className="w-100"
                        type="email"
                        size="lg"
                        placeholder="Enter your e-mail address"
                        {...register("email")}
                        isInvalid={!!errors.email}
                      />
                      {errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 col-sm-6" controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        className="w-100"
                        type="text"
                        size="lg"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                        isInvalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <Form.Control.Feedback type="invalid">
                          {errors.phone.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 col-sm-6" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          className="w-100"
                          type={showPassword ? "text" : "password"}
                          size="lg"
                          placeholder="Enter your Password"
                          {...register("password")}
                          isInvalid={!!errors.password}
                        />
                        <div
                          className="eye-icon position-absolute end-10 top-50 translate-middle-y"
                          style={{ right: "10px", cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </div>
                      </div>
                      {errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        size="lg"
                        {...register("country")}
                        isInvalid={!!errors.country}
                        disabled={loading} // Disable dropdown if data is still loading
                      >
                        <option value="">Select your country</option>
                        {!loading && countries?.map((country, index) => (
                          <option key={index} value={country?.id}>
                            {country?.name}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.country && (
                        <Form.Control.Feedback type="invalid">
                          {errors.country.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                  <div
                    className={`btn-holder mt-xl-4 mt-2 d-flex justify-content-end align-items-end ${isSubmitting ? "disabled" : ""
                      }`}
                  >
                    <button
                      disabled={isSubmitting}
                      className="theme-btn"
                      type="submit"
                    >
                      {isSubmitting ? "Submit..." : "Submit"}
                      <FontAwesomeIcon
                        className="arrow1"
                        icon={faChevronRight}
                      />
                    </button>
                  </div>
                  <div className="forgot-password mt-xl-3 mt-2">
                    Already Have An Account?
                    <Link to="/login" className="theme-color me-xl-4 me-2">
                      Login Now
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

export default Signup;

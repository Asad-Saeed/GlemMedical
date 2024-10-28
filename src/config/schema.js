import * as Yup from "yup";

// Signup validation
export const signupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers")
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  phone: Yup.string()
    .matches(/^\+?\d{11,13}$/, "Phone number must be 11 to 13 digits and can start with +")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  country: Yup.string(),
});

// Login validation
export const loginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required("User Name or Email is required")
    .test(
      "is-valid-username-or-email",
      "User Name or Email is not valid",
      (value) => {
        return (
          /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value) ||
          value.trim().length > 0
        );
      }
    ),
  password: Yup.string().required("Password is required"),
});

// Profile update schema
export const profileUpdateSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  profession: Yup.string(),
  phone: Yup.string()
    .matches(/^\+?\d{11,13}$/, "Phone number must be 11 to 13 digits and can start with +")
    .required("Phone number is required"),
  // country: Yup.string(),
});

// Change password schema
export const passwordChangeSchema = Yup.object().shape({
  current_password: Yup.string().required("Current Password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

// Image upload schema
export const imageUploadSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File Size is too large", (value) => {
      return value && value[0] && value[0].size <= 1048576; // 1MB
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
});

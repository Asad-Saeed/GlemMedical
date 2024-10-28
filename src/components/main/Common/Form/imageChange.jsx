import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Images } from "../../../../assets/assets";
import { imageUploadSchema } from "../../../../config/schema";
import { updateImage } from "../../../../redux/profile/profileActions";

const ImageUploadComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState(user?.data?.image || "");

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, [, selectedImage, localStorage.getItem("selectedImage")]);

  const {
    control: controlImage,
    formState: { errors: imageErrors, isSubmitting: imageIsSubmitting },
  } = useForm({
    resolver: yupResolver(imageUploadSchema),
    mode: "all",
  });

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData?.get("image")) {
      try {
        const res = await dispatch(
          updateImage(formData, user?.data?.accessToken)
        );

        if (res?.status === 1) {
          setSelectedImage(res.image);
          localStorage.setItem("selectedImage", res?.image);
        }
      } catch (error) {
        console.error("Error during image upload:", error);
      }
    } else {
      console.error("No image file selected");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      localStorage.setItem("selectedImage", imageUrl);
    }
  };

  return (
    <div className="col-xxl-3 col-lg-4 order-1 order-lg-0 mt-4 mt-lg-0">
      <div className="white-bg">
        <div className="change-image-wizard d-flex flex-column align-items-center justify-content-center">
          <div
            className="image mx-auto cursor-pointer d-flex flex-column align-items-center justify-content-center"
            role="button"
            title="Choose image"
          >
            <img
              src={selectedImage || Images.moreCourse3}
              className="img-fluid"
              alt="Selected"
            />
          </div>
          <form onSubmit={handleManualSubmit} className="w-100">
            <div className="form-group ">
              <Controller
                name="image"
                control={controlImage}
                render={({ field }) => (
                  <input
                    className="form-control mb-2"
                    type="file"
                    id="imageUpload"
                    {...field}
                    onChange={(e) => {
                      handleFileChange(e);
                      field.onChange(e);
                    }}
                    accept="image/jpeg, image/png"
                  />
                )}
              />
              {imageErrors.image && (
                <div className="invalid-feedback">
                  {imageErrors.image.message}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className={`theme-btn ${imageIsSubmitting ? "disabled" : ""}`}
              >
                {imageIsSubmitting ? "Saving Changes..." : "CHANGE IMAGE"}
              </button>
            </div>
          </form>
          <p className="mt-2">
            Image size should be under 1MB and ratio 200px.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadComponent;

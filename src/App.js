import {React, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import {Helmet} from "react-helmet";
import { fetchSettings } from './redux/settings/settingActions';
import Home from "./components/main/Home/Home";
import ContactUs from "./components/main/pages/ContactUs/Contact";
import Login from "./components/main/pages/Login/Login";
import Signup from "./components/main/pages/Signup/Signup";
import AboutUs from "./components/main/pages/AboutUs/AboutUs";
import Coursespage from "./components/main/pages/Coursespage/Coursespage";
import CourseDetail from "./components/main/pages/Coursespage/CourseDetail";
import Cart from "./components/main/pages/Cart/Cart";
import Checkout from "./components/main/pages/CheckOut/CheckOut";
import StudentProfile from "./components/main/pages/StudentProfile/StudentProfile";
import WatchList from "./components/main/pages/WatchList/index";
import Quizz from "./components/main/pages/Quizzes/Quizz";
import PrivateRoute from "./components/routes/privateRoute";
import PublicRoute from "./components/routes/publicRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import useAutoLogout from "./helpers/hooks/useAutoLogout";
import { useSelector, useDispatch  } from "react-redux";
import ThankYou from "./components/main/Common/ThankYou/ThankYou";

function App() {
  const dispatch = useDispatch();
  const settingData = useSelector((state) => state?.settings?.settingsData?.data?.settings)
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);
  useAutoLogout();
  return (
    <div className="App">
      <Helmet>
				<title>{settingData?.site_title}</title>
				<meta name="title" content={settingData?.meta_title} />
				<meta name="keyword" content={settingData?.meta_keyword} />
				<meta name="description" content={settingData?.meta_description} />
				<link rel="canonical" href={window.location.href}></link>
				<meta property="og:url" content={window.location.href}></meta>
			</Helmet>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout settings={settingData} />}>
            <Route index element={<Home />} />
            <Route path="contact-us" element={<ContactUs settings={settingData} />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="courses" element={<Coursespage />} />
            <Route path="courses-detail/:id" element={<CourseDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route
              path="checkout"
              element={<PrivateRoute element={Checkout} />}
            />
            <Route
              path="student-profile"
              element={<PrivateRoute element={StudentProfile} />}
            />
            <Route
              path="watch-lists"
              element={<PrivateRoute element={WatchList} />}
            />
            <Route
              path="quizz"
              element={<PrivateRoute element={Quizz} />}
            />
          </Route>
          <Route
            path="thank-you"
            element={<PrivateRoute restricted={true} element={ThankYou} />}
          />
          <Route
            path="login"
            element={<PublicRoute restricted={true} element={Login} />}
          />
          <Route
            path="sign-up"
            element={<PublicRoute restricted={true} element={Signup} />}
          />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

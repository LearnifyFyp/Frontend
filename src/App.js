import React, { Suspense, lazy } from "react";
import "react-phone-input-2/lib/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./Components/Loader";
import BeforeLoginRoute from "./Helper/BeforeLoginRoute";
import ProtectedRoute from "./Helper/ProtectedRoute";
const Landing = lazy(() => import("./Screens/Landing"));
const Login = lazy(() => import("./Screens/Login"));
const Signup = lazy(() => import("./Screens/Signup"));
const UpdateProfile = lazy(() => import("./Screens/UpdateProfile"));
const UpdatePassword = lazy(() => import("./Screens/UpdatePassword"));
const AboutUs = lazy(() => import("./Screens/AboutUs"));
const CourseDetail = lazy(() => import("./Screens/CourseDetail"));
const ContactUs = lazy(() => import("./Screens/ContactUs"));
const FindTutors = lazy(() => import("./Screens/FindTutors"));
const TutorDashboard = lazy(() => import("./Screens/TutorDashboard"));
const StudentDashboard = lazy(() => import("./Screens/StudentDashboard"));
const SellCourses = lazy(() => import("./Screens/SellCourses"));
const CreateMeeting = lazy(() => import("./Screens/CreateMeeting"));
const SoldLesson = lazy(() => import("./Screens/Admin/SoldLesson"));
const PrivacyPolicy = lazy(() => import("./Screens/PrivacyPolicy"));
const TermAndConditions = lazy(() => import("./Screens/TermAndConditions"));
const BillingTermAndConditions = lazy(() =>
  import("./Screens/BillingTermAndConditions")
);

const CreateAndUpdateTutorCourse = lazy(() =>
  import("./Screens/CreateAndUpdateTutorCourse")
);
// Admin Screen
const Users = lazy(() => import("./Screens/Admin/Users"));
const Course = lazy(() => import("./Screens/Admin/Course"));
const Contact = lazy(() => import("./Screens/Admin/Contact"));
const Chat = lazy(() => import("./Screens/Chat"));
function App() {
  return (
    <>
      <ToastContainer />

      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            {/* without login */}
            <Route path="/" exact element={<Landing />} />
            <Route path="/about-us" exact element={<AboutUs />} />
            <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              exact
              element={<TermAndConditions />}
            />
            <Route
              path="/billing-terms-and-conditions"
              exact
              element={<BillingTermAndConditions />}
            />
            <Route
              path="/contact-us"
              exact
              element={<ProtectedRoute file={<ContactUs />} />}
            />
            <Route path="/find-tutors/:slug" exact element={<FindTutors />} />
            <Route path="/course-detail/:id" exact element={<CourseDetail />} />
            {/* before login */}
            <Route
              path="/login"
              exact
              element={<BeforeLoginRoute file={<Login />} />}
            />
            <Route
              path="/signup"
              exact
              element={<BeforeLoginRoute file={<Signup />} />}
            />
            {/* After login */}
            <Route
              path="/tutor-dashboard"
              exact
              element={<ProtectedRoute file={<TutorDashboard />} />}
            />
            <Route
              path="/create-and-update-tutor-course"
              exact
              element={<ProtectedRoute file={<CreateAndUpdateTutorCourse />} />}
            />
            <Route
              path="/student-dashboard"
              exact
              element={<ProtectedRoute file={<StudentDashboard />} />}
            />
            <Route
              path="/update-profile"
              exact
              element={<ProtectedRoute file={<UpdateProfile />} />}
            />
            <Route
              path="/update-password"
              exact
              element={<ProtectedRoute file={<UpdatePassword />} />}
            />
            <Route
              path="/sell-courses"
              exact
              element={<ProtectedRoute file={<SellCourses />} />}
            />
            <Route
              path="/create-meeting/:id"
              exact
              element={<ProtectedRoute file={<CreateMeeting />} />}
            />
            <Route
              path="/chat"
              exact
              element={<ProtectedRoute file={<Chat />} />}
            />

            {/* Admin */}
            <Route
              path="/users"
              exact
              element={<ProtectedRoute file={<Users />} />}
            />
            <Route
              path="/course"
              exact
              element={<ProtectedRoute file={<Course />} />}
            />
            <Route
              path="/sold-course"
              exact
              element={<ProtectedRoute file={<SoldLesson />} />}
            />
            <Route
              path="/contact"
              exact
              element={<ProtectedRoute file={<Contact />} />}
            />
            <Route path="*" exact element={<Landing />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;

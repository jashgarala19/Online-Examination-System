import "./css/App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import StudentMainDashboard from "./components/Student/StudentMainDashboard";
import TeacherMainDashboard from "./components/Teacher/TeacherMainDashboard";
import AdminMainDashboard from "./components/Admin/AdminMainDashboard";
import Department from "./components/Admin/Department";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import Class from "./components/Admin/Class";
import Course from "./components/Admin/Course";
import Teacher from "./components/Admin/Teacher";
import Student from "./components/Admin/Student";
import Class_Teacher from "./components/Admin/Class-Teacher";
import Department_Course from "./components/Admin/Department-Course";
import Course_Teacher from "./components/Admin/Course-Teacher";
import AddDepartment from "./components/Admin/AddDepartment";
import AddClasses from "./components/Admin/AddClasses";
import AddCourses from "./components/Admin/AddCourses";
import AddTeacher from "./components/Admin/AddTeacher";
import AddStudent from "./components/Admin/AddStudent";
import TeacherProfile from "./components/Teacher/TeacherProfile";
import AdminProfile from "./components/Admin/AdminProfile";
import Profile from "./components/Profile";
import Exam from "./components/Teacher/Exam";
import StudentExam from "./components/Student/StudentExam";
import StudentProfile from "./components/Student/StudentProfile";
import StudentDashboard from "./components/Student/StudentDashboard";
import InExam from "./components/Student/InExam";
import StudentResult from "./components/Student/StudentResult"
import CreateExam from "./components/Teacher/CreateExam";
import QuestionBank from "./components/Teacher/QuestionBank";
import CreateQuestionBank from "./components/Teacher/CreateQuestionBank";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LocalizationProvider} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

function App() {
  Axios.defaults.withCredentials = true;

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      setUser(foundUser);
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div>
      <Router>
        <div>
          <Routes>
            <Route
              path="/teacher/dashboard"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<TeacherDashboard />} />
              }
            />

            <Route
              path="/teacher/Exam"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<Exam />} />
              }
            />

            
<Route
              path="/teacher/Exam/add"
              exact
              element={
           
                <TeacherMainDashboard p={<CreateExam />} />
              }
            />



<Route
              path="/teacher/QuestionBank"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<QuestionBank />} />
              }
            />


<Route
              path="/teacher/QuestionBank/add"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<CreateQuestionBank />} />
              }
            />

            <Route
              path="/teacher/profile"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<TeacherProfile />} />
              }
            />

            <Route
              path="/student/dashboard"
              exact
              element={
                // whattorender()
                <StudentMainDashboard p={<StudentDashboard />} />
              }
            />

            <Route
              path="/student/Exam"
              exact
              element={
                // whattorender()
                <StudentMainDashboard p={<StudentExam />} />
              }
            />

<Route
              path="/student/Exam/InExam"
              exact
              element={
           
                <InExam />
              }
            />

            <Route
              path="/student/profile"
              exact
              element={
                // whattorender()
                <StudentMainDashboard p={<StudentProfile />} />
              }
            />

<Route
              path="/student/studentresult"
              exact
              element={
                
                <StudentMainDashboard p={<StudentResult />} />
              }
            />

            <Route
              path="/admin/dashboard"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AdminDashboard />} />
                // console.log(location.state.role);
              }
            />

            <Route
              path="/admin/course"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Course />} />
              }
            />
            <Route
              path="/admin/teacher"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Teacher />} />
              }
            />
            <Route
              path="/admin/department"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Department />} />
              }
            />

            <Route
              path="/admin/department/add"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AddDepartment />} />
              }
            />

            <Route
              path="/admin/class/add"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AddClasses />} />
              }
            />

            <Route
              path="/admin/course/add"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AddCourses />} />
              }
            />

            <Route
              path="/admin/teacher/add"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AddTeacher />} />
              }
            />

            <Route
              path="/admin/student/add"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AddStudent />} />
              }
            />
            <Route
              path="/admin/student"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Student />} />
              }
            />

            <Route
              path="/admin/class"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Class />} />
              }
            />

            <Route
              path="/admin/class_teacher"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Class_Teacher />} />
              }
            />
            <Route
              path="/admin/department_course"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Department_Course />} />
              }
            />

<Route
              path="/admin/course_teacher"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<Course_Teacher/>} />
              }
            />

            <Route
              path="/admin/profile"
              exact
              element={
                // whattorender()
                <AdminMainDashboard p={<AdminProfile />} />
              }
            />

            <Route
              path="/teacher/profile"
              exact
              element={
                // whattorender()
                <TeacherMainDashboard p={<Profile g="" />} />
              }
            />
            <Route
              path="/login"
              exact
              element={<Home r={0} />}
              // element={<Home r={0} fun={callMyFun} />}
            />

<Route
              path="/"
              exact
              element={<Home r={0} />}
              // element={<Home r={0} fun={callMyFun} />}
            />
            <Route path="/register" exact element={<Home r={1} />} />
          </Routes>
        </div>
      </Router>
    </div>
    </LocalizationProvider>
  );
}
export default App;

import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NHeader from "./components/Header/NHeader";
import { Switch, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import AuthContainer from "./components/Auth/AuthContainer";
import StudentView from "./components/StudentView/StudentView";
import userFetch from "./hooks/fetchUser";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import fetchStudents from "./hooks/fetchStudent";
import Companies from "./components/Companies/Companies";
import CompanyView from "./components/Companies/CompanyView";
import axios from "axios";
import "./App.scss";

function App() {
  const [companyContacts, setCompanyContacts] = useState([]);
  useEffect(() => {
    axios.get("/api/companies").then(companies => {
      setCompanyContacts(companies.data);
    });
  }, []);
  userFetch("/api/user");

  const {
    students,
    loading,
    getStudentAssessments,
    student,
    getHTMLCompetencies,
    getStudentCompetencies
  } = fetchStudents("/api/students");
  const user = useSelector(state => state.userReducer.user);

  return (
    <div className="App">
      {user ? (
        <>
          <NHeader />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Layout flexDirection="column" className="home-container">
                    <Home />
                  </Layout>
                );
              }}
            />
            <Route
              exact
              path="/students"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    justifyContent="flex-start"
                    className="student-view-container"
                    padding="30px 0 0 0"
                  >
                    ,
                    <StudentView
                      page="Students"
                      students={students}
                      loading={loading}
                      getStudentAssessments={getStudentAssessments}
                      getStudentCompetencies={getStudentCompetencies}
                      getHTMLCompetencies={getHTMLCompetencies}
                    />
                  </Layout>
                );
              }}
            />
            <Route
              path="/companies"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    className="companies-container"
                    padding="40px 0 100px"
                  >
                    <Route
                      path="/companies/add"
                      render={() => {
                        return (
                          <Companies
                            companyContacts={companyContacts}
                            setCompanyContacts={setCompanyContacts}
                          />
                        );
                      }}
                    />
                    <Route
                      path="/companies/view"
                      render={() => {
                        return (
                          <CompanyView
                            companyContacts={companyContacts}
                            setCompanyContacts={setCompanyContacts}
                          />
                        );
                      }}
                    />
                  </Layout>
                );
              }}
            />
            <Route
              path="/students/profile/:id"
              render={({ match }) => {
                return (
                  <Layout
                    flexDirection="column"
                    className="student-profile-container"
                  >
                    <StudentProfile
                      match={match}
                      student={student}
                      getStudentAssessments={getStudentAssessments}
                    />
                  </Layout>
                );
              }}
            />
          </Switch>
        </>
      ) : (
        <AuthContainer />
      )}
    </div>
  );
}

export default App;

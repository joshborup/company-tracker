import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import { Link } from "react-router-dom";
import JobPrep from "./JobPrep";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
export default function StudentProfile({ match }) {
  const { id } = match.params;
  const [competencies, setCompetencies] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [html, setHtml] = useState([]);
  const [resume, setResume] = useState("");

  const [hide, setHide] = useState(true);

  function getStudentAssessments(id) {
    axios.get(`/api/students/assessments/${id}`).then(studentAssessments => {
      setAssessments(studentAssessments.data);
    });
  }

  function getStudentCompetencies(id) {
    axios.get(`/api/students/competencies/${id}`).then(competencies => {
      setCompetencies(competencies.data);
    });
  }

  function getHTMLCompetencies(id) {
    axios.get(`/api/students/html/${id}`).then(html => {
      setHtml(html.data);
    });
  }
  useEffect(() => {
    getStudentAssessments(id);
    getHTMLCompetencies(id);
    getStudentCompetencies(id);
  }, [id]);
  const mappedAssessment = assessments.map(assessment => {
    return (
      <div
        className="assessments"
        key={assessment.id}
        style={
          assessment.passed
            ? { background: "rgba(0,255,0,0.6)" }
            : { background: "rgba(255,0 ,0,0.6)" }
        }
      >
        <div>{assessment.assessment_name}</div>
        <div>{assessment.passed ? <FaCheck /> : <FaTimes />}</div>
      </div>
    );
  });
  const mappedCompetencies = competencies.map(competency => {
    return (
      <div
        className="assessments"
        key={competency.id}
        style={
          competency.passed
            ? { background: "rgba(0,255,0,0.6)" }
            : { background: "rgba(255,0 ,0,0.6)" }
        }
      >
        <div>{competency.competency_name}</div>
        <div>{competency.passed ? <FaCheck /> : <FaTimes />}</div>
      </div>
    );
  });
  const mappedHTML = html.map(html => {
    return (
      <div
        className="assessments"
        key={html.id}
        style={
          html.passed
            ? { background: "rgba(0,255,0,0.6)" }
            : { background: "rgba(255,0 ,0,0.6)" }
        }
      >
        <div>{html.competency_name}</div>
        <div>{html.passed ? <FaCheck /> : <FaTimes />}</div>
      </div>
    );
  });

  return (
    <div className="profile-assessments">
      <Link to="/students">Back</Link>
      <h1>{assessments[0] && assessments[0].name}</h1>
      <JobPrep
        id={id}
        hide={hide}
        resume={resume}
        setHide={setHide}
        setResume={setResume}
      />
      <h2>Academics</h2>
      <div className="academics-container">
        <div>
          <h1>Assessments</h1>
          {mappedAssessment}
        </div>
        <div>
          <h1>Competencies</h1>
          {mappedCompetencies}
        </div>
        <div>
          <h1>HTML/CSS</h1>
          {mappedHTML}
        </div>
      </div>
    </div>
  );
}

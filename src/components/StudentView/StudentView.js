import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function CustomView({ loading, students }) {
  const dispatch = useDispatch();
  const { cohort, name } = useSelector(state => state.studentReducer);
  const mappedStudents = students
    .filter(student => {
      if (name) {
        return student.name.toLowerCase().includes(name.toLowerCase());
      } else if (cohort) {
        return student.cohort === cohort;
      } else {
        return student;
      }
    })
    .map(student => {
      return (
        <div
          className="individual-students"
          style={
            student.active
              ? null
              : {
                  background: "grey"
                }
          }
          key={student.id}
        >
          <Link to={`/students/profile/${student.id}`}>
            <div className={student.active ? "name" : "name inactive"}>
              {student.name}
            </div>
            <div className={student.active ? "email" : "email inactive"}>
              {student.email}
            </div>
            <div className={student.active ? "cohort" : "cohort inactive"}>
              <span>{student.cohort}</span>
            </div>

            <div>
              <FaExternalLinkAlt />
            </div>
          </Link>
        </div>
      );
    });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "black", marginBottom: "5px" }}>
          Students for {!cohort ? "All Cohorts" : cohort.toUpperCase()}
        </h1>
      </div>
      <div className="student-filters">
        <select
          onChange={e => {
            dispatch({ type: "SET_COHORT", payload: e.target.value });
            dispatch({ type: "SET_NAME", payload: "" });
          }}
          value={cohort}
        >
          <option value="">All Cohorts</option>
          {students.length
            ? students
                .reduce((accu, stu, ind, arr) => {
                  if (accu.indexOf(stu.cohort) === -1) {
                    return accu.concat(stu.cohort);
                  } else return accu;
                }, [])
                .map(cohort => {
                  return (
                    <option key={cohort} value={cohort}>
                      {cohort}
                    </option>
                  );
                })
            : ""}
        </select>
        <input
          value={name}
          onChange={({ target: { value } }) => {
            dispatch({ type: "SET_COHORT", payload: "" });
            dispatch({ type: "SET_NAME", payload: value });
          }}
          placeholder="search student by name..."
        />
      </div>
      <div>
        <div className="individual-students heading">
          <div>Name</div>
          <div>Email</div>
          <div>Cohort</div>
          <div>Profile</div>
        </div>
        {loading || mappedStudents}
      </div>
    </div>
  );
}

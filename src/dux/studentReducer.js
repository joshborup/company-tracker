const INITIAL_STATE = {
  students: [],
  cohort: "",
  name: ""
};

const SET_STUDENTS = "SET_STUDENTS";
const SET_COHORT = "SET_COHORT";
const SET_NAME = "SET_NAME";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    case SET_COHORT:
      return {
        ...state,
        cohort: action.payload
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};

export function setStudents(students) {
  return {
    type: SET_STUDENTS,
    payload: students
  };
}

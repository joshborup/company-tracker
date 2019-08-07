import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
export default function FetchStudent(url) {
  const [loading, setLoading] = useState(false);

  const students = useSelector(({ studentReducer: { students } }) => students);
  const student = useSelector(({ studentReducer: { student } }) => student);
  const dispatch = useDispatch();

  useEffect(() => {
    let current = true;

    if (current) {
      setLoading(true);
      axios.get(url).then(studentList => {
        dispatch({ type: "SET_STUDENTS", payload: studentList.data });
        setLoading(false);
      });
    }
    return () => (current = false);
  }, [url, dispatch]);
  return {
    students,
    loading,
    student
  };
}

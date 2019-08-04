import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function FetchUser(url) {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();
  function getUser() {
    axios.get(url).then(res => {
      dispatch({ type: "SET_USER", payload: res.data });
    });
  }
  useEffect(() => {
    axios
      .get("/api/user")
      .then(res => {
        dispatch({ type: "SET_USER", payload: res.data });
      })
      .catch(err => console.log(err));
  }, [dispatch]);
  console.log(user);
  return [user, getUser];
}

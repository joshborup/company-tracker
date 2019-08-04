const INITIAL_STATE = {
  user: null
};

const SET_USER = "SET_USER";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

import axios from "axios";

export const auth = () => {
  return async dispatch => {
    await axios.get("/api/current_user").then(res => {
      dispatch({
        type: "GET_USER",
        payload: res.data,
      });
    });
  };
};

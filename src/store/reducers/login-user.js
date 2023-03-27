import { SET_USER } from "../../constants/action-types";

const initialState = {};
const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      var copy = state;
      copy = action.payload[0];
      return copy;
    default:
      return state;
  }
};

export default loginUserReducer;

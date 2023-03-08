import { SET_CHARACTER } from "../../constants/action-types";

const initialState = [{}];
const loginUserDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTER:
      var copy = state;
      copy = action.payload;
      return copy;
    default:
      return state;
  }
};

export default loginUserDetailReducer;

import { SET_CLASS } from "../../constants/action-types";
const initialState = [{}];
const classInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASS:
      var copy = state;
      copy = action.payload;
      return copy;
    default:
      return state;
  }
};

export default classInfoReducer;

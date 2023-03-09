import { SET_ROOT_CLASS } from "../../constants/action-types";
const initialState = [{}];
const rootClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOT_CLASS:
      var copy = state;
      copy = action.payload;
      return copy;
    default:
      return state;
  }
};

export default rootClassReducer;

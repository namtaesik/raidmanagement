import { ADD_MENU, SET_SELECTOR } from "../../constants/action-types";
const initialState = {
  menu: [
    { path: "/", name: "홈" },
    //{ path: "/Home", name: "홈" },
    { path: "/Sub", name: "서브" },
    { path: "/Raid/ChanmiNoonNa", name: "찬미" },
  ],
  selector: 0,
};

const navMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU:
      // 230118 | 추가기능은 안씀
      //return {...state, menu:[...state.menu, action.payload]}
      return state;
    case SET_SELECTOR:
      var copy = state;
      copy.selector = action.payload.selector;

      return copy;
    default:
      return state;
  }
};

export default navMenuReducer;

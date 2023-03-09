import { fabClasses } from "@mui/material";
import { ADD_MENU, SET_SELECTOR } from "../../constants/action-types";
const initialState = {
  menu: [
    { useyn: true, path: "/", name: "홈", auth: false, loginHide: true },
    //{ path: "/Home", name: "홈" },
    { useyn: true, path: "/Sub", name: "서브", auth: true },
    { useyn: true, path: "/Raid", name: "레이드일정", auth: true },
    {
      useyn: true,
      path: "/CharacterManagement",
      name: "캐릭터관리",
      auth: true,
    },
    { useyn: false, path: "/Test", name: "테스트Page", auth: true },
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

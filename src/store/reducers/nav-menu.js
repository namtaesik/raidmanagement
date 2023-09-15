import { ADD_MENU, SET_SELECTOR } from "../../constants/action-types";
import HouseIcon from "@mui/icons-material/House";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Diversity1Icon from '@mui/icons-material/Diversity1';
const initialState = {
  menu: [
    {
      useyn: true,
      path: "/",
      name: "홈",
      auth: false,
      loginHide: true,
      icon: <HouseIcon />,
    },
    //{ path: "/Home", name: "홈" },
    { useyn: false, path: "/Sub", name: "서브", auth: true },
    // {
    //   useyn: true,
    //   path: "/Raid",
    //   name: "레이드일정",
    //   auth: true,
    //   icon: <EventNoteIcon />,
    // },
    {
      useyn: true,
      path: "/RaidV2",
      name: "컨텐츠 선택",
      auth: true,
      icon: <EventNoteIcon />,
    },
    {
      useyn: true,
      path: "/CharacterManagement",
      name: "캐릭터관리",
      auth: true,
      icon: <ManageAccountsIcon />,
    },
    {
      useyn: true,
      path: "/JobOffer",
      name: "구인공고",
      auth: true,
      icon: <Diversity1Icon />,
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

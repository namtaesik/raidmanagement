import { combineReducers } from "redux";
import navMenu from "./nav-menu";
import loginUser from "./login-user";
import loginUserDetail from "./login-user-detail";
import rootClass from "./root-class";
import classInfo from "./class-info";
import contentsName from "./RaidV2/content-name";
// redux-persist (새로고침해도 stroe 저장)
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// redux-persist config 작성
const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["loginUser", "loginUserDetail", "contentsName"], // target (reducer name)
};
// 21.01.19 | combineReducers : 여러 reducer를 하나로 묶어주는 친구
const rootReducer = combineReducers({
  navMenu: navMenu,
  loginUser: loginUser,
  loginUserDetail: loginUserDetail,
  rootClass: rootClass,
  classInfo: classInfo,
  contentsName: contentsName,
});
//export default rootReducer;
// persistReducer로 감싸기
export default persistReducer(persistConfig, rootReducer);

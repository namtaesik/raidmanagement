import { combineReducers } from "redux";
import navMenu from "./nav-menu";
import loginUser from "./login-user";
import loginUserDetail from "./login-user-detail";
// 테스트용 store
import testUser from "./test/user-store";
import testUserDetail from "./test/user-detail-store";

// 21.01.19 | combineReducers : 여러 reducer를 하나로 묶어주는 친구
const rootReducer = combineReducers({
  navMenu,
  loginUser,
  loginUserDetail,
  testUser,
  testUserDetail,
});
export default rootReducer;

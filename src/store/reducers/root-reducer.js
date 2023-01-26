import { combineReducers } from "redux";
import navMenu from './nav-menu';

// 21.01.19 | combineReducers : 여러 reducer를 하나로 묶어주는 친구
const rootReducer = combineReducers({
    navMenu
    });
  export default rootReducer;
import { ADD_MENU, SET_SELECTOR } from "../../constants/action-types";
export const addMenu = menu => ({ 
    type: ADD_MENU,
    payload: menu
  });
  export const getTitle = selector => ({ 
    type: SET_SELECTOR,
    payload: selector
  });
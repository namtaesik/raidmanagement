import { SET_USER } from "../../constants/action-types";

const initialStateTest = {
  id: "admin",
  nickname: "nickname",
  expeditionName: "expeditionAdmin",
  characters: [
    {
      expedition_name: "expeditionAdmin",
      name: "admin_character1",
      level: 1300.01,
      class: "ShuSha",
      job: "Holi",
    },
    {
      expedition_name: "expeditionAdmin",
      name: "admin_character2",
      level: 1300.01,
      class: "ShuSha",
      job: "Holi",
    },
    {
      expedition_name: "expeditionAdmin",
      name: "admin_character3",
      level: 1300.01,
      class: "ShuSha",
      job: "Holi",
    },
    {
      expedition_name: "expeditionAdmin",
      name: "admin_character4",
      level: 1300.01,
      class: "ShuSha",
      job: "Holi",
    },
  ],
};
const initialState = {};
const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      var copy = state;
      copy = action.payload[0];
      return copy;
    default:
      return state;
  }
};

export default loginUserReducer;

const initialState = {
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

const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default loginUserReducer;

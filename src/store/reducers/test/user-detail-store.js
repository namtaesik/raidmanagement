const SET_STATE = "SET_STATE";
const initialState = [
  {
    userId: 1,
    characterId: 1,
    characterName: "character1",
    characterLevel: 1472.25,
    classCode: "Reaper",
    className: "리퍼",
  },
  {
    userId: 1,
    characterId: 2,
    characterName: "character2",
    characterLevel: 1472.25,
    classCode: "Reaper2",
    className: "리퍼2",
  },
];

const test_userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default test_userDetailReducer;

const initialState = {
  userId: 1,
  userName: "테스트아이디1",
  userGrant: "User",
};
const test_userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default test_userReducer;

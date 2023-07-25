export default {
  getEmailId: (state) => state.emailId,
  // getNickName: (state) => state.nickName,
  getErrorState: (state) => state.errorState,
  getIsAuth: (state) => state.isAuth,
  loggedIn(state) {
    return !!state.user;
  },
};

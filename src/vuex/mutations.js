import * as types from "./mutation_types";

export default {
  [types.EMAIL_ID](state, emailId) {
    state.emailId = emailId;
  },
  [types.NICK_NAME](state, nickName) {
    state.nickName = nickName;
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  },
  [types.LOADING_STATUS](state, loadingStatus) {
    state.loadingStatus = loadingStatus;
  },
  headerDarkToggle(state) {
    state.theme = state.theme === "light" ? "dark" : "light";
  },
};

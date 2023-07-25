import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state: {
    theme: "light",
    emailId: null,
    nickName: null,
    isAuth: false,
    loadingStatus: false,
  },
  mutations,
  getters,
  actions,
});

import axios from "axios";

const getUserInfo = (emailId, password) => {
  const reqData = {
    emailId: emailId,
    password: password,
  };

  //   let serverUrl = "http://localhost:3000";
  const res = axios.post("/api/v1/authenticate", reqData, {
    headers: {
      "Content-type": "application/json",
    },
  });
  return res;
  //   return axios.post("/api/v1/authenticate", reqData, {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
};

export default {
  async doLogin(emailId, password) {
    try {
      const getUserInfoPromise = getUserInfo(emailId, password);
      const [userInfoResponse] = await Promise.all([getUserInfoPromise]);
      console.log(userInfoResponse);
      console.log(Promise.all([getUserInfoPromise]));
      if (userInfoResponse && userInfoResponse.data.success) {
        localStorage.setItem("token", userInfoResponse.data.data.token.token);
        localStorage.setItem(
          "emailId",
          userInfoResponse.data.data.token.emailId
        );
        localStorage.setItem("name", userInfoResponse.data.data.token.nickName);
        localStorage.setItem(
          "menuList",
          JSON.stringify(userInfoResponse.data.data.menuList)
        );
        return userInfoResponse;
      } else {
        return "notFound";
      }
    } catch (err) {
      console.error(err);
    }
  },
};

<script>
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex"; //vuex 추가

export default {
  data() {
    return {
      emailId: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    ...mapActions(["login"]), //vuex/actions에 있는 login 함수

    async signIn() {
      //async 함수로 변경
      if (this.emailId === "") {
        this.errMsg = "Email is empty";
        return;
      }

      if (this.password === "") {
        this.errMsg = "Password is empty ";
        return;
      }

      //로그인 API 호출
      // debugger;
      try {
        let loginResult = await this.login({
          emailId: this.emailId,
          password: this.password,
        });
        if (loginResult) {
          this.goToPages();
        } else {
          this.errMsg = "로그인이 실패하였습니다. 확인요청드립니다.";
        }
      } catch (err) {
        if (err.message.indexOf("Network Error") > -1) {
          this.errMsg = "서버에 접속할 수 없습니다. 상태를 확인해주세요.";
        }else if(err.status == "00"){
          this.errMsg ="해당 회사는 승인 대기중입니다. 가입승인 후 이용가능합니다.";
        }else {
          this.errMsg = err.message;
        }
      }
    },
    goToPages() {
      this.$router.push({
        name: "Pricing",
      });
    },
  },
  computed: {
    ...mapGetters({
      errorState: "getErrorState",
    }),
  },
};
</script>
<template>
  <v-row>
    <v-col
      cols="12"
      lg="6"
      class="mh-100vh bg-primary-lighten-5 d-flex justify-center align-center"
    >
      <div class="text-center">
        <v-avatar size="320" rounded="0">
          <img class="mw-320" src="@/assets/images/session/logo2.png" />
        </v-avatar>
        <div class="text-h4 f-600 mb-2">BUILD TRUST</div>
        <div class="text-subtitle-2 text-secondary-darken-1">
          SEED는 IT 기술의 선두주자로써 최고를 자부합니다.
        </div>
      </div>
    </v-col>
    <v-col
      cols="12"
      lg="6"
      class="d-flex justify-center align-center bg-gray-lighten-5"
    >
      <v-container class="text-center">
        <v-avatar size="80" class="mb-8">
          <img class="w-full" src="@/assets/images/logo.svg" alt="" />
        </v-avatar>
        <div class="text-h5 f-600 mb-2">Sign in to SEED</div>
        <div class="text-18 text-secondary font-weight-medium mb-10">
          New Here ?
          <router-link to="/session/register" class="text-decoration-none f-600"
            >Create an account</router-link
          >
        </div>

        <v-text-field
          v-model="emailId"
          type="emailId"
          variant="outlined"
          hide-details
          class="mb-4 mw-700"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          variant="outlined"
          hide-details
          class="mb-4 mw-700"
          label="Password"
          @keyup.enter="signIn"
        ></v-text-field>

        <div class="d-flex justify-space-between align-center mw-700 mb-7">
          <v-checkbox
            hide-details
            v-model="checkbox"
            color="primary"
            label="Default checkbox"
          ></v-checkbox>
          <router-link
            to="#"
            class="text-error text-decoration-none font-weight-medium"
            hide-details
            >Forgot Password ?</router-link
          >
        </div>
        <div class="my-2" v-if="errMsg">
          <v-alert
            color="error"
            theme="dark"
            border="start"
            prominent
            class="mw-700 mx-auto"
          >
            <i class="tio- text-18 me-2"> error_outlined </i>
            {{ errMsg }}
          </v-alert>
        </div>
        <div class="d-flex mw-700">
          <v-btn
            @click="signIn"
            block
            color="primary"
            flat
            class="text-capitalize"
            >Sign In</v-btn
          >
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
.mw-320 {
  max-width: 320px;
  // min-width: 100%;
  margin: 0 auto;
}
.mw-700 {
  max-width: 700px;
  margin: 0 auto;
}
.br-0 {
  border-radius: 0;
}
.w-full {
  width: 100%;
}
.mh-100vh {
  min-height: 100vh;
}
</style>

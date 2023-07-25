<script setup>
import { ref } from "@vue/reactivity";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import axios from 'axios';
// import { baseURL } from "../../AxiosCreate.js";

// const router = useRouter();

// const emailId = ref("");
// const password = ref("");
// const businessRegistrationNumber = ref("");
// const nickName = ref("");
// const companyName = ref("");

const formData = ref({
  emailId: "",
  password: "",
  businessRegistrationNumber: "",
  nickName: "",
  companyName: "",
});

// const loading = ref(false);
// const errMsg = ref("");

// const data = ref(null);

const rules = {
  required: (value) => !!value || "필수 입력사항입니다.",
  // emailId: (value) => {
  //   const pattern =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return pattern.test(value) || "Invalid Email";
  // },
  // password: (value) => {
  //   const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   return pattern.test(value) || "Incorrect password";
  // },
  // businessRegistrationNumber: (value) => {
  //   const pattern = /^[[0-9]{3}-[0-9]{2}-[0-9]{5}$/;
  //   return pattern.test(value) || "";
  // },
};
// const formatBusinessRegistrationNumber = () => {
//   if (
//     formData.value.businessRegistrationNumber.length === 3 ||
//     formData.value.businessRegistrationNumber.length === 6
//   ) {
//     formData.value.businessRegistrationNumber += "-";
//   }
// };
const register = async () => {
  debugger;
  // if (!formData.value.emailId) {
  //   errMsg.value = "Email is Empty";
  // }
  // if (!formData.value.password) {
  //   errMsg.value = "password is Empty ";
  // }
  // if (!formData.value.nickName) {
  //   errMsg.value = "name is Empty";
  // }

  // try {
  //   const response = await fetch('/api/api/developer/signIn', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData.value),
  //   });
  //   const jsonData = await response.json();
  //   data.value = jsonData;
  // } catch (error) {
  //   console.error(error);
  // }

  //const axios = apiInstance();
  // try {
  //   const response = await baseURL.post('/api/developer/signln')
  // }
  // const response = await baseURL.post('/api/developer/signln')

  // .then(function(response){
  //   console.log(response);
  //   console.log(import.meta.env.VITE_APP_BASE_URL)
  // })
  // .catch(function(error){
  //   console.log(error);
  // })

  // const response = await baseURL
  //   .post("/api/developer/signln", {
  //     "": "",
  //     "": "",
  //   })

  //   .then(function (response) {
  //     console.log(response);
  //     console.log(import.meta.env.VITE_APP_BASE_URL);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // loading.value = true;
  // setTimeout(() => (loading.value = false), 2000);

    // return axios.post("/api/v1/join/signup", formData, {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    const res = axios.post("/api/v1/join/signup", formData, {
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(res);
  return res;
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
        <img class="mw-400" src="@/assets/images/session/signin.svg" />
        <div class="text-h4 f-600 mb-2">BUILD TURST</div>
        <div class="text-subtitle-2 text-secondary-darken-1">
          SEED는 IT 기술의 선두주자로써 최고를 자부합니다.
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex justify-center align-center">
      <v-container class="text-center">
        <v-avatar size="80" class="mb-8">
          <img src="@/assets/images/logo.svg" alt="" />
        </v-avatar>
        <div class="text-h5 f-600 mb-2">Sign in to SEEDIT</div>
        <div class="text-18 text-secondary font-weight-medium mb-10">
          Get Started free
        </div>

        <v-row class="mw-700">
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="formData.emailId"
              type="email"
              color="primary"
              hide-details="auto"
              label="이메일"
              :rules="[rules.required, rules.emailId]"
              placeholder="test@seedit.co.kr"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="formData.password"
              type="password"
              color="primary"
              hide-details="auto"
              label="패스워드"
              :rules="[rules.required, rules.password]"
              placeholder="알파벳 문자 포함, 숫자포함 최소 8자리"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              color="primary"
              hide-details
              type="input"
              v-model="formData.nickName"
              :rules="[rules.required]"
              label="이름"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              color="primary"
              v-model="formData.companyName"
              hide-details
              type="input"
              label="회사명"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="formData.businessRegistrationNumber"
              color="primary"
              hide-details="auto"
              :rules="[rules.businessRegistrationNumber]"
              label="사업자번호"
              placeholder="123-45-67890"
              maxlength="12"
              counter
              @input="formatBusinessRegistrationNumber"
              :clearable="true"
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="errMsg">
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
          </v-col>
          <v-col cols="12">
            <v-btn
              @click="register"
              block
              rounded="xl"
              flat
              color="primary"
              class="text-capitalize mb-5"
              :loading="loading"
              >Sign Up</v-btn
            >
            <div class="text-caption font-weight-medium text-secondary">
              By signing up, I agree to SEEDIT
              <router-link
                to="#"
                class="text-decoration-none text-secondary-darken-5 f-600"
                >Terms of Service & Privacy Policy</router-link
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.mw-400 {
  max-width: 400px;
  margin: 0 auto;
}
.mw-700 {
  max-width: 700px;
  margin: 0 auto;
}
.mh-100vh {
  min-height: 100vh;
}
</style>

<script>

export default {
  data(){
    return {
      success: false,
      formData: {
        emailId: "",
        password: "",
        businessRegistrationNumber: "",
        nickName: "",
        companyName: "",},

      rules: {
        required: v => !!v || "필수 입력사항입니다.",
        emailId:
          v => /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v) || "Invalid Email",
        password:
          v => /^(?=.*[a-zA-Z])[!@#$%^*+=-]?(?=.*[0-9]).{8,}$/.test(v) || "Invalid password",
        businessRegistrationNumber:
          v => this.countNum(v) || "Invalid BusinessRegistrationNumber",
      },

      errMsg: "",

    };
  },
  methods: {
    chkEmail(value){
      const validateEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

      if(!value){
        this.errMsg = "Email is empty";
      }else if(!validateEmail.test(value)){
        this.errMsg = "Invalid Email";
      }else return true;
      
      return false;
    },

    chkPassword(value){
      const validatePassword = /^(?=.*[a-zA-Z])[!@#$%^*+=-]?(?=.*[0-9]).{8,}$/

      if(!value){
        this.errMsg = "Password is empty ";
      }else if(!validatePassword.test(value)){
        this.errMsg = "Invalid Password";
      }else return true;
      
      return false;
    },

    formValidation(formData){

      if(!this.chkEmail(formData.emailId)){
        ;
      }else if(!this.chkPassword(formData.password)){
        ;
      }else if(!formData.nickName){
        this.errMsg = "Name is empty";
      }else if(!formData.companyName){
        this.errMsg = "Company Name is empty";
      }else if(formData.businessRegistrationNumber.length != 10){
        this.errMsg = "Invalid BusinessRegistrationNumber";
        if(!formData.businessRegistrationNumber)
          this.errMsg = "BusinessRegistrationNumber is empty";
      }else{
        this.errMsg = "";
        return true;
      }

      return false;
    },


    //숫자만 입력 가능
    onlyNum(){
      this.formData.businessRegistrationNumber = this.formData.businessRegistrationNumber.replace(/[^0-9]/g, '');
    },

    //입력된 값의 길이에 대한 유효성 검사
    countNum(v){
      if(v.length === 10){
        return true;
      }else return false;
    },

    //회원가입
    register(formData){
      this.errMsg = "";

      if(this.formValidation(formData)){
        try{
          this.axios.post("/api/v1/join/signup", formData, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            if (res.data.success) {
              this.success = true;
              this.$router.push('Signin');
            }else {
              console.log("실패");
              this.errMsg = res.data.message;
            }
          });
        } catch(err){
          this.errMsg = "Register Fail"
        }
      }
    },

  },
};
</script>


<template>
  <v-overlay
      class="align-center justify-center"
      v-model="success"
      >
      <v-alert color="primary" text="회원가입이 완료되었습니다." >
      </v-alert>
    </v-overlay>
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
          <img src="@/assets/images/logo.svg" alt="" @click="this.$router.push('Signin')" />
        </v-avatar>
        <div class="text-h5 f-600 mb-2">Sign in to SEEDIT</div>
        <div class="text-18 text-secondary font-weight-medium mb-10">
          Get Started free
        </div>
        <v-form>
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
                hide-details="auto"
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
                hide-details="auto"
                :rules="[rules.required]"
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
                :rules="[rules.required, rules.businessRegistrationNumber]"
                label="사업자번호"
                placeholder="하이픈(-) 제외 숫자 10자리"
                maxlength="10"
                counter
                @input="onlyNum"
                @keyup.enter="register(formData)"
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
                @click="register(formData)"
                block
                rounded="xl"
                flat
                color="primary"
                class="text-capitalize mb-5"
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
        </v-form>
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

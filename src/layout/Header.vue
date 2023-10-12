<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import AutoCompleteSearch from "../components/layout/AutoCompleteSearch.vue";
import store from "@/vuex/store.js";

const router = useRouter();
const isSearch = ref(false);
const isSidebar = ref(false);
const nickName = localStorage.getItem("name");
// const headerBtn = document.querySelector(".header-btn-toggle"
const search = () => {
  isSearch.value = !isSearch.value;
};

const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  localStorage.clear();
  location.href = "/";
};

const emits = defineEmits(["sidebarToggle", "headerDarkToggle"]);
function getSidebarToggle() {
  emits("sidebarToggle");
}
function getHeaderDarkToggle() {
  emits("headerDarkToggle");
}

const profile1 = ref([
  { text: "Set Status" },
  { text: "Profile & Account" },
  { text: "Settings" },
  { text: "Manage Team" },
]);
const profile2 = ref([{ text: "Sign Out" }]);

const notifications = ref([
  {
    prependAvatar: "/src/assets/images/faces/avatar.png",
    title: "Brian Warner?",
    subtitle: `<span class="text-caption text-gray text-notification font-weight-medium">Change an issue from in this project</span>`,
  },

  {
    prependAvatar: "/src/assets/images/faces/2.jpg",
    title: "Kiara Hamptoon",
    subtitle: `<span class="text-caption text-gray text-notification font-weight-medium">Nice Work! You really nailed it. Keep it Up Man</span>`,
  },
  {
    prependAvatar: "/src/assets/images/faces/3.jpg",
    title: "Kiara Hamptoon",
    subtitle: `<span class="text-caption text-gray text-notification font-weight-medium">Nice Work! You really nailed it. Keep it Up Man</span>`,
  },
]);
const theme = ref("light");
const toggleTheme = () =>
  (theme.value = theme.value === "light" ? "dark" : "light");

const searchShow = false;
</script>

<template>
  <div class="header">
    <v-container v-if="isSearch">
      <!-- <div class="search-field d-flex w-100">
        <i class="text-20 text-secondary search-icon tio-">search</i>
        <input
          type="text"
          placeholder="Search"
          class="flex-1 border-secondary rounded-lg py-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="close-search me-4"
          @click="isSearch = false"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <v-btn
          color="primary"
          class="text-capitalize ml-4 d-none d-sm-block"
          flat
          >Search</v-btn
        >
      </div> -->
    </v-container>
    <v-container v-else class="d-flex justify-space-between">
      <v-btn
        @click="getSidebarToggle"
        flat
        icon
        class="header-btn-toggle transparent"
      >
        <i class="tio- text-primary"> menu_left </i>
      </v-btn>

      <!--search btn-->
      <div class="d-flex align-center">
        <v-btn
          class="me-1 transparent"
          icon
          size="x-small"
          elevation="0"
          @click="searchShow = true"
          ><i class="tio- text-secondary text-20"> search </i>
          <v-overlay
            activator="parent"
            location-strategy="connected"
            scroll-strategy="close"
          >
            <v-card class="search-card">
              <h4 class="ma-3 text-subtitle-2 font-weight-bold">Menu Search</h4>
              <v-divider></v-divider>
              <v-row>
                <v-col class="ma-3">
                  <AutoCompleteSearch></AutoCompleteSearch>
                </v-col>
              </v-row>
            </v-card>
          </v-overlay>
        </v-btn>

        <!-- <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              rounded="pill"
              class="transparent"
              icon=""
              size="x-small"
              dark
              elevation="0"
              v-bind="props"
            >
              <i class="tio- text-secondary text-20"> search </i>
            </v-btn>
          </template>
          <div class="search-card">
            <h4 class="ma-3 text-subtitle-2 font-weight-bold">Menu Search</h4>
            <v-divider></v-divider>
            <v-row>
              <v-col class="ma-3">
                <AutoCompleteSearch></AutoCompleteSearch>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-btn flat block="" class="text-primary text-13"
              >확인</v-btn
            >
          </div>
        </v-menu> -->

        <!--theme btn-->
        <!-- <v-btn
          class="me-1 transparent"
          icon
          size="x-small"
          elevation="0"
          @click="$store.commit('headerDarkToggle')"
          ><i class="tio- text-warning text-20"> brightness_1 </i></v-btn
        > -->

        <!--help btn-->
        <!--
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              rounded="pill"
              class="transparent"
              icon=""
              size="x-small"
              dark
              elevation="0"
              v-bind="props"
            >
              <i class="tio- text-primary h2">help</i>
            </v-btn>
          </template>
          <div class="notification-menu">
            <h4 class="ma-3 text-subtitle-2 font-weight-bold">Help Desk</h4>
            <v-divider></v-divider>
            <v-row>
              <v-col class="ma-2">
                <i class="tio- text-primary h1">call</i>
                <span class="ma-6 text-subtitle">1588-xxxx</span><br>
                <img class="mw-320 company-logo ma-2" src="@/assets/images/session/logo2.png" />
                <p class="text-subtitle-2 f-600">(주) 시드아이티</p>
                <p class="text-subtitle-2">서울시 금천구 가산디지털1로 142 801호</p>
              </v-col>
            </v-row>

            <v-tabs grow color="primary">
              <v-tab class="text-13 text-capitalize">Messages(2)</v-tab>
              <v-tab class="text-13 text-capitalize">Archive</v-tab>
            </v-tabs>
            <v-list
              class="notifications-list"
              three-line
              :items="notifications"
            >
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="subtitle"></div>
              </template>
            </v-list>
            <v-divider></v-divider>
            <v-btn flat block="" class="text-primary text-13">확인</v-btn>
          </div>
        </v-menu> 
      -->
        <!-- menus as a profile  -->

        <!--user btn-->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              rounded="pill"
              class="transparent"
              icon=""
              dark
              size="x-small"
              elevation="0"
              v-bind="props"
            >
              <i class="tio- text-primary text-20">user</i>
              <!-- <v-badge
                bordered
                location="bottom-left"
                color="light-green"
                dot
                offset-x="2"
                offset-y="0"
              >
                <v-avatar size="26">
                  <i class="tio- text-primary text-20"> user </i>
                </v-avatar>
              </v-badge> -->
            </v-btn>
          </template>
          <div class="profile-menu">
            <!-- <v-avatar size="30" class="ma-3">
              <img class="w-full" src="@/assets/images/faces/avatar.png" />
            </v-avatar> -->
            <h4 class="ma-3 text-subtitle-2 font-weight-bold">
              {{ nickName }}
            </h4>
            <v-divider></v-divider>
            <v-spacer align="end">
              <v-btn
                color="error"
                class="ma-3 text-capitalize"
                flat
                @click="handleSignOut"
                >Sign out
              </v-btn>
            </v-spacer>
            <!-- <v-list density="compact">
              <v-list-item
                v-for="(item, i) in profile1"
                :key="i"
                :value="item"
                active-color="primary"
                min-height="30px"
              >
                <v-list-item-title
                  class="text-13 font-weight-medium"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item>
              <v-divider class="pb-2 mt-2"></v-divider>
              <v-list-item
                v-for="(item, i) in profile2"
                :key="i"
                :value="item"
                active-color="primary"
                min-height="30px"
              >
                <v-list-item-title
                  class="text-13 font-weight-medium"
                  v-text="item.text"
                  @click="handleSignOut"
                  v-if="isLoggedIn"
                ></v-list-item-title>
              </v-list-item>
            </v-list> -->
          </div>
        </v-menu>
        <!-- <v-btn @click="handleSignOut" v-if="isLoggedIn">Sign Out</v-btn> -->
      </div>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
::v-overlay_content(.search-card) {
  width: 400px;
  height: 100px;
}
.search-card {
  position: absolute;
  right: 0;
  background-color: #fff;
  max-height: 1000px;
  max-width: 300px;
  width: 300px;
  box-shadow: rgb(28 85 128 / 15%) 0px 4px 28px 3px;
  @media (max-width: "410px") {
    right: -80px;
  }
}
::v-deep(.notifications-list .v-list-item-title) {
  font-size: 13px;
  font-weight: 600;
}
::v-deep(.notifications-list .v-list-item) {
  cursor: pointer;
}
::v-deep(.notifications-list .v-list-item:hover) {
  background-color: rgb(227, 240, 255);
}
.header {
  position: relative;
}

.notification-menu {
  position: absolute;
  right: 0;
  background-color: #fff;
  max-width: 300px;
  width: 300px;
  box-shadow: rgb(28 85 128 / 15%) 0px 4px 28px 3px;
  @media (max-width: "410px") {
    right: -80px;
  }
}
.profile-menu {
  position: absolute;
  right: 0;
  background-color: #fff;
  max-width: 200px;
  width: 200px;
  border-radius: 4px;
}
.search-field {
  position: relative;
  background-color: #fff;
  .search-icon {
    position: absolute;
    padding-left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  .close-search {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 95px;
    &:hover {
      color: #6366f1;
      cursor: pointer;
    }
    @media (max-width: "599px") {
      right: 0;
    }
  }
  input {
    padding-left: 40px;
    &:focus {
      outline: none;
    }
  }
}
.mouse-hover {
  cursor: pointer;
}
.search-bar-wrapper {
  position: absolute;
  top: 0;
  z-index: 999;
  width: calc(100%);
  background-color: #fff;
}
.transparent {
  background-color: transparent;
}

.company-logo{
  width: 100px;
}
</style>

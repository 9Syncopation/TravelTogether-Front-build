<template>
  <section class="header-container flex center space-between">
    <router-link
      @click.native="resetNavBar()"
      class="route header-route header-logo"
      to="/"
      >Tripi</router-link
    >

    <div class="navbar flex row center" :class="openMenu">
      <i class="menu-icon fas fa-times" @click="toggleMenu"></i>
      <router-link
        @click.native="resetNavBar()"
        class="route header-route"
        to="/"
        >Trips <i class="arrow fas fa-arrow-circle-right"></i
      ></router-link>
      <router-link
        @click.native="setNavBar()"
        class="route header-route"
        to="/about"
        >About <i class="arrow fas fa-arrow-circle-right"></i
      ></router-link>
      <v-spacer></v-spacer>
      <div class="header-user">
		<router-link
		v-if="!isUserLogIn"
          @click.native="setNavBar()"
          class="route signup header-route"
          to="/signup"
          >Sign up <i class="arrow fas fa-arrow-circle-right"></i
        ></router-link>
        <div
          v-if="!isUserLogIn"
          class="route login header-route"
          @click="toggleLogin"
        >
          Login <i class="arrow fas fa-arrow-circle-right"></i>
        </div>
        <div v-else @click="doLogOut" class="route login header-route">
          Logout <i class="arrow fas fa-arrow-circle-right"></i>
        </div>
        <login-box @close="closeLogin" v-if="isShowLogin" />
      </div>
    </div>
    <div class="menu-box-mobile">
      <img
        @click="toggleSideBar"
        v-show="isUserLogIn"
        class="logIn-user-img"
        :src="userImg"
      />
      <button class="menu-btn" @click="toggleMenu">
        <i class="fas fa-bars fa-lg"></i>
      </button>
    </div>
    <userDrawer
      @sideBar="closeSideBar"
      :class="openDrawer"
      v-show="isUserLogIn"
    ></userDrawer>
  </section>
</template>

<script>
import loginBox from "./Login";
import userDrawer from "./UserDrawer";

export default {
  data() {
    return {
      isShowLogin: false,
      isOpenSideBar: false,
      isOpenMenu: false,
      userImg: "",
    };
  },
  methods: {
    toggleLogin() {
    //   console.log("toggle");
      this.isShowLogin = !this.isShowLogin;
    },
    setImg(user) {
      this.userImg = user.imgUrl;
    },
    doLogOut() {
      this.$store.dispatch({ type: "logOut" });
      this.isOpenSideBar = false;
    },
    closeLogin() {
      this.isShowLogin = false;
    },
    toggleSideBar() {
      this.isOpenSideBar = !this.isOpenSideBar;
    },
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    closeSideBar() {
      this.isOpenSideBar = false;
    },
    setNavBar() {
      //Change Navbar with isHomePage - Todo!
      document
        .querySelector(".header-container")
        .classList.add("restAppNavbar");
    },
    resetNavBar() {
    //   console.log("daaa");

      document
        .querySelector(".header-container")
        .classList.remove("restAppNavbar");
    },
  },
  computed: {
    isUserLogIn() {
      let user = this.$store.getters.loggedinUser;
      if (user) this.setImg(user);
    //   console.log("isUserLogIn -> user", user);
      return user;
    },
    openDrawer() {
      return { "drawer-open": this.isOpenSideBar };
    },
    openMenu() {
      return { "menu-open": this.isOpenMenu };
    },
  },
  components: {
    loginBox,
    userDrawer,
  },
};
</script>

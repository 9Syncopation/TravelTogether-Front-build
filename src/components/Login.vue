<template>
  <section class="login-container flex column center">
    <div class="log flex row center space-between">
      <span>Login</span>
      <button title="Exit" @click="closeLogin">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form class="flex column" @submit.prevent="doLogin">
      <div class="flex center login-input">
        <i class="fas fa-lock"></i>
        <input
          id="name"
          type="text"
          placeholder="Your Email"
          v-model="loginCred.email"
        />
      </div>
      <div class="flex center login-input">
        <i class="fas fa-users"></i>
        <input
          id="pass"
          type="password"
          placeholder="Your Password"
          v-model="loginCred.password"
        />
      </div>
      <button class="login-box-btn">Login</button>
      <div>
        Not Registered yet ?
        <router-link class="header-route login-box-route" to="/signup" @click.native="closeLogin"
          >Sign up</router-link
        >
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginCred: {},
    };
  },
  methods: {
    closeLogin() {
      this.$emit("close", false);
    },
    async doLogin() {
      const cred = this.loginCred;
	  if (!cred.email || !cred.password) 
	//   console.log("Missing value");
      await this.$store.dispatch("login", cred);
      this.loginCred = {};
      this.closeLogin();
    },
  },
};
</script>

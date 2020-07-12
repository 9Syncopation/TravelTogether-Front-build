<template>
  <section class="signup-main container flex row">
    <div class="signup-form">
      <form
        action="#"
        class="form-sign flex column space-between center"
        @submit.prevent="doSignup"
      >
        <h1>Create An Account</h1>
        <div class="social-container">
          <a href="#" class="social">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social">
            <i class="fab fa-google-plus-g"></i>
          </a>
          <a href="#" class="social">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="First Name" v-model="signUpCred.firstName" required />
        <input type="text" placeholder="Last name" v-model="signUpCred.lastName" required />
        <input type="email" placeholder="Email" v-model="signUpCred.email" required />
        <input type="password" placeholder="Password" v-model="signUpCred.password" required />

        <span>Help Us to Get You Know Better:</span>
        <v-select
          class="select"
          placeholder="Choose Favorite Trips"
          v-model="value"
          :items="items"
          chips
          label="Trips"
          multiple
          outlined
        ></v-select>

        <button class="signup-btn">Sign Up</button>
      </form>
    </div>
    <div class="signup-side flex column center">
      <h1>Hello Friend</h1>
      <p>
        Enter Your Personal Details Meet Pepole Like You
        And Start A
        <span>Journey With US</span>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    items: ["sport","shopping","art","extreme","party","relax","cultural","religon"],
    value: [],
    signUpCred: {}
  }),
  methods: {
    doSignup() {
      const cred = {...this.signUpCred, userImg:"https://img.icons8.com/clouds/2x/user.png"}
    //   console.log("doSignup -> cred", cred)
      if (!cred.email || !cred.password || !cred.firstName || !cred.lastName)
        return "Missing User Details , Sign up";
      this.$store.dispatch("signUp", cred );
      this.signUpCred = {};
    }
  }
};
</script>
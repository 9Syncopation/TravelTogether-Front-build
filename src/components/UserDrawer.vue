<template>
  <section class="drawer flex column center">
    <div v-if="user" class="drawer-header">
      <div class="intro flex row center space-between">
        <span>Welcome </span>
        <i @click="toggleSideBar" class="fas fa-times"></i>
      </div>
      <div class="personal-details flex row center space-between">
          <img class="logIn-user-img" :src="user.imgUrl" />
        <div class="flex column">
          <span>{{ user.firstName }}</span>
          <span>{{ user.email }}</span>
        </div>
      </div>
    </div>
    <div class="drawer-body flex column align-start justify-start">
      <div><i class="fas fa-home"></i> Profile</div>
      <div><i class="fas fa-suitcase-rolling"></i> My Trips</div>
      <div><i class="fas fa-plus"></i> Create Trip</div>
      <div><i class="fas fa-users"></i> Friends</div>
    </div>
    <i class="fas fa-user-cog user-settings"></i>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    toggleSideBar() {
      this.$emit("sideBar", false);
    },
  },
};
</script>

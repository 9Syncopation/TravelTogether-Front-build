<template>
  <li
    class="top-rated-container"
    @click="showDetails()"
    data-aos="fade-right"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-once="true"
  >
    <div
      class="top-rated-body flex column center justify-end"
      :style="{ backgroundImage: 'url(' + trip.imgUrl[1] + ')' }"
    >
      <!-- <img :src="user.imgUrl"/> -->
      <div class="top-rated-details-box flex column">
        <span class="top-rated-title">{{trip.title}}</span>
        <span>
          {{trip.rating}}
          <i class="fas fa-star"></i>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import router from "../router";

export default {
  props: ["trip", "users"],
  methods: {
    showDetails() {
      router.push(`/trips/details/${this.trip._id}`);
      this.setNavbar();
    },
    setNavbar() {
      document
        .querySelector(".header-container")
        .classList.add("restAppNavbar");
    }
  },
  computed: {
    user() {
      return this.users.find(user => user._id === this.trip.creatorID);
    }
  },
  componenets: {
    router
  }
};
</script>
<template>
  <section
    class="card"
    @click="showDetails()"
    data-aos="fade-right"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-once="true"
  >
    <v-card class="mx-auto flex column space-between" max-width="300" height="450" flat hover light>
      <v-img
        class="white--text align-end"
        max-height="200px"
        min-height="200px"
        :src="currTrip.imgUrl[0] "
      >
        <v-card-title class="flex row space-between">
          <span>{{currTrip.section | capitalize}}</span>
          <span @click.prevent.stop="toggleLike()">
            <i :class="like" class="fas fa-heart"></i>
          </span>
        </v-card-title>
      </v-img>

      <div class="card-header flex column no-wrap">
        <div class="card-creator-details flex row align-center">
          <v-list-item-avatar color="grey">
            <v-img :src="user.imgUrl"></v-img>
          </v-list-item-avatar>
          <v-card-subtitle class>{{user.firstName}} {{user.lastName}}</v-card-subtitle>
        </div>

        <div class="card-subtitle flex row space-between">
          <h5 class="card-title">{{currTrip.title | snippetTitle}}</h5>
          <h5 class="card-date">{{getDateStart}}</h5>
        </div>
      </div>

      <v-card-text class="card-text text--primary">{{currTrip.desc | snippet}}</v-card-text>

      <v-card-actions class="card-footer flex space-between">
        <div class="card-memebers">
          <v-list-item-avatar
            class="memeber-list-avatar ma-0 mr-n3"
            v-for="currMemeber in memebers"
            :key="currMemeber._id"
            color="grey"
            size="30"
          >
            <v-img :src="currMemeber.imgUrl"></v-img>
          </v-list-item-avatar>
          <span v-if="checkMemebersCount">Be First To Join!</span>
        </div>
        <div class="participants">{{currTrip.memebers.length}} / {{currTrip.maxCapacity}}</div>
        <div class="card-memebers-rating">
          {{currTrip.rating}}
          <i class="fas fa-star star"></i>
        </div>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
// import router from "../router";
export default {
  props: ["currTrip", "users"],
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    showDetails() {
      this.$router.push(`/trips/details/${this.currTrip._id}`);
      this.setNavbar();
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    setNavbar() {
      document
        .querySelector(".header-container")
        .classList.add("restAppNavbar");
    }
  },
  computed: {
    getDateStart() {
      let date = new Date(new Date().getTime() + this.currTrip.date.start);
      let formattedDate = date.toDateString();
      const [, month, day, year] = formattedDate.split(" ");
      let today = new Date();
      //Two Difftent types .... The first is String the second Num
      if(day === today.getDate()+'')
        return `Today !`
      return `${day}-${month}-${year}`;
    },
    user() {
      return this.users.find(user => user._id === this.currTrip.creatorID);
    },
    checkMemebersCount() {
      return this.currTrip.memebers.length === 0;
    },
    like() {
      return { like: this.isLiked };
    },
    //Other Option - less accurate currTrip.memebers....
    memebers() {
      return this.currTrip.memebers.map(memeber => {
        return this.users.find(user => user._id === memeber._id);
      });
    }
  }
};
</script>
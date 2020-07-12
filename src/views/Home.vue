<template>
  <section class="home">
    <section class="home-top-header flex column center">
      <div class="search-box flex column center">
        <h1>checking connection</h1>
        <h3>Find Co-Travelers like yourself to plan your next Adventure</h3>
        <div class="search-box">
          <input class="destination" type="search" placeholder="Choose Destination" />
          <button>
            <i class="hero-icon fas fa-search-location fa-lg"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="top-rated">
      <h2>Trending Trips</h2>
      <ul class="top-rated-list clean-list flex row center wrap">
        <Trip-recommended
          v-for="currTrip in tripsRecommended"
          :key="currTrip._id"
          :trip="currTrip"
          :users="users"
        ></Trip-recommended>
      </ul>
    </section>
    <section class="home-main">
      <h2>Find Your Next Adventure</h2>
      <Trip-list></Trip-list>
    </section>
  </section>
</template>

<script>
import TripList from "../components/TripList";
import TripRecommended from "../components/TripRecommended";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("loadTrips");
    this.$store.dispatch("loadUsers");
  },
  mounted() {},
  computed: {
    users() {
    //   return Object.assign([], this.$store.getters.users);
      return this.$store.getters.users;
    },
    trips() {
	//   return Object.assign([], this.$store.getters.trips);
	//!delete the object assign => no need 
      return this.$store.getters.trips;
    },
    tripsRecommended() {
      let trips = this.$store.getters.trips;
    //   console.log(trips);
      trips.sort((a, b) => b.rating - a.rating);
    //   console.log(trips, "1");
      return trips.slice(0, 5);
    }
  },
  components: {
    TripList,
    TripRecommended
  }
};
</script>

<style lang="scss" scoped>
</style>

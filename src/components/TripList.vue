<template>
  <section class="cards-container container-home">
    <trip-preview
      v-for="currTrip in tripsToShow"
      :key="currTrip._id"
      :currTrip="currTrip"
      :users="users"
    ></trip-preview>
  </section>
</template>

<script>
import tripPreview from "./TripPreview";

export default {
  created() {},
  computed: {
    tripsToShow() {
      let trips = this.$store.getters.trips;
    //   let trips = Object.assign([], this.$store.getters.trips);
      return trips;
    },
    users() {
    //   return Object.assign([], this.$store.getters.users);
      return this.$store.getters.users;
    }
  },
  components: {
    tripPreview
  }
};
</script>
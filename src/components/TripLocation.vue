<template>
  <section class="trip-locations">
    <draggable v-model="trip.locations" ghost-class="ghost">
      <transition-group type="transition" name="flip-list">
        <div
          class="sort-list flex row center space-between"
          v-for=" (location,idx) in trip.locations"
          :key="location.placeName"
        >
          <span class="stop-index ">{{idx+1}}</span>
          <div class="location-box flex row center space-between">
            <div class="location-info">
              <div class="location-name">{{location.placeName}}</div>
              <div class="location-address">{{location.address}}</div>
            </div>

            <div class="location-icons">
              <i class="fas fa-map-pin map-pin"></i>
              <i class="far fa-heart heart"></i>
              <i class="fas fa-times remove"></i>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
  </section>
</template>
<script>
import draggable from "vuedraggable";

export default {
  props: ["trip"],
  data() {
    return {};
  },
  computed: {
    changeLocation() {
      return this.trip.locations;
    }
  },
  watch: {
    changeLocation() {
      this.$store.dispatch("updateTrip", this.trip);
    }
  },
  components: {
    draggable
  }
};
</script>
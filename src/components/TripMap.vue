<template>
  <section class="tripMap">
    <!-- <input ref="autocomplete" 
        placeholder="Search" 
        class="search-location"
        onfocus="value = ''" 
    type="text" />-->
    <GmapMap ref="map1" class="map" :center="center" :zoom="8" map-type-id="terrain">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
      />
    </GmapMap>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import googleService from "../services/google-service.js";

export default {
  // props: ["trip"],
  data() {
    return {
      markers: [],
      origin: null,
      destination: null,
      isDirectionRenderer: false
    };
  },
  created() {
    this.markers = this.trip.locations.map(location => {
      return { position: location.position };
    });
    this.setMapRoute();
  },
  //   mounted() {
  //     console.log('sdadssdsa')
  //   this.autocomplete = new google.maps.places.Autocomplete(
  //     (this.$refs.autocomplete),
  //     {types: ['geocode']}
  //   );
  //   console.log(this.autocomplete)
  // },

  methods: {
    setRouteMarkersProps() {
      let markers = this.markers;
      this.origin = markers[0];
      this.destination = markers[markers.length - 1];
    },
    setMapRoute() {
      this.setRouteMarkersProps();
      this.setRoutes();
    },

    async setRoutes() {
      var directionsService = await googleService.getDirecService(this.google);
      var directionsDisplay = await googleService.getDirecRender(this.google);
      await directionsDisplay.setMap(this.$refs.map1.$mapObject);
      let request = await googleService.getRequest(
        this.origin,
        this.destination,
        this.setWayPts,
        this.google
      );
      directionsService.route(request, (response, status) => {
        if (status == "OK") {
          directionsDisplay.setDirections(response);
          // this.$refs.map.fitBounds(this.setBounds());
          // this.$refs.map.panToBounds(this.setBounds());
        }
      });
    }
  },
  computed: {
    trip() {
      return this.$store.getters.getCurrTrip;
    },
    trips() {
      return this.$store.getters.trips;
    },
    google() {
      // if (!gmapApi()) location.reload();
    //   console.log(gmapApi());
      return gmapApi();
    },

    setWayPts() {
      return googleService.getWayPts(this.markers, this.google);
    },
    center() {
      let lngCount = 0;
      let latCount = 0;
      let lngAvg, latAvg;
      let length = this.markers.length;
      this.markers.forEach(marker => {
        lngCount += marker.position.lng;
        latCount += marker.position.lat;
      });
      lngAvg = lngCount / length;
      latAvg = latCount / length;
      return {
        lng: lngAvg,
        lat: latAvg
      };
    }
  },
  watch: {
    trips: function() {
    //   console.log("Trips changed");
      this.$store.dispatch("setCurr", this.trip._id);
    },
    trip: async function(newVal) {
      this.markers = newVal.locations.map(function(location) {
        return { position: location.position };
      });
    //   console.log(this.markers, "Markerts");
      this.setMapRoute();
    }
  }
};
</script>
<style scoped>
.search-location {
  background-color: blueviolet;
  width: 30vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
</style>
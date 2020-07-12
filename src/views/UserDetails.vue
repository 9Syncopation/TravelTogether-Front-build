<template>
  <section>
    <div class="container user-details">
      <div class="user-header">
        <div class="user-section flex column center"></div>
        <div class="user-profile flex center">
          <img :src="user.imgUrl" />
        </div>
      </div>
      <div class="user-info">
        <h2>{{user.firstName}} {{user.lastName}}</h2>
        <div class="user-contact">
          <button>
            <i class="far fa-comment-dots"></i>
          </button>
          <button>
            <i class="fab fa-facebook"></i>
          </button>
        </div>
      </div>
      <div class="user-trip-section flex column">
        <div class="user-story">
          <span>My Story :</span>My wanderlust was confined to the 25-day holiday benefit I got through my office job. But the urgent desire to see the world was stronger than anything else So left my British courtyard behind and entered the travel culture.
        </div>
      </div>
      <div class="user-trips">
        <h2 class="title-user-trips title">
          <i class="fas fa-vote-yea"></i> Trips Join
        </h2>
        <div class="trips-join flex row space-evenly">
          <div v-for="trip in tripsJoin" :key="trip._id" @click="showDetails(trip._id)">
            <v-card class="mx-auto card" max-width="300">
              <v-img :src="trip.imgUrl[0]" height="160px"></v-img>

              <v-card-title class="trip-title">{{trip.title}}</v-card-title>

              <v-card-subtitle class="trip-sub">{{trip.desc }}</v-card-subtitle>

              <v-card-actions>
                <v-btn color="purple user-trip-details-btn" text>Get Updated</v-btn>
                <v-spacer></v-spacer>

                <span class="trip-rate">{{trip.rating}}</span>
                <i class="fas fa-star star"></i>
              </v-card-actions>
            </v-card>
          </div>
        </div>
        <h2 class="title-user-trips title">
          <i class="fas fa-question-circle"></i> Trips Pending
        </h2>
        <div class="trips-pending">
          <div v-for="trip in tripsPending" :key="trip._id">
            <v-card class="mx-auto card" max-width="300">
              <v-img :src="trip.imgUrl[0]" height="160px"></v-img>

              <v-card-title class="trip-title">{{trip.title}}</v-card-title>

              <v-card-subtitle class="trip-sub">{{trip.desc }}</v-card-subtitle>

              <v-card-actions>
                <v-btn color="purple user-trip-details-btn" text>See Whats New</v-btn>
                <v-spacer></v-spacer>

                <span class="trip-rate">{{trip.rating}}</span>
                <i class="fas fa-star star"></i>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      users: {},
      userID: {},
      trips: null
    };
  },

  created() {
    this.users = this.$store.getters.users;
    this.trips = this.$store.getters.trips;
    this.userID = this.$route.params.id;
  },
  methods: {
      showDetails(id) {
      this.$router.push(`/trips/details/${id}`);
    },
  },
  computed: {
    user() {
      return this.users.find(user => user._id === this.userID);
    },
    tripsJoin() {
      let tripsJoin = this.user.tripsJoin.filter(trip => trip.isApproved);
      return tripsJoin.map(currTrip => {
        return this.trips.find(trip => trip._id === currTrip.tripId);
      });
    },
    tripsPending() {
      let tripsJoin = this.user.tripsJoin.filter(trip => !trip.isApproved);
      return tripsJoin.map(currTrip => {
        return this.trips.find(trip => trip._id === currTrip.tripId);
      });
    }
  },
  components: {}
};
</script>







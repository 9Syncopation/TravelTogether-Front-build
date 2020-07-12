<template>
  <!-- ! fix bug when refreshing the page the header loos position absolute -->
  <section>
    <div class="details container">
      <div class="manager-section flex column center">
        <div class="manager-profile">
          <img :src="tripCreator.imgUrl" @click="showUser(tripCreator)" />
        </div>
        <div class="manager-info">
          <h2>{{ tripCreator.firstName }} {{ tripCreator.lastName }}</h2>
          <div class="manager-contact">
            <button>
              <i class="heart far fa-heart"></i>
            </button>
            <span>({{ tripCreator.rating }})</span>
          </div>
        </div>
      </div>

      <div class="trip-section flex column">
        <div class="trip-section-header flex row center space-between">
          <h1>{{ currTrip.title }}</h1>
          <div v-if="!isRoomCreator">
            <button v-if="!isUserJoin" class="join-btn" @click="joinTrip()">
              Join Trip
            </button>
            <button v-else class="join-btn" @click="leaveTrip()">
              Leave Trip
            </button>
          </div>
          <div v-else>
            <button class="join-btn">Cancel Trip Event</button>
          </div>
          <div class="trip-section-main flex row center space-between">
            <p>{{ currTrip.desc }}</p>
          </div>
        </div>

        <div class="icon-info">
          <div class="trip-loc-time flex raw ">
            <span>
              <i class="far fa-calendar-alt"></i>
              {{ getDateStart }} - {{ getDateEnd }}
            </span>
            <span>
              <i class="fas fa-map-marked-alt"></i>
              {{ currTrip.country }}, {{ currTrip.section }}
            </span>
          </div>
        </div>
        <div class="trip-intrest flew row center justify-start wrap">
          <span class="type-label" v-for="type in tripTypes" :key="type">{{
            type | capitalize
          }}</span>
        </div>

        <div class="gallery">
          <div
            v-for="(tripImg, idx) in TripImagesToShow"
            :key="tripImg"
            :class="`img${idx + 1}`"
            :style="`--num:${restImgs}`"
          >
            <img :src="tripImg" class="image" />
          </div>
        </div>

        <v-carousel class="carousel" hide-delimiter-background show-arrows-on-hover height="auto">
          <v-carousel-item
            v-for="(tripImg, i) in tripImgs"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
            eager
          >
            <v-img :src="tripImg" aspect-ratio="1.75"></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="schedule-loc">
        <h2 class="schedule-title">Trip Schedule:</h2>
		<div>Drag and Drop to suggest a diffrent route. <br> Share your thoughts with the team at the chat board.  </div>
        <div class="creator-add" v-if="isRoomCreator">
          <i class="fas fa-plus"></i>Add Another Place To visit :
          <input type="text" placeholder="Add Another Stop" class="addStop" />
		</div>
        <div class="map-section flex column">
          <div class="main-box row space-between">
            <trip-map></trip-map>
            <trip-chat :trip="currTrip"></trip-chat>
          </div>
          <trip-location :trip="currTrip"></trip-location>
        </div>
      </div>

      <div class="social-section">
        <div class="social-group mt-0">
          <h1>On Board:</h1>
          <div class="social-imgs  ">
            <a
              v-for="memeber in tripMemebers"
              :key="memeber._id"
              class="social-individual  "
            >
              <span class="circle">
                <img :src="memeber.imgUrl" />
              </span>
            </a>
          </div>
          <div class="group-text-box flex column">
            <span class="group-text">
              <i class="fas fa-users"></i>
              {{ tripMemebersNum }} out of {{ currTrip.maxCapacity }} are taken!
            </span>
            <span class="group-text join">Join Us</span>
          </div>
          <div class="pendings">
            <h1 ml-3>Pending List:</h1>
            <div class="badge-box ">
              <a
                v-for="(pending, idx) in tripPendings"
                :key="idx"
                class="pending-image"
              >
                <div v-if="isRoomCreator" class="text-center">
                  <v-badge
                    color="white"
                    @click.native.stop="approveMemeber(pending)"
                  >
                    <template v-slot:badge>
                      <i class="fas fa-check"></i>
                    </template>
                    <v-badge
                      color="white"
                      @click.native.stop="denyMemeber(pending)"
                      left
                    >
                      <template v-slot:badge>
                        <i class="fas fa-times"></i>
                      </template>
                      <img class="circle" :src="pending.imgUrl" />
                    </v-badge>
                  </v-badge>
                </div>
                <div v-else>
                  <img class="circle" :src="pending.imgUrl" />
                </div>
              </a>
            </div>
            <h3 v-if="pendingCount">
              No Pending Request yet ... Be The First !
            </h3>
          </div>
        </div>
        <!-- <trip-chat :trip="currTrip"></trip-chat> -->
      </div>
    </div>
    <div class="openChat">
      <i class="fas fa-comments"></i>
    </div>
  </section>
</template>

<script>
import tripLocation from "../components/TripLocation";
import tripChat from "../components/TripChat";
import tripMap from "../components/TripMap";
import router from "../router";
// import utilService from "../services/util-service.js";
export default {
  data() {
    return {
      isUserJoin: false,
      currTrip: {},
      user: null,
    };
  },
  methods: {
    showUser(tripCreator) {
      router.push(`/users/details/${tripCreator._id}`);
    },
    getDate(type) {
      let date = new Date(new Date().getTime() + this.currTrip.date[type]);
      let formattedDate = date.toDateString();
      const [, month, day, year] = formattedDate.split(" ");
      return `${day} ${month} ${year}`;
    },
    removePending(user) {
      let userIdx = this.currTrip.pendings.findIndex(
        (pending) => pending._id === user._id
      );
      this.currTrip.pendings.splice(userIdx, 1);
    },

    findUserTrip(currUser) {
    //   console.log("cu", currUser);
      return currUser.tripsJoin.findIndex(
        (trip) => trip.tripId === this.currTrip._id
      );
    },

    approveMemeber(candidate) {
      let user = this.users.find((currUser) => {
        return currUser._id === candidate._id;
      });
      let idx = this.findUserTrip(user);
      user.tripsJoin[idx].isApproved = true;
      this.removePending(user);
      this.currTrip.memebers.push(user);
      this.$store.dispatch("updateTrip", this.currTrip);
      this.$store.dispatch("updatePendingUser", user);
    },

    denyMemeber(user) {
      let idx = this.findUserTrip(user);
      user.tripsJoin.splice(idx, 1);
      this.removePending(user);
      this.$store.dispatch("updateTrip", this.currTrip);
      this.$store.dispatch("updatePendingUser", user);
    },

    leaveTrip() {
      this.isUserJoin = false;
      this.$store.dispatch("leaveTrip", this.user);
    },

    async joinTrip() {
      let currUser = this.$store.getters.loggedinUser;
      //Default User
      // if (!currUser) currUser = await this.$store.getters.getDefaultUser;
      if (
        currUser &&
        this.currTrip.maxCapacity > this.currTrip.memebers.length &&
        this.currTrip.creatorID !== currUser._id
      ) {
        this.user = currUser;
        let user = await this.$store.dispatch("joinTrip", this.user);
        if (user) this.isUserJoin = true;
      }
    },
  },
  created() {
    this.$store.dispatch("setCurr", this.$route.params.id);
    this.user = this.$store.getters.loggedinUser;
    this.users = this.$store.getters.users;
    this.currTrip = this.$store.getters.getCurrTrip;

    if (this.user) {
      let match = this.user.tripsJoin.find((trip) => {
        return trip.tripId === this.currTrip._id;
      });
      if (match) this.isUserJoin = true;
    }
  },
  computed: {
    tripTypes() {
      return this.currTrip.types;
    },
    tripCreator() {
      return this.users.find((user) => user._id === this.currTrip.creatorID);
    },
    tripMemebersNum() {
      return this.currTrip.memebers.length;
    },
    // tripMemebers() {
    //   return this.$store.getters.getCurrTrip.memebers;
    // },
    tripMemebers() {
      let memebers = this.$store.getters.getCurrTrip.memebers;
      return memebers.map((memeber) => {
        return this.users.find((user) => user._id === memeber._id);
      });
    },
    // tripPendings() {
    //   return this.$store.getters.getCurrTrip.pendings;
    // },
    tripPendings() {
      let pendings = this.$store.getters.getCurrTrip.pendings;
      return pendings.map((memeber) => {
        return this.users.find((user) => user._id === memeber._id);
      });
    },
    pendingCount() {
      let pendings = this.tripPendings;
      return !pendings.length || !pendings.length;
    },
    isRoomCreator() {
      if (this.user) return this.user._id === this.currTrip.creatorID;
      return false;
    },
    TripImagesToShow() {
      let tripImgs = this.currTrip.imgUrl.slice(0, 3);
      return tripImgs;
    },
    restImgs() {
      //Calculate Based On length And Not Index
      return this.currTrip.imgUrl.length - 3;
    },
    getDateStart() {
      return this.getDate("start");
    },
    getDateEnd() {
      return this.getDate("end");
    },
  },
  watch: {},

  components: {
    tripLocation,
    tripMap,
    tripChat,
  },
};
</script>

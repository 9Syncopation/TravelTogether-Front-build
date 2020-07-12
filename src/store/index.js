import Vue from 'vue'
import Vuex from 'vuex'
import tripService from '../services/trip-service'
import userService from '../services/user-service'
import UserStore from '../modules/user-store.js'
import utilService from '../services/util-service.js'

var sessionTrips = [];
var sessionTrip = [];
if (sessionStorage.trips) sessionTrips = JSON.parse(sessionStorage.trips);
if (sessionStorage.currTrip) sessionTrip = JSON.parse(sessionStorage.currTrip);



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trips: sessionTrips,
    currTrip: sessionTrip
  },
  mutations: {
    initTrips(state, { trips }) {
      utilService.store('trips',trips)
      state.trips = trips
    },
    setCurrTripById(state, id) {
      state.currTrip = state.trips.find(trip => {
        return trip._id === id.id;
      })
      utilService.store('currTrip',state.currTrip)
    },
    async updateTrip(state,{updatedTrip}){
      let idx = await state.trips.findIndex(trip => trip._id === updatedTrip._id);
      state.trips.splice(idx,1,updatedTrip);
    }
  },
  getters: {
    trips(state) {
      return state.trips
    },
    trip(state) {
      return id => state.trips.find(trip => {
        return trip._id === id
      })
    },
    getCurrTrip(state) {
      return state.currTrip;
    },
  },
  actions: {
    async loadTrips(context) {
      const trips = await tripService.query()
      context.commit({ type: 'initTrips', trips })
      return trips;
    },

    async leaveTrip(context, user) {
      let group;
      let currTrip = context.getters.getCurrTrip;
      let userIdx = user.tripsJoin.findIndex(trip => {
        return trip.tripId === currTrip._id;
      });
      (user.tripsJoin[userIdx].isApproved) ? group = 'memebers' : group = 'pendings';

      user.tripsJoin.splice(userIdx, 1)
      await context.dispatch({ type: 'updateUser', user })

      let tripIdx = currTrip[group].findIndex(grpUser => {
        return grpUser._id === user._id;
      })
      currTrip[group].splice(tripIdx, 1);
      await context.dispatch('updateTrip',currTrip);
    },

    async joinTrip(context, user) {
      let currTrip = context.getters.getCurrTrip;
      if (!user.tripsJoin) {
        user.tripsJoin = [];
      }
      user.tripsJoin.push({ tripId: currTrip._id, isApproved: false })
      currTrip.pendings.push(user);

      await context.dispatch('updateTrip',currTrip);
      await context.dispatch({ type: 'updateUser', user })
      return currTrip;
    },

    async setCurr(context, id) {
      await context.commit({ type: 'setCurrTripById', id })
    },

    async updateTrip(context, trip) {
      const updatedTrip = await tripService.update(trip);
      context.commit({type:'updateTrip', updatedTrip})
    },


  },
  modules: {
    UserStore
  },
  components: {
    userService
  }
})

<template>
  <section class="card" >
       <v-card class="mx-auto"  max-width="300" height="450" flat hover light outlined style="border-radius: 25px;"  >

              <div @click="showDetails()">
      <v-img class="white--text align-end" style="border-radius: 25px 25px 0px 0px" height="200px" :src="trip.imgUrl[0] ">
        <v-card-title>{{trip.title}}</v-card-title>
      </v-img>
      <div class ="card-header flex row no-wrap  ma-0"> 
        <div class="ma-0 mt-1 ml-3"> 
          <v-list-item-avatar color="grey ">
          <v-img :src="trip.imgUrl[3]"></v-img>
          </v-list-item-avatar>
        </div>
          <div class="flex row space-between mr-3 no-wrap"> 
          <v-card-subtitle class="pa-0 pt-4 ma-0  ">{{trip.title}}</v-card-subtitle>
          <v-card-subtitle class="pa-0 pt-4 ma-0  ">{{trip.date.start}}</v-card-subtitle>
          
          </div>
          
      </div>
  
      <v-card-text class="text--primary ellipses" height= 153px >
        <div >{{trip.desc}}</div>
  
       </v-card-text>

      </div>
      <v-card-actions class=" space-between">
        <div>
          <v-list-item-avatar color="grey" size="20">
          <v-img :src="trip.imgUrl[2]"></v-img>
          </v-list-item-avatar>
        </div>
                <v-spacer></v-spacer>

        <div class="ma-0">
        <v-btn color="primary ma-1" rounded small @click="showDetails()">Explore</v-btn>
        <v-icon color="blue ma-1 ">fas fa-heart</v-icon>
        <v-icon color="blue ma-1"></v-icon>
        </div>
      </v-card-actions>
        
    </v-card>
    
  </section>
</template>

<script>
import router from '../router'
export default {
  props: ["trip"],
  data () {
    return {
      items: [
        {
          src: "https://cdn.vox-cdn.com/thumbor/9zHVj4OnM5pYeO8rCX-W4aL-lw0=/0x0:4428x1993/1200x800/filters:focal(1872x1198:2580x1906)/cdn.vox-cdn.com/uploads/chorus_image/image/63371518/shutterstock_785442694.0.jpg",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBbvmcQoq9B7ZPzeodVFXuedhYpn5cSpNSpzriC5v6iu6va4ijQ&s",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5x-y_vEbktmzBiGsXJprpQXHoGsyCafffrIMJ7pAUapHbN0iUIQ&s",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDlup2lJc0unSOlP9JlgmxmCIVsPA5xhS3r-yBHhcp4M4Wkcw&s",
        },
      ],
    }
  },
  methods: {
    showDetails() {
      router.push(`/trips/details/${this.trip._id}`);
    }
  }
};
</script>
<template >
<section>
<div class="user-activity flex align-start ma-0 pa-0">

     <div class="user-trips-card-container">
        <v-row dense>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="10"
          >
            <v-card
              :color="item.color"
              light
              hover 
              outlined
              flat 
              
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>
                <div>
                  <v-card-title
                    class="headline"
                  ></v-card-title>
                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                </div>
  
                
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
   
      </div>

</section>
    
</template>

<script>
export default {
  
    data: ()=> ({
    items: [
      {
        color: 'white',
        src: "https://cdn.vox-cdn.com/thumbor/9zHVj4OnM5pYeO8rCX-W4aL-lw0=/0x0:4428x1993/1200x800/filters:focal(1872x1198:2580x1906)/cdn.vox-cdn.com/uploads/chorus_image/image/63371518/shutterstock_785442694.0.jpg",
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: 'white',
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBbvmcQoq9B7ZPzeodVFXuedhYpn5cSpNSpzriC5v6iu6va4ijQ&s",
        title: "{{trip.title}}",
        artist: 'Ellie Goulding',
      },
    ],
  }),

  created() {
    //  this.$store.dispatch("loadTrips");
  },
  //   // this.user = this.$store.getters.user(this.$route.params.id);
  // },
  computed: {
    //   tripTypes() {
    //   return this.user.favTrips;
    // }
    
  },
  components: {
   
    
 
  }
};
</script>

<template>
   <section>
    <div class="card card-profile">
    <img src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top">
    <div class="flex row center">
        <div class="col-lg-3 order-lg-2">
            <div class="manager-profile">
                <a href="#">
                    <img src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-4.jpg" class="rounded-circle">
                </a>
            </div>
        </div>
    </div>
    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
        <div class="d-flex justify-content-between">
            <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
            <a href="#" class="btn btn-sm btn-default float-right">Message</a>
        </div>
    </div>
    <div class="card-body pt-0">
        <div class="row">
            <div class="col">
                <div class="card-profile-stats d-flex justify-content-center">
                    <div>
                        <span class="heading">22</span>
                        <span class="description">Friends</span>
                    </div>
                    <div>
                        <span class="heading">10</span>
                        <span class="description">Photos</span>
                    </div>
                    <div>
                        <span class="heading">89</span>
                        <span class="description">Comments</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <h5 class="h3">
                Jessica Jones<span class="font-weight-light">, 27</span>
            </h5>
            <div class="h5 font-weight-300">
                <i class="ni location_pin mr-2"></i>Bucharest, Romania
            </div>
            
        </div>
    </div>
</div>
    
  </section>
</template>
<script>

    // <span class="type-label" v-for="type in tripTypes" :key="type">
    //   {{type}}
    // </span>

export default {
    data() {
    return {
        user:{},
      
    };
  },
  created() {
    // this.user = this.$store.getters.user(this.$route.params.id);
  },
  computed: {
    //   tripTypes() {
    //   return this.user.favTrips;
    // }
    
  },
  components: {
   
    
 
  }
};
</script>







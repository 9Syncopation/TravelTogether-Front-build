<template>
  <v-app>
    <div class="screen">

    <App-Header></App-Header>
    <v-content >
      <router-view></router-view>
    <App-Footer></App-Footer>
    </v-content>
    </div>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
export default {
  name: "App",

  components: {
    AppHeader,
    AppFooter
  },
  async created(){
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-footer class="footer" 
  light
    padless
  >
    <v-card
      flat
      tile
      class=" --text text-center flex column center"
          color="white"
      dense
      dark
    >
      <v-card-text >
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          
          icon
        >
          <v-icon size="24px" class="grey darken-1">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="black--text pt-0">
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey lighten-5--text">
        {{ new Date().getFullYear() }} — <strong>Elior & Eyal</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
    }),
  }
</script>
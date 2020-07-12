<template >
  <section>
    <v-row >
      <div  >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px" pa-0 ma-0 >
        <template v-slot:activator="{ on }" >
            <v-text-field  class="pa-0 ma-0 " 
              v-model="date"
              
              next-icon
              pa-0 ma-0
              readonly
              v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
    </v-row>
  </section>
</template>
<script> 
export default { 

    data: () => ({
        date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  })
}
</script>
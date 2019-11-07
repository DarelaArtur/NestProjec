<template>
  <v-card color="#0063B1" style max-width="100%">
      <v-sparkline
        :value="item.value"
        color="rgba(255, 255, 255, .7)"
        padding="15"
        smooth
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        gradient-direction="top"
        auto-draw
      >
        <template v-slot:label="item">{{ infoUser.currencySymbol }}{{ item.value }}</template>
      </v-sparkline>
      <!--v-sparkline
                  :labels="labels"
                  :value="value"
                  padding="16"
                  :gradient="['#f72047', '#ffd200', '#1feaea']"
                  gradient-direction="top"
                  auto-draw
      ></v-sparkline-->
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    item: {
      value: [423, 446, 675, 510, 590, 610, 760]
    }
  }),

    computed: mapGetters({
    infoUser: 'login/getInfoUser'
  })
  
}
</script>
<style>


</style>
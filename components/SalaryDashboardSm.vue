<template>
  <v-card style color="#0063B1" >
    <v-card-title style="color:rgba(255, 255, 255, .7)">
      <v-col>
        <v-row align="start">
          <v-icon color="rgb(57, 233, 89)" size="30">attach_money</v-icon>
          <span class="title font-weight-light mb-1">
            Salary:
            <b>{{ infoUser.currencySymbol }} 5032,00</b>
          </span>
        </v-row>
        <v-row align="start">
          <v-icon color="red" size="30">trending_down</v-icon>
          <span class="title font-weight-light mb-1">
            Expenses:
            <b>{{ infoUser.currencySymbol }} 2460,28</b>
          </span>
        </v-row>
        <v-row align="start">
          <v-icon color="yellow" size="30">add</v-icon>
          <span class="title font-weight-light mb-1">
            Balance:
            <b>{{ infoUser.currencySymbol }} 2571,72</b>
          </span>
        </v-row>
      </v-col>
      <v-btn icon class="align-self-start" size="20">
        <v-icon color="#BFBFBF" size="20">edit</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
 
  data: () => ({}),

  computed: mapGetters({
    infoUser: 'login/getInfoUser'
  })
}
</script>
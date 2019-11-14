<template>
    <v-card style max-width="100%" height="300">
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="#0063B1"
                elevation="12"
                max-width="calc(100% - 32px)"
                 height="164"
              >
                <v-card-title style="color:rgba(255, 255, 255, .7)">
                  <v-col>
                    <v-row align="start">
                      <v-icon color="rgb(57, 233, 89)" size="30">attach_money</v-icon>
                      <span class="title font-weight-light mb-1">
                        {{ $t('salary') }}:
                        <b> {{ infoUser.currencySymbol }} 5032,00</b>
                      </span>
                    </v-row>
                    <v-row align="start">
                      <v-icon color="red" size="30">trending_down</v-icon>
                      <span class="title font-weight-light mb-1">
                        {{ $t('expenses') }}:
                        <b> {{ infoUser.currencySymbol }} 2460,28</b>
                      </span>
                    </v-row>
                    <v-row align="start">
                      <v-icon color="yellow" size="30">add</v-icon>
                      <span class="title font-weight-light mb-1">
                        {{ $t('balance') }}:
                        <b> {{ infoUser.currencySymbol }} 2571,72</b>
                      </span>
                    </v-row>
                  </v-col>
                  <v-btn icon class="align-self-start" size="20">
                    <v-icon color="#BFBFBF" size="20">edit</v-icon>
                  </v-btn>
                </v-card-title>
              </v-sheet>

              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">{{ $t('monthly_expenses') }}</div>
                <div class="subheading font-weight-light grey--text">{{ $t('current_month') }}:
                  <v-chip
                    class="ma-2"
                    small
                  >
                   {{ currentMonth | stringMonth }}
                  </v-chip>
              </div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>clock</v-icon>
                <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
              </v-card-text>
            </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from "moment"
import momentTimezone from "moment-timezone"

export default {
  data: () => ({
    currentMonth: moment().month()
  }),
  
  computed: mapGetters({
    infoUser: 'login/getInfoUser'
  })
}
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}

</style>
<template>
  <v-layout column justify-right align-right>
    <v-flex xs12 sm8 md6>
      <br />
      <v-container fluid>
        <v-row dense>
          <v-col class="d-none d-md-block" :cols="6">
            <salary-dashboard-md />
          </v-col>
          <v-col class="d-none d-md-block" :cols="6">
            <expanses-dashboard-md />
          </v-col>
          <v-col class="d-sm-none" :cols="12">   
            <expanses-dashboard-sm />
          </v-col>
          <v-col class="d-sm-none" :cols="12">
            <salary-dashboard-sm />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="d-none d-md-block" :cols="6">
            <fixed-expenses />
          </v-col>
          <v-col class="d-none d-md-block" :cols="6">
            <variable-expenses />
          </v-col>
          <v-col class="d-sm-none" :cols="12">
            <fixed-expenses />
          </v-col>
          <v-col class="d-sm-none" :cols="12">
            <variable-expenses />
          </v-col>
        </v-row>
      </v-container>

      <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
        <v-icon>create</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title class="grey darken-2">Create contact</v-card-title>
          <v-container>
            <v-row>
              <v-col class="align-center justify-space-between" cols="12">
                <v-row align="center">
                  <v-avatar size="40px" class="mr-4">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                  </v-avatar>
                  <v-text-field placeholder="Name"></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field placeholder="Job title"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import FixedExpenses from '~/components/FixedExpenses.vue'
import VariableExpenses from '~/components/VariableExpenses.vue'
import SalaryDashboardMd from '~/components/SalaryDashboardMd.vue'
import ExpansesDashboardMd from '~/components/ExpansesDashboardMd.vue'
import SalaryDashboardSm from '~/components/SalaryDashboardSm.vue'
import ExpansesDashboardSm from '~/components/ExpansesDashboardSm.vue'

export default {
  components: {
    FixedExpenses,
    VariableExpenses,
    SalaryDashboardMd,
    ExpansesDashboardMd,
    SalaryDashboardSm,
    ExpansesDashboardSm
  },
  props: {
    source: String
  },

  data: () => ({
    lineWidth: null,
    lineWidth: 2,
    radius: 10,
    padding: 1,
    lineCap: 'round',
    gradientDirection: 'top',
    type: 'trend',
    fill: true,
    dialog: false,
    drawer: null,
    labels: [
      '01/jan',
      '02/fev',
      '03/marc',
      '04/apri',
      '05/may',
      '06/jun',
      '07/jul',
      '08/ago'
    ],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  })
}
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
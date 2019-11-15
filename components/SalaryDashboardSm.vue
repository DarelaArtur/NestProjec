<template>
  <v-card style color="#0063B1">
    <v-card-title style="color:rgba(255, 255, 255, .7)">
      <v-col>
        <v-row align="start">
          <v-icon color="rgb(57, 233, 89)" size="30">attach_money</v-icon>
          <span class="title font-weight-light mb-1">
            {{ $t('salary') }}:
            <b>{{ infoUser.currencySymbol }} {{ salary }}</b>
          </span>
        </v-row>
        <v-row align="start">
          <v-icon color="red" size="30">trending_down</v-icon>
          <span class="title font-weight-light mb-1">
            {{ $t('expenses') }}:
            <b>{{ infoUser.currencySymbol }} {{ totalExpenses }}</b>
          </span>
        </v-row>
        <v-row align="start">
          <v-icon color="yellow" size="30">add</v-icon>
          <span class="title font-weight-light mb-1">
            {{ $t('balance') }}:
            <b>{{ infoUser.currencySymbol }} {{ balance }}</b>
          </span>
        </v-row>
      </v-col>
      <v-btn icon class="align-self-start" size="20" @click="openDialog">
        <v-icon color="#BFBFBF" size="20">edit</v-icon>
      </v-btn>
    </v-card-title>

    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <v-card-title class="primary darken-1" style="color:white">{{
          $t('my_salary')
        }}</v-card-title>
        <v-container>
          <v-form ref="form" v-model="formValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="$t('salary')"
                  v-money="maskAmount"
                  v-model="mySalary"
                  :prefix="infoUser.currencySymbol"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="cancel()">{{
            $t('cancel')
          }}</v-btn>
          <v-btn text @click="save(mySalary)" :disabled="!mySalary">{{
            $t('save')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

import moment from 'moment'
import momentTimezone from 'moment-timezone'

import { VMoney } from 'v-money'

export default {
  directives: {
    money: VMoney
  },

  data: () => ({
    dialog: false,
    formValid: false,
    mySalary: '0.00',
    maskAmount: {
      decimal: '.',
      thousands: '',
      precision: 2,
      masked: false
    }
  }),

  computed: mapGetters({
    infoUser: 'login/getInfoUser',
    totalExpenses: 'dashboard/getTotalExpenses',
    salary: 'dashboard/getSalary',
    balance: 'dashboard/getBalance'
  }),

  methods: {
    cancel() {
      this.dialog = false
    },

    save(mySalary) {
      this.$store.dispatch('dashboard/saveMySalary', {
        salary: mySalary,
        currentMonth: moment().month()
      })

      this.dialog = false
    },

    openDialog() {
      this.mySalary = this.salary
      this.dialog = true
    }
  }
}
</script>

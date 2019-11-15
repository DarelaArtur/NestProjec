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
              <b> {{ infoUser.currencySymbol }} {{ salary }}</b>
            </span>
          </v-row>
          <v-row align="start">
            <v-icon color="red" size="30">trending_down</v-icon>
            <span class="title font-weight-light mb-1">
              {{ $t('expenses') }}:
              <b> {{ infoUser.currencySymbol }} {{ totalExpenses }}</b>
            </span>
          </v-row>
          <v-row align="start">
            <v-icon color="yellow" size="30">add</v-icon>
            <span class="title font-weight-light mb-1">
              {{ $t('balance') }}:
              <b> {{ infoUser.currencySymbol }} {{ balance }}</b>
            </span>
          </v-row>
        </v-col>
        <v-btn icon class="align-self-start" size="20" @click="openDialog">
          <v-icon color="#BFBFBF" size="20">edit</v-icon>
        </v-btn>
      </v-card-title>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        {{ $t('monthly_expenses') }}
      </div>
      <div class="subheading font-weight-light grey--text">
        {{ $t('current_month') }}:
        <v-menu
          v-model="calendarMenu"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-z
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <!--v-text-field
                        v-model="newExpense.payday"
                        :label="$t('payday')"
                        :rules="[rules.required]"
                        persistent-hint
                        prepend-inner-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field-->
            <v-chip class="ma-2" small v-on="on">
              {{ currentMonth | stringMonth }}
            </v-chip>
          </template>
          <v-date-picker
            type="month"
            v-model="newCurrentMonth"
            no-title
            @input="calendarMenu = false"
          ></v-date-picker>
        </v-menu>
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>clock</v-icon>
      <span class="caption grey--text font-weight-light"
        >last registration 26 minutes ago</span
      >
    </v-card-text>

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
    calendarMenu: false,
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

  computed: {
    newCurrentMonth: {
      get() {
        return this.currentMonth
      },
      set(value) {
        this.$store.dispatch('dashboard/selectMonth', value)
      }
    },
    ...mapGetters({
      infoUser: 'login/getInfoUser',
      totalExpenses: 'dashboard/getTotalExpenses',
      salary: 'dashboard/getSalary',
      balance: 'dashboard/getBalance',
      currentMonth: 'dashboard/getCurrentMonth',    
    })
  },

  methods: {
    cancel() {
      this.dialog = false
    },

    save(mySalary) {
      this.$store.dispatch('dashboard/saveMySalary', {
        salary: mySalary,
        currentMonth: this.currentMonth
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
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
